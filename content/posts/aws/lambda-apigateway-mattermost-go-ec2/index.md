---
date: 2020-04-21T02:19:34+08:00
lang: zh-Hant-TW
description: 目前我實習的公司使用 Mattermost 作為內部通訊軟體，且 Mattermost 支援 Webhook 和 Slash Command。為了方便隨時隨地可以快速開啟/關閉 EC2，因此想寫一個下 Slash Command 指令的工具，直接呼叫 API 來控制和查看 EC2，免去登入 console 的麻煩，一定會方便許多。我使用 Go 寫了一個程式處理 Mattermost 傳入的資料，並且透過 aws-sdk-go 對 EC2 進行操作。程式會在 Lambda 上執行，原始碼請參考我的 Github：https://github.com/LYTzeng/ec2ctl，日後考慮用 CloudFormation 讓需要的人快速佈署。這篇主要會介紹 API Gateway、Lambda 和部份 SDK 的使用。
sidebar: auto
tags: ["go", "aws lambda", "aws ec2", "aws api gateway"]
categories: ["AWS"]
title: 透過 AWS Lambda、API Gateway 和 AWS Go SDK，從 Mattermost 查看/開關 EC2 Instances
resources:
- name: "featured-image"
  src: "lambda-apigateway-mattermost-go-ec2-1.jpg"
aliases: ["/posts/aws/lambda-apigateway-mattermost-go-ec2.html"]
---


目前我實習的公司使用 Mattermost 作為內部通訊軟體，且 Mattermost 支援 Webhook 和 Slash Command。為了方便隨時隨地可以快速開啟/關閉 EC2，因此想寫一個下 Slash Command 指令的工具，直接呼叫 API 來控制和查看 EC2，免去登入 console 的麻煩，一定會方便許多。整體架構如上圖

我使用 Go 寫了一個程式處理 Mattermost 傳入的資料，並且透過 [aws-sdk-go](https://github.com/aws/aws-sdk-go) 對 EC2 進行操作。程式會在 Lambda 上執行，原始碼請參考我的 Github：[https://github.com/LYTzeng/ec2ctl](https://github.com/LYTzeng/ec2ctl)，日後考慮用 CloudFormation 讓需要的人快速佈署。這篇主要會介紹 API Gateway、Lambda 和部份 SDK 的使用。

先展示成果：

![](https://i.imgur.com/PEndaZv.gif)

## API Gateway

### IAM Role
在建立一個 API 之前，我們先創一個 IAM Policy 並 Attach 到 Role。API Gateway 需要 Invoke Lambda 以及寫入 CLoudWatch 的權限。
進入 IAM 管理介面，首先 Create 一個 Policy 使其允許 Invoke Lambda，我們使用 JSON 來建立 Policy：
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "lambda:InvokeFunction",
                "lambda:PutFunctionEventInvokeConfig"
            ],
            "Resource": "*"
        }
    ]
}
```
接著建立一個 Role 並 **Attach policies**。除了 attach 剛才建立的 policy，還需要 attach 一個 `AmazonAPIGatewayPushToCloudWatchLogs` 的 policy，可以直接搜尋，順便將 **Role ARN**複製下來，之後會使用到。接下來就可以建立一個 API。

![](https://i.imgur.com/QmuRVgE.png)

### 建立 API Gateway
進入 API Gateway 介面，選擇 **Create API**，找到 **REST API** 選擇 Build，**Choose the protocol** 選 **REST**，**Create new API** 選擇 **New PIA**。**API Name**輸入 API 名稱，**Endpoint Type** 保留預設 **Regional** 即可。

![](https://i.imgur.com/G4IZFLx.png)

**Create API** 後進入 API 設定的頁面。選擇左側選單最下面的 **Settings**，將之前複製的 **Role ARN** 貼上，**Role ARN** 就是一個 IAM Role 的 ID，這可以提供 API Gateway 寫入 CloudWatch 的權限。

![](https://i.imgur.com/jhhmCyx.png)

API Gateway 幾個組成元素大概有 **Resource**、**Method**、**Stages** 和 **Resource Policy**，這幾點設置完畢就能有一個可以運作的簡單 API 了。先簡單說明這幾個項目：

- **Resources**
一個 Resource 可以接收多種的 HTTP request method，例如 GET/POST/OPTION 等等。 Resource 的名稱會包含在 URL 裡面。
- **Methods**
HTTP request 的單一種類，並且決定接收到這個 method 後下一步該做什麼，以及如何做出 response。例如：收到 HTTP POST 時 觸發 Lambda function，並且將 body 傳送至 Lambda，隨後將 Lambda 回傳的 response (如：402 Unauthorized) 回應給 Client。流程會顯示在設定頁面中。
![](https://i.imgur.com/jqrJpru.png)

- **Stages**
Stage 代表這個 API 的開發階段，例如 `dev, prod, beta, v2`等，要產生一個可以被呼叫的 API，一定要 **Deploy** 到一個 Stage，Stage 的名稱會包含在 URL 中。
- **Resource Policy**
提供 API 存取控制的機制，使用 JSON 格式來設定，條件可以使用 IAM，或是單一主機 IP等，可用來決定
被允許/禁止的動作，避免被不明人士存取到 API。

API Gateway 的 REST API 的 URL 的格式為：
```
https://{restapi-id}.execute-api.{region}.amazonaws.com/{stageName}/{resource}
```
假設我建立一個名為 `ec2ctl` 的 **resource**，**stage** 為 `dev`，API 位於 `us-west-2` 的 region，則我的 API URL 會是 `https://{restapi-id}.execute-api.us-west-2.amazonaws.com/dev/ec2ctl` 。

#### 建立 Resource
左側選單選擇 **Resources**，會看到只有`/`這個符號，代表我們位於 base url，點擊 **Action** > **Create Resource** 建立 Resource，並決定 **resource name** 與 **resource path**。
![](https://i.imgur.com/IJYR2UF.png)


#### 建立 Method
選擇 Action > Create Method，並選擇 POST。
![](https://i.imgur.com/GImWVwX.png)
![](https://i.imgur.com/RpvVp6E.png)


#### Resource Policy
我們需要允許 API Gateway invoke Lambda funciton，而且只有 Mattermost server 和我們的測試主機的 **SourceIp** 是被允許的，使用 JSON 格式輸入設定。
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "execute-api:Invoke",
            "Resource": "execute-api:/*/*/ec2ctl",
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": [
                        "192.0.2.1/32",
                        "192.0.2.2/32"
                    ]
                }
            }
        }
    ]
}
```
#### Deploy API 到指定 Stage
點選左側選單 **Resources**，**Action** > **Deploy API**，**[New Stage]** 後輸入 stage name，deploy 後即可使用這個 API。
![](https://i.imgur.com/IlIV3He.png)

有一點需要特別注意的是，<mark>對 API 設定做任何更動後，請記得要重新 **Deploy** 才會生效</mark>。

接著我們需要使用 Lambda 來和 API Gateway 串接。

## Lambda
### IAM Role
我們會使用 Lambda 達成幾項功能：讀取所有 region 的 EC2，並回傳相關資訊，以及開啟/關閉指定的 EC2。要進行這些操作，我們需要賦予 Lambda function 權限，所以須建立 IAM Role。先新增所需的 Policy，JSON 設定請複製這裡：[https://gist.github.com/LYTzeng/f935732d160c8fa72e90a18deeed9ae4]() ，再將這個 Policy Attach 至新增的 Role。

### 建立 Function
到 Lambda 界面，選擇 **Create Function**，**Runtime** 選擇 **Go 1.x**，**Permissions** 選擇 **Use an existing role** 找到剛才建立的 Role 並套用。

因為這次使用 Go 撰寫程式，必須先 compile 成能夠讓 Linux 執行的 binary (Lambda 底層 OS 使用 Amazon Linux) 並上傳，而且只能寫在 `package main` 裡面。你可以直接[下載 compile 過的執行檔](https://github.com/LYTzeng/ec2ctl/releases/download/0.1.0/main.zip)，透過 console 上傳 **Function Package**，**Handler** 設定為 `main.upx`。

接著找到 **Environment Variables** 區塊新增環境變數，**Key** 請輸入 `MATTERMOST_TOKEN`，**Value** 為你的 Mattermost server 的 Slash command **token**。

接著新增一個 **Trigger**：
![](https://i.imgur.com/VYJkazR.png)

選擇 **API Gateway**，**API** 就是剛才建立的 API，**Deployment Stage** 是剛才 Deploy 時命名的名稱 (如：`dev`)，**Security** 選 **Open**，我們已經用 Token 做驗證，加上用 Resource Policy 白名單過濾，不必擔心這個 Open 設定。
![](https://i.imgur.com/jheCEwG.png)

接著回到 **API Gateway** 頁面，選擇 `/ec2ctl` 底下的 **POST**，設定 **Integration Request**
- **Integration type** 為 **Lambda Function**
- **Use Lambda Proxy integration 務必勾選**，此選項可透過 event 將 Request body 傳送至 Lambda。
- **Lambda Function** 即剛才建立的 function
![](https://i.imgur.com/Js98mml.png)
儲存後可以看到整個 Method Execution 流程。

![](https://i.imgur.com/VinbrZD.png)

這樣系統已經建制完畢，接下來可以使用 Postman 進行測試，或是直接在 Mattermost 開發環境測試。

## Mattermost 架設與設定
本篇不會詳述這部份操作，請參考 Mattermost 的官方文件：
- 開發環境架設
https://developers.mattermost.com/contribute/server/developer-setup/
- Slash Command 設定
https://docs.mattermost.com/developer/slash-commands.html
https://developers.mattermost.com/integrate/slash-commands/
Slash Command 設定可以參考這裡的範例：
> - Title: `ec2ctl`
> - Description: `Start/stop/list EC2 instances from Mattermost.`
> - Command Trigger Word: `ec2ctl`
> - Request URL: `https://{restapi-id}.execute-api.{region}.amazonaws.com/dev/ec2ctl`
> - Request Method: `POST`
> - Response Username: `留空白`
> - Response Icon: `留空白`
> - Autocomplete: ✔
> - Autocomplete Hint: `(version | (start | stop) -i <instance id> | ls [-r <region>])`
> - Autocomplete Description: `Start/stop/list EC2 instances from Mattermost.`

設定完畢請複製 **token** 並貼上至 Lambda 的 Environment Variable `MATTERMOST_TOKEN` 中。
![](https://docs.mattermost.com/_images/slash_commands_token.png)

## 使用 Mattermost 測試
此程式 [ec2ctl](https://github.com/LYTzeng/ec2ctl) 的 Slash command 規則如下：
```
Usage:
    ec2ctl version
    ec2ctl (stop | start) -i <id>
    ec2ctl ls [-r <region>]
Options:
    -i <id>    Specify an instance ID.
    -r <region>    Specify a region.
```

測試指令是否正常，`/ec2ctl ls -r us-west-2`輸入後可以看到輸出如下：
![](https://i.imgur.com/jaTBuco.png)

## 使用 Postman 測試
使用 Postman 測試時需要模仿 Mattermost 的 HTTP Request 格式，否則程式會出錯。圖中 Postman 的設置都是必要的參數，不過只須設定 **Headers** 以及 **Body**：

**Content-Type**：`application/x-www-from-urlencoded`
![](https://i.imgur.com/JhnYTU2.png)

**token** 為 Mattermost slash command token
**text** 欄位就是指令的內容 （不含 slash command 的 trigger `/ec2ctl`），例如`ls -r us-west-2` 或 `stop -i i-134134fwifi`。
**user_name** 請隨意輸入
![](https://i.imgur.com/1l8ueF8.png)

若看到 `Status: 200 OK` 和一些內容，代表成功了。

![](https://i.imgur.com/c2t7NUi.png)

## References
- [IAM JSON Policy Reference ](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies.html)
- [Deploying a REST API in Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-deploy-api.html)
