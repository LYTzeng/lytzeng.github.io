---
date: 2019-12-13T10:16:17+08:00
lastmod: 2019-12-13T14:44:38+08:00
draft: false
lang: zh-Hant-TW
description: 自從離開前一間實習的公司，我就缺乏一個可以做 Lab 的地方，深刻感受到「伺服器戒斷症」。想當初公司是天天有 Server 可以使用，有 Cisco UCS、Hyperflex 和 Supermicro 的等等，離開後變成只能偶爾用 AWS Educate 帳號開個限制滿滿的 EC2。這次學校電腦教室有汰換下來的幾台電腦，聽說當初買一台要價 10 萬元，不過也是好幾年前了。規格不會太差，因此開始動起歪腦筋，抱了一台到座位旁開始研究。
sidebar: auto
tags: ["VMware", "vSphere"]
category: Infra
categories: ["Infra"]
title: 在實驗室自架 VMware ESXi — 使用電腦教室汰換之電腦 
resources:
- name: "featured-image"
  src: "YZS8IRs.jpg" 
aliases: ["/posts/infra/self-hosted-esxi-server-in-lab.html"]
---

自從離開前一間實習的公司，我就缺乏一個可以做 Lab 的地方，深刻感受到「伺服器戒斷症」。想當初公司是天天有 Server 可以使用，有 Cisco UCS、Hyperflex 和 Supermicro 的等等，離開後變成只能偶爾用 AWS Educate 帳號開個限制滿滿的 EC2。這次學校電腦教室有汰換下來的幾台電腦，聽說當初買一台要價 10 萬元，不過也是好幾年前了。規格不會太差，因此開始動起~~歪~~腦筋，抱了一台到座位旁開始研究。

## 規格

規格還不差：
1. CPU: Intel Xeon E5 2620
2. MB: ASUS Z9PE-D8 WS 支援雙CPU、四通道、單科 CPU 支援到 64GB RAM、自帶兩個 1G 網路介面
3. RAM: 原本很寒酸的差了一條 8GB (PC3-12800)，我打算怒擴到 32GB
4. 顯卡：NVIDIA GeForce GTX 780， 其實我裝 ESXi 根本不太需要顯卡
5. SSD: 200GB
6. HDD: 1TB
7. 噢易還原卡 (畢竟電腦教室的電腦，正常)

## 前置作業

首先當然是拔掉還原卡，然後格式化硬碟，製作開機 USB 來安裝 ESXi。到 VMware 官網下載了 VMware vSphere Hypervisor 6.7 (ESXi)，接著使用 [rufus](https://rufus.ie/) 做成開機片。 附帶一提，ESXi 是可以免費使用的，灌完記得去剛才的下載頁面，上面會有免費版序號，再從 ESXi web GUI 貼上即可，沒有期限，但不能搭配 vCenter。

回想以前灌 ESXi 時，安裝過程會做格式化，所以我就懶的手動自己格式化一遍。

:::danger 結果，
這才是麻煩的開始。
:::

## 踩雷

安裝 ESXi 時，看進度條看很爽，結果重開機後出現：

![](https://i.imgur.com/iCiHrIQ.png)

這簡直被澆冷水！ Google 之後發現和 Windows 有關，[這個提問有人回答](https://communities.vmware.com/thread/429698)。由於這台電腦的硬碟是安裝 Win 10，而 Win 10 會複寫 [MBR](https://zh.wikipedia.org/wiki/%E4%B8%BB%E5%BC%95%E5%AF%BC%E8%AE%B0%E5%BD%95)分割表，使其有數值而非為0，所以造成 ESXi 錯誤，如下圖。

![](https://communities.vmware.com/servlet/JiveServlet/showImage/2-2499870-50004/everpic-20150422_210158.367.png)

好，所以這時候只得乖乖格式化硬碟了，而且經過查詢，格式化不見得會清除 MBR 的部分，為了保險起見，MBR 那 512 Bytes 最好全部變成"0"。但是作業系統已經被我弄掉了，要格式化除非拔下來，不然就是製作 Linux Live 的開機片，使用指令操作格式化。因為該硬碟看起來不好拔，我決定使用後者的方法。(幸好今天一口氣帶了3個隨身碟)

## 救星：GParted

[GParted](https://gparted.org/) 是一個 partition editor，有圖形介面和 CLI，可以安裝到現有OS，也可以做成開機片 (正是我想要的！)。我到[這裡](https://gparted.org/download.php)下載 iso 映像檔，加上[LinuxLive USB Creator](http://www.linuxliveusb.com/)，把 USB 做成開機片。從 BIOS 設定 USB 開機後出現畫面了。

![](https://i.imgur.com/MYhwsgp.png)

第一次進到 GParted 選擇第一個選項就被雷了，馬上沒有畫面訊號。後來我選了第三個選項 `Other modes of GParted`。

![](https://i.imgur.com/JGuzlWQ.png)

接著選擇 `GParted Live Safe graphics settings`，如果你發現你的電腦也不能開啟 GParted，請嘗試這個選項。

![](https://i.imgur.com/bdbjNxf.png)

成功進入了，可以敲 command 了

![](https://i.imgur.com/NPbQOeD.png)

首先列出所有硬碟：
```bash
ls /dev/[sh]d*
/dev/sda  /dev/sdb ...
```
接著猜猜看，我覺得目標是 `/dev/sda/`
```bash
fdisk -l /dev/sda
```

![](https://i.imgur.com/P0b9guO.png)

### 處理MBR

看容量，果然是 `sda`，我先把他的 MBR 抹成 0。
```bash
dd if=/dev/zero of=/dev/sda bs=512 count=1
#然後再確認一次
fdisk -l /dev/sda
```

你會發現 `GPT Table is corrupted` 的錯誤訊息消失了。

![](https://i.imgur.com/voXIWDy.png)

### 切磁區

我想用 [GPT](https://zh.wikipedia.org/wiki/GUID%E7%A3%81%E7%A2%9F%E5%88%86%E5%89%B2%E8%A1%A8)，所以接著使用 `parted`工具進行磁區分割，這目的是為了讓 ESXi installer 更有可能認出這顆硬碟。所以我只切一個磁區，指定範圍從 1 到 240GB，它會自動掠過 MBR 和 GPT的部分，所以`START`可以放心打上"1"。

![](https://i.imgur.com/D10gxIy.png)

也可以用下面這行指令代替：
```bash
parted /dev/sda mklabel gpt mkpart P1 fat32 1 240GB
```

:::warning 注意：
使用這些指令請格外小心！
:::

### 格式化

接著使用 `mkfs` 格式化，保險起見使用 FAT32，不要用 ext2 或 ext3，文件有提到這可能會讓 ESXi 安裝失敗，至少我使用 FAT32 最後成功安裝了。VMware 會把硬碟格式化成 VMFS，但是安裝前也要注意格式，減少踩雷機率。
```bash
mkfs.vfat -F 32 /dev/sda1
```

重新安裝，成功。看到熟悉的黃灰畫面。

![](https://i.imgur.com/0LtDy0Z.png)

折騰半天，終於成功在 LAB 擁有自己的 Server 了 ~~不用花自己的電費和硬體$$~~

