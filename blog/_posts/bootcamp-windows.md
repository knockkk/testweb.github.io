---
title: Bootcamp Windows食用指南
date: 2020-11-28
tags: 
  - tool
---

在Mac上使用Bootcamp安装的Windows系统中有些功能不太好用，但可以通过一些工具来优化使用体验。

### 1. 触摸板

触摸板上下滑动方向不可配置，也不能用手势切换应用。

解决方案：[mac-precision-touchpad](https://github.com/imbushuo/mac-precision-touchpad)（亲测有效且安装简单）

我的设备：MacPro 2019款。

1. 管理员身份打开 cmd；
2. 在命令行中运行如下命令：

```sh
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

3. 检查choco命令是否可以运行，可以则OK

```sh
choco
```

4. 安装驱动 

```sh
choco install mac-precision-touchpad
```

5. 完成！

   现在可以去“触摸板配置”里愉快的玩耍了～

### 2. 按键

用惯了mac的快捷键，这时候再用Windows的快捷键会很不习惯。

解决方案：Sharpkeys

可以将键盘上某个键映射到另一个键，比如将“左Windows键”映射到“左Ctrl键”。

![image-20201204123443851](https://i.loli.net/2020/12/04/eNiBPL64ymGYsMZ.png)

参考：

1. https://sharpkeys.en.softonic.com/

2. https://www.howtogeek.com/197365/how-to-remap-windows-keyboard-shortcuts-in-boot-camp-on-a-mac/



