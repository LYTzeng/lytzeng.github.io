---
date: 2020-01-27T17:33:25+08:00
lang: zh-TW
description: 蘋果真高價，何不自己架？ 如果覺得 Mac Pro 很貴，或是說需要更進一步客製化硬體，何不考慮自己在伺服器上架設一台 Mac 呢？要多少 Storage 和 Memory 就有多少。總之，能省錢又不犧牲效能，就是爽！網路上有一些關於 ESXi 安裝 macOS 的教學，但是大多是給 VMware Workstation，不然就是版本不夠新，這裡提供我親自嘗試過、可行的且最新的 ESXi 搭配 macOS 的安裝方式。
sidebar: auto
tags: ["VMware", "vSphere", "MacOS"]
categories: ["Infra"]
title: 想擁有一台伺服器等級 Mac? macOS 10.15 Catalina on VMware ESXi 6.7
resources:
- name: "featured-image"
  src: "BojArA4.png"
aliases: ["/posts/misc/Installing-macOS-on-ESXi.html"]
---


> 蘋果真高價，何不自己架？ — me

如果覺得~~蘋果的刨絲器~~ Mac Pro 很貴，或是說需要更進一步客製化硬體，何不考慮自己在伺服器上架設一台 Mac 呢？要多少 Storage 和 Memory 就有多少。總之，能省錢又不犧牲效能，就是爽！可以參考 [Linus Tech Tips 對 Mac Pro 的評論](https://www.youtube.com/watch?v=mIB389tqzCI)。網路上有一些關於 ESXi 安裝 macOS 的教學，但是大多是給 VMware Workstation，不然就是版本不夠新，這裡提供我親自嘗試過、可行的且最新的 ESXi 搭配 macOS 的安裝方式。

![](https://i.imgur.com/MkTKNFE.png)
2019 Mac Pro 選好一點的規格，就跟買車一樣了。

## 更新 ESXi 6.7 至 Update 3

首先請更新 ESXi Server 到 Update 3，才能支援 MacOS 10.15。我們必須依序從 Update 1 更新到 Update 3。以下過程需要進行三遍，分別安裝三次 Update 的更新。

1. 到[這裡](https://my.vmware.com/group/vmware/patch#search) 找到對應版本，下載 zip 檔。Update 1 的檔名為 `update-from-esxi6.7-6.7_update01.zip`。

2. 讓 Server 進入維護模式。
![](https://i.imgur.com/R2FS7Cj.png)

3. zip 上傳至 Datastore，SSH 進入 ESXi，執行指令，注意檔名和路徑要改：
```bash
esxcli software vib install -d /vmfs/volumes/datastore1/updates/update-from-esxi6.7-6.7_update01.zip
```

4. 重新開機

## 安裝 Unlocker
ESXi 6.7 必須使用 Unlocker 3.0 版才能讓 MacOS 成功開機，舊版本都會進入無限自動重開循環。**如果你的 Server 安裝過 Unlocker，更新 ESXi 後需重新再安裝 Unlocker。**

**下載 ESXi Unlocker 3.0 (二擇一):**
- [Unlocker 作者的載點，需登入會員](https://www.insanelymac.com/forum/files/file/964-macos-unlocker-v30-for-vmware-esxi/)
- [我的 Google Drive 載點](https://drive.google.com/file/d/14rkRT8cRavA8QxvTseSQjSUeJ-gZ3WfV/view?usp=sharing)

將 `esxi-unlocker-300.tgz` 上傳至 ESXi，在自己電腦執行:
```bash
scp /你的下載路徑/esxi-unlocker-300.tgz root@xxx.xxx.xxx.xxx:/vmfs/volumes/datastore1/
cd /vmfs/volumes/datastore1/
tar xvf esxi-unlocker-300.tgz
```
然後執行 `esxi-install.sh`，結束後重開機:
```bash
chomod 777 esxi-install.sh
./esxi-install.sh
reboot -f
```
Unlocker 安裝完畢後，可以執行`esxi-smctest.sh` 檢查 Unlocker 是否成功安裝。成功安裝的話會有以下 Output：
```
/bin/vmx
smcPresent = true
custom.vgz     false   38930360 B
```

## macOS 的 VMDK
接著我們會使用比較不同的安裝方式。有別於一般使用映像檔安裝，我們會先建立一個 VM，再將 macOS 的 VMDK 新增到該 VM。這樣開機時該虛擬硬碟就會被讀取。和 ISO 安裝相比，這是我目前嘗試過成功機率最高的方法。安裝的 macOS 版本是 10.15，請特別留意[文件中](https://www.vmware.com/resources/compatibility/pdf/VMware_GOS_Compatibility_Guide.pdf?fbclid=IwAR3TwlRY_63Q5KsiInF-1bnQyNi40OnpElkrZ9TMgfzXgwOST8FMB2MYKFY#page=6)有註明 ESXi 所支援的 macOS 版本。

**VMDK 載點 (二擇一):**
- [Geekrar Google Drive 載點](https://drive.google.com/drive/folders/1X8ImVEeM5GCvYgGEVifM21E-6Je7dHD3)
- [我的 Google Drive 載點](https://drive.google.com/file/d/1xHMtphpCj-EJr687_MQ0cSMlsKk9K-MY/view?usp=sharing)

把 VMDK 上傳到 ESXi，可以使用任何 UI 或 SCP。接著先使用 VMDK 來登錄虛體機器。
接著我們要對 VMDK 動一點手腳，不然會開不起來，因此要使用`vmkfstools`轉換 VMDK。
```bash
cd /vmfs/volumes/[datastore 名稱]
vmkfs -i macOS_Catalina_Final.vmdk -d thin macOS_Catalina_Final_new.vmdk
```

接著開始建立新的虛擬機器。

## 建立新的虛擬機器

![](https://i.imgur.com/apJi6c0.png)

OS 請選擇 Apple macOS 10.14 即可。

![](https://i.imgur.com/vGoO0XT.png)

其實對於資源大小沒有別的要求，只要不要太小即可。接著在下面的畫面中，砍掉預設的硬碟，我們要在這裡新增剛剛轉換好的 VMDK 硬碟。

![](https://i.imgur.com/jSDsoCv.png)

選擇「新增磁碟」> 「新增現有磁碟」，如圖：

![](https://i.imgur.com/mihE5cW.png)

接著選擇剛才轉換好的 VMDK `macOS_Catalina_Final_new.vmdk`

![](https://i.imgur.com/Im7EMI8.png)

接著「下一步」、「完成」，成功建立虛擬機器。

## 修改 VMX 設定

接著我們要修改 VMX 設定，SSH 進入 ESXi，`cd`到 VM 的位置。`[datastore 名稱]`請換成你的 datastore 名稱，`[虛擬機器名稱]`請換成你的 VM 名稱。

```bash
cd /vmfs/volumes/[datastore 名稱]/[虛擬機器名稱]
echo 'smc.version = "0"' >> [虛擬機器名稱].vmx
```

![](https://i.imgur.com/xyIxpjb.png)

接著就可以開機了，開機成功的話會進入各種設定，之後就只要照流程走完即可。

![](https://i.imgur.com/ThA71sp.png)

![](https://i.imgur.com/3wf0H3L.png)


## 在 macOS 內安裝 VMware tools

最後就剩安裝 VMware tools 的部分了，VMware Tools 提供 Guest OS 和 ESXi 的相容度，讓我們可以調整螢幕解析度、。到這個[官方連結](http://softwareupdate.vmware.com/cds/vmw-desktop/fusion/11.1.0/13668589/packages/com.vmware.fusion.tools.darwin.zip.tar)下載 VMware tools，解壓縮後把 `darwin.iso` 檔上傳到 ESXi。

接著掛載`darwin.iso`，macOS 會自動讀取光碟。

![](https://i.imgur.com/RnSlhC8.png)

直接點選 "Install VMware Tools" 並使用「下一步安裝法」。

![](https://i.imgur.com/Ke5X0kX.png)

![](https://i.imgur.com/LMIzHuK.png)

中間需要從設定那邊 Allow 一下，點選 Allow 即可。

![](https://i.imgur.com/ebkv229.png)

![](https://i.imgur.com/kuqISrT.png)

安裝完後重開機，即可使用。成功安裝就可以看見 ESXi 偵測到 VMware Tools：
![](https://i.imgur.com/5OBM3xJ.png)

如果發現螢幕解析度沒有隨著調整視窗尺寸而改變，請試著提升虛擬顯示卡記憶體。
![](https://i.imgur.com/nRWrrGb.png)

## 顯卡與 USB 裝置透通 (Passthrough)

因為用遠端或是 Remote Console 操作體驗感覺不順暢，接著我想嘗試讓顯卡直接 Passthrough 給 Guest OS，也就是 macOS。

首先在管理>硬體下面找到想 Passthrough 的裝置，開啟它的 Passthrough 功能。

![](https://i.imgur.com/ldhikYA.png)

因為 Passthrough 後會無法從 ESXi 操控，所以我們也要 Passthrough USB 裝置用來連接滑鼠鍵盤，才能直接操控 macOS。因為無法 Passthrough 單一 USB 裝置給 Guest OS，我們必須 Passthrough 一整個 USB Controller。

![](https://i.imgur.com/yVn7ipn.png)

接著在 macOS VM 設定裡，將記憶體的 "Reserve all guest memory" 打勾，

![](https://i.imgur.com/jYyG7nC.png)

接著在「新增其他裝置」(Add other device)，選擇新增 PCI 裝置，並選擇顯卡與 USB Conroller。

![](https://i.imgur.com/ZUXCfOF.png)

儲存後就可以開機了，開機後便無法從 ESXi 操控了，如果開機後發現螢幕只顯示桌布，可以直接試著輸入密碼按 Enter，猜測這是因為 macOS 誤以為有多螢幕所造成的，登入後一切會恢復正常。或是也可以從 macOS 裡面的顯示設定去設定。

恭喜你，終於擁有一台性能好的桌上型 Mac，媲美 MAC Pro 而硬體想怎樣搞都可以。對於 macOS 大家應該都如此，又愛又恨，甚至踩雷無數，~~但只要不由愛轉恨都好~~。最後附上一張 `Unlocker` 沒裝好導致開機 Kernel Panic 出現的 `Dont_Steal_MacOS.cpp` 截圖，我 Troubleshooting 時從未看過給得這麼爽快的線索XD。

![](https://i.imgur.com/CopSHyf.png)

欲知詳情，以及為何安裝 `Unlocker` 可以成功，請在 macOS 中開啟 Terminal，看看這個檔案：
```bash
cat '/System/Library/Extensions/Dont Steal MacOS X.kext/Contents/MacOS/Dont Steal Mac OS X'
```
裡面有一段文字這麼寫道：
```
Copyright (c) 2006-2019 Apple Inc. All rights reserved.

The purpose of this Apple software is to protect Apple copyrighted materials from 
unauthorized copying and use. You may not copy, modify, reverse engineer, publicly 
display, publicly perform, sublicense, transfer or redistribute this file, in whole or 
in part.  If you have obtained a copy of this Apple software and do not have a valid 
license from Apple to use it, please immediately destroy or delete it from your 
computer.

 Dont_Steal_Mac_OS_X AppleSMC "DSMOS: SMC read error K0: %d"@/BuildRoot/Library/Caches/
 com.apple.xbs/Sources/DontStealMacOS/DontStealMacOS-30.0.1/Dont_Steal_MacOS.cpp:191 
 "DSMOS: SMC read error K1: %d"@/BuildRoot/Library/Caches/com.apple.xbs/Sources/
 DontStealMacOS/DontStealMacOS-30.0.1/Dont_Steal_MacOS.cpp:198 %02x DSMOS: SMC returned 
 incorrect key: %s
```
什麼意思呢，嘿嘿，就自行解讀囉。

## References
- [How to patch your VMware ESXi 6.7 server - StevenAnnett.co.uk](https://www.stevenannett.co.uk/2019/04/11/how-to-patch-your-vmware-esxi-6-7-server/)
- [頭城國小資訊組 | VMware ESXi - 安裝 macOS Sierra 10.12.4](http://blog.ilc.edu.tw/blog/blog/25793/post/105209/690915)
- [【VMware】失败 - “scsi0:0”的磁盘类型 2 不受支持或无效。请确保磁盘已导入_永无止境的Pasu_新浪博客](http://blog.sina.com.cn/s/blog_6452c6b40102x313.html)
- [Install macOS Mojave on VMware on Windows PC - Geekrar](https://www.geekrar.com/install-macos-mojave-on-vmware/)
- [macOS Unlocker V3.0 for VMware ESXi - Miscellaneous - InsanelyMac Forum](https://www.insanelymac.com/forum/files/file/964-macos-unlocker-v30-for-vmware-esxi/)

<Disqus/>