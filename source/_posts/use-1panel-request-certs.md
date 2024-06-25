---
title: 小白也能看懂的 1panel 申请和自动续签泛域名证书教程
date: 2024-06-25 17:26:39
index_img: /img/tools.jpg
banner_img: https://1panel.cn/img/logo-blue.png
categories:
  - 1panel
  - 证书申请
  - 泛域名证书
  - 阿里云
---

# 背景

之前使用的证书一直是用 [cert-bot](https://certbot.eff.org/) 申请的，每次有效期三个月，到期还需要手动申请或者续期，最近搭梯子🪜的时候了解到了 [1panel](https://1panel.cn/) 这个面板工具，界面看起来比宝塔清爽好用，我使用的域名在阿里云的，记录一下自动 SSL 证书申请的详细过程

# 创建 Acme 账户

打开 1panel 网站，点击 `网站` -> `证书` -> `Acme 账户`， 创建 Acme 账户，账号类型支持 `Let's Encrypt`、`ZeroSSL`、`Buypass`、`Google Cloud`，密钥算法选择默认就可以

![创建 Acme 账户](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/1.jpg)

![点击创建账户按钮](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/2.jpg)

![邮箱可以填写真实邮箱](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/3.jpg)

# 创建 DNS 账户

点击 `网站` -> `证书` -> `DNS 账户`，开始创建 DNS 账户，账号类型支持选择 `阿里云`、`腾讯云`、`Cloudflare` 等，阿里云账号的 Access Key 和 Secret Key 可以参考下面步骤获得

![点击 DNS 账户](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/4.jpg)


![点击创建账户](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/5.jpg)

![类型支持阿里云、腾讯云、Cloudflare 等](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/6.jpg)

# 申请阿里云 AK、SK
打开阿里云，点击用户头像，选择下面的访问控制界面
![用户头像、访问控制](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/7.jpg)

点击左侧侧边栏用户 tab，点击创建用户按钮
![点击创建用户按钮](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/8.jpg)

填写登录名称和显示名称，勾选下面的 OpenAPI 访问，不要勾选控制台访问
![勾选下面的 OpenAPI 访问，不要勾选控制台访问](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/9.jpg)

点击确定，创建用户成功，及时复制保存 AccessKey、AccessKey Secret
![一定要及时保存 AccessKey、AccessKey Secret，后面无法再次查看了](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/10.jpg)

点击左侧`授权`界面，点击`新增授权`，`授权主体`选择刚刚创建的用户，授权策略搜索`解析`，授权`管理云解析的权限`
![授权 -> 新增授权 -> 管理云解析](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/11.jpg)

> 在授权完成之后将 AccessKey、AccessKey Secret 回填到`创建 DNS 账户`环节

# 申请泛域名证书

点击`申请证书`按钮填写域名信息及选择 `Acme 账户`、`DNS 账号`，勾选自动续签，如果需要把证书用在其他地方可以勾选推送本地目录
![填写申请书信息](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/12.jpg)

查看执行日志，申请成功
![执行日志](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/13.jpg)

查看本地目录，会在本地目录生成 `fullchain.pem`,`privkey.pem` 两个证书文件吗，至此，证书申请完成
![本地目录](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/1panel-certs/17.jpg)

> 本文首发于技术博客 [Leeoo’s Blog](https://blog.ktzz.cc)，如果觉得这篇文章有所帮助，请不要犹豫，将它分享给那些可能从中受益的朋友和同事。您的支持是我继续创作高质量内容的动力。此外，如果有任何问题或想要进一步讨论的话题，请在下面的评论区留下想法。非常期待深入的交流