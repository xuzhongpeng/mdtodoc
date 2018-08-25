---
title: markdown转换成标准文档工具
---
# 介绍

本工具可以对markdown格式文档转换成类似element、vue形式的文档格式，基于marked工具，会生成成默认的文档格式，例如我的博客一篇文章，在博客显示是这样的

![博客][1]

生成后：

![生成后的图片][2]

文件生成后，大家可以修改style中的css样式进行自定义。


# 使用方法

- *node <<8.9.3*
- *npm  <<5.5.1*

> node环境和npm环境如上，低于如上环境我没有测试，理论上也可以运行

打开命令行工具，全局安装mdtodoc
```shell
npm install mdtodoc -g
```

新建一个目录，把自己写的markdown文件拷贝到该目录，例如
![生成后的图片][3]

命令行进入到该目录，
执行
```shell
mdtodoc g change 文件名
```
如文件名为上图中的index.md
```shell
mdtodoc g change index.md
```
生成目录结构如下：

![生成后的图片][4]

# 注意

如果要给文章写标题，可在文章顶部设置
```
title:markdown转换成标准文档工具
```
即可转化成功，不可添加其它符号，例如
```
---
title:markdown转换成标准文档工具
---
```
如此会导致页面生成混乱，后期会进行修改

[github地址](https://github.com/xuzhongpeng/mdtodoc)

[生成例子](http://www.xuzhongpeng.top/myhtml/webpack%E6%9E%84%E5%BB%BAvue%E9%A1%B9%E7%9B%AE.html)

[1]:http://www.xuzhongpeng.top/images/mdtodoc/eg2.png "eg2"
[2]:http://www.xuzhongpeng.top/images/mdtodoc/eg1.png "eg1"
[3]:http://www.xuzhongpeng.top/images/mdtodoc/eg3.png "eg3"
[4]:http://www.xuzhongpeng.top/images/mdtodoc/eg4.png "eg4"