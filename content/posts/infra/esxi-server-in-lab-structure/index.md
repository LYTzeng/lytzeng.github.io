---
date: 2019-12-18T08:34:14+08:00
lang: zh-Hant-TW
description: 自前陣子學校電腦教室汰換之電腦，有幾台送給實驗室利用，我藉這個機會使用那些資源架設一台 ESXi。架設完成後，接下來考量到一些需求與環境因素，開始設計網路的架構。這篇會使用 pfSense、OpenVPN、ESXi 伺服器和一台 Cisco 2950 Switch，進行網路架構設計。
sidebar: auto
tags: ["VMware", "vSphere", "pfSense", "OpenVPN"]
categories: ["Infra"]
category: Infra
title: 實驗室自架 Lab 環境 — 網路架構設計
resources:
- name: "featured-image"
  src: "UhT17Yp.png"
aliases: ["/posts/infra/esxi-server-in-lab-structure.html"]
---


前陣子學校電腦教室汰換之電腦，有幾台送給實驗室利用，我藉這個機會使用那些資源[架設一台 ESXi](/posts/infra/self-hosted-esxi-server-in-lab.html)。架設完成後，接下來考量到一些需求與環境因素，開始設計網路的架構。這篇會使用 [pfSense](https://www.pfsense.org/)、OpenVPN、ESXi 伺服器和一台 Cisco 2950 Switch，進行網路架構設計。

## 需求與現有環境

對於 Lab 環境的幾項需求，分別如下：
1. 所有 VM 皆可連接外網，因為如 [EVE-NG](https://www.eve-ng.net/) 在安裝時便需要連接外部下載 Package
2. 對於 VM 的 DHCP，如果伺服器提供讓一些同學使用，在上面佈建的 VM 有 DHCP 較方便
3. 能夠從校內與校外網路 VPN 進入 Lab 環境
4. <mark>不能</mark>直接從 WAN 連到 ESXi 的管理介面
5. 可以透過 VPN 間接連到管理介面
6. 如果使用實驗室裡面的電腦存取伺服器，無須繞過學校的網段，可透過自己的 LAN 直連
7. 必要的話始可使用 Port Forwarding

現有環境有一些限制，不過不成問題：
1. 學校的網管系統，綁定學校 Public IP 與 MAC
2. 要進行遠端，只能使用 RDP，Team Viewer 與 Google Remote Desktop 皆會被擋

## 架構圖

規劃時，我畫了一張架構圖，方便日後管理與交接。

![](https://i.imgur.com/ZJ8IsOX.png)

由於 Server 的主機板原本就帶有兩個網路介面，因此可以使用 pfSense，將一個 NIC 作為 WAN，另一個做為 LAN。pfSense 在架構中擔任 Firewall 與 Router 的腳色，提供包含 NAT、Routing、VPN 和 DHCP Sever的功能。因為我只跟學校要到一個 IP，不想買一台 Firewall，所以 pfSense 就是首選。

## Cisco Switch 設定
Switch 的設定非常簡單，我透過 VLAN 拆分成邏輯上的兩台不同的交換器，一個負責 LAN，同時是交換器的管理 VLAN;另一個連接學網對外(Uplink)與 Server 規劃的 WAN 端。

```
# int ra fa 0/1 - 12
(config-if)# sw mode access
(config-if)# sw access vl 10
# int ra fa 0/13 - 24
(config-if)# sw mode access
```

但是第24 port 要接到學校的 Swich，我怕對端有設定[BPDU Guard](https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/10586-65.html)，因此特定對該port開啟 **BPDU filter**，阻止我的交換器發出 BPDU。

```
# int fa0/24
(config-if)# spanning-tree bpdufilter en
```

同時將 VTP 的模式切換成 Transparent，總之，避免一切私接 Switch 對學校網路的影響。

```
# vtp mode transparent
```


## 安裝 pfSense
安裝 pfSense 的過程參考自[官方文件](https://docs.netgate.com/pfsense/en/latest/virtualization/virtualizing-pfsense-with-vmware-vsphere-esxi.html)，這邊順便翻譯以內化學習。

### vSphere 網路設定
在建立 VM 前，需要在 ESXi 上新增2個 vSwitch 和兩個連接埠群組(Port Group)，一個做為 WAN，另一個作為 LAN。

在左側選擇「網路」，切換至「虛擬交換器」標籤，「新增虛擬交換器」。
![](https://i.imgur.com/i0F9jVg.png)

圖中是把 vSwitch0 作為 LAN，兩個 vSwitch 分別連接到不同的實體介面。
![](https://i.imgur.com/3Ss6AYf.png)

### 建立連接埠群組
切換到「連接埠群組」標籤，新增兩個群組，分別連接到 LAN 和 WAN 兩個 vSwitch。
![](https://i.imgur.com/ZkamIQ0.png)

### 建立 pfSense VM
到[這裡](https://www.pfsense.org/download/)下載映像檔，64位元系統請選「AMD64」，下面選「CD Image (ISO) Installer」。其餘步驟和一般架設 VM 是一樣的。注意 VM 的網卡，種類選 **VMXNET 3** 的效能最好，但是第一次啟動時要手動選擇 LAN/WAN 介面。

接著開啟 VM，看到以下畫面
![](https://i.imgur.com/QPqVEb0.png)

當看到下面畫面時，可以先輸入 2 設定 IP 了。
![](https://i.imgur.com/HOQa7G1.png)

接著連入 pfSense 的 Web UI，預設登入帳密是 `admin`，密碼`pfsense`，安全考量，請一定要更改預設密碼。接著就可以安裝 VMware tools。

不過我的環境是學網，DNS 必須使用學校所規定的，能夠成功解析地址才能讓 Package Manager 連得上。

![](https://i.imgur.com/BIj7Tp8.png)

安裝 VMware tools。切換到 Available Packages 標籤，搜尋 Open-vm-tools
![](https://i.imgur.com/Ce7ASRq.png)

## 設定 OpenVPN
這裡一樣是翻譯自[文件](https://docs.netgate.com/pfsense/en/latest/vpn/openvpn/openvpn-remote-access-server.html)。

這邊使用的是「最基本」的設定，使用 local user 的帳密進行驗證。pfSense 的 **VPN > OpenVPN** 底下，有 **Wizard** 的選項，是比較簡易設置 VPN 的方式。第一步選擇 **Local User Access**，User 可以到 **System > User Manager** 新增。

### 新增 CA 憑證
接著新增一個自簽憑證，設定可以參考下面
![](https://i.imgur.com/NjQnhtu.png)

### 新增 Server 憑證
資料和 CA 的類似
![](https://i.imgur.com/WISRLsL.png)

### OpenVPN Server 設定
- **TLS Authentication** 請打勾
- **Tunnel Network** 請輸入一個網段，該網段不能存在於現有網路和路由表中。
- **Local Network** 就是 VPN 進來後可以存取的網段，依照上面的架構圖就是 `172.30.0.0/24`。

接著下一步。

### Firewall Rules
底下兩個選項都打勾，否則不會通。

接著設定便完成了。到 **Firewall > rules** 確認防火牆規則有沒有新增一條規則：Source any 到 destination WAN，port 則是剛才設定中的 OpneVPN port，預設是`1194`。

![](https://i.imgur.com/GhKawlB.png)

### 新增 User
**System > User Manager** 底下，選+號新增 user ，CA 請選擇剛才建立的。

### OpenVPN Client Export Package
這個工具非常好用，它可以針對特定使用者，輸出一個安裝檔(帶有使用者和這個VPN的相關設定)，所以使用者只要安裝完即可使用。

到 **System > Packages, Available Packages** 標籤，搜尋 openvpn，安裝 **OpenVPN Client Export Package**。

![](https://i.imgur.com/Uk82ibO.png)

接著到 **VPN > OpenVPN, Client Export**標籤底下，會發現剛才建立的使用者。

![](https://i.imgur.com/TuQJciw.png)

如果是 Windows，下載**Current Windows Installer**底下的選項，給 User 安裝即可。<mark>千萬不要</mark>單獨下載設定檔，另外安裝 OpenVPN Client 然後輸入設定，我嘗試過這樣
會失敗。盡量使用 Installer。

## 結語
目前完成了 Lab 的架構，所有網路需求也達成了。我可以從任何地方 VPN 到我的 LAN，登入 ESXi 介面，甚至可以對實體的 Cisco Switch 進行設定。如果需要上傳龐大的 Image，我可以遠端到我的 Lab PC，作為跳板機，從該 PC 透過 LAN 上傳檔案至 Server 而不會消耗 WAN 流量。而日後任何新的 VM 被建立，也都可以自動取得 IP 和指定的 DNS resolver，已達成更新與安裝 Packages。

