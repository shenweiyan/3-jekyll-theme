---
comments: true
layout: post
title: 解决ubuntu：E：无法获得锁(11：资源暂时不可用)
description: 解决ubuntu：E： 无法获得锁(11：资源暂时不可用)
category: 技术
---


最近学习用到了[php手册][1]，平常我都是在网页查看，图个方便于是就下载了[KchmViewer][2]（开源的CHM 阅读器）不过效果不太理想，今天想卸载了它，结果出段小插曲......  

![Alt text]({{ site.article }}2018-10-25-ubuntu-lock/1.png?achuan.io "E: 无法获得锁......(11: 资源暂时不可用")  

**E: 无法获得锁 /var/lib/dpkg/lock-frontend - open (11: 资源暂时不可用)**  
what the?  
好吧，遇到问题解决问题  

刚开始我是以为软件没有完全关闭就打开了终端......  

```bash
# 打开终端列出进程，找含有 apt-get 进程，然后　sudo kill PID
$ ps aux 
```

我以为ojbk　？不过这并没有什么用（啪）......  

这有什么难的？so easy　解决方式如下：

```bash
# 首先强制解锁
$ sudo rm /var/cache/apt/archives/lock
# 然后找到错误信息里“无法获得锁的地址”并 rm
$ sudo rm /var/lib/dpkg/lock-frontend
```

卸载 KchmViewer 并确认卸载（Y）

```bash
$ apt-get remove kchmviewer 
```

![Alt text]({{ site.article }}2018-10-25-ubuntu-lock/2.png?achuan.io "删除成功！") 

dpkg 查一下 kchmviewer 是否存在

```bash
$ dpkg -s kchmviewer
```

![Alt text]({{ site.article }}2018-10-25-ubuntu-lock/3.png?achuan.io "系统没有安装包kchmviewer") 


[1]: http://php.net?achuan.io
[2]: https://github.com/gyunaev/kchmviewer?achuan.io
