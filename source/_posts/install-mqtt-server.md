---
title: 基于 docker-compose 安装 MQTT 服务集群
date: 2024-06-19 19:07:21
categories:
  - 软件部署
  - MQTT
  - 部署安装
index_img: /img/message.jpg
banner_img: /img/message.jpg
---

# 部署方式
| 分类     | 内容                   |
| :------- | :--------------------- |
| 服务器   | 单机、阿里云、centos 7 |
| 部署方式 | docker compose         |
| 部署模式 | MQTT 集群              |

# 资源准备
## 阿里云机器申请

可以使用阿里云抢占式实例做为测试部署服务器，为了方便 docker 镜像下载方便可以把机器开在香港地区

![开通抢占式实例机器](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/install-mqtt/1.jpg?x-oss-process=image/watermark,image_YmxvZ3Mvd2F0ZXJtYXJrLnBuZw)
![4C8G Centos7](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/install-mqtt/2.jpg?x-oss-process=image/watermark,image_YmxvZ3Mvd2F0ZXJtYXJrLnBuZw)
![开通公网 IP、按量计费](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/install-mqtt/3.jpg?x-oss-process=image/watermark,image_YmxvZ3Mvd2F0ZXJtYXJrLnBuZw)

> 服务器启动好之后 ssh 连接到服务器上继续后续操作

## docker 环境安装
``` bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo systemctl start docker
```

> 测试 docker 服务是否正常安装可以使用命令： `docker ps`
> 其他操作系统或者环境 docker 安装参考：[https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

![docker ps 有正常输出就是安装正常的](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/install-mqtt/4.jpg)

## git 安装

```bash
yum install -y git
```

# 部署 MQTT 服务器集群
```
git clone https://github.com/emqx/emqx-usage-example
cd emqx-usage-example/mqtt-lb-nginx/
docker compose up -d
```
![正常部署成功界面如图所示](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/install-mqtt/5.jpg?x-oss-process=image/watermark,image_YmxvZ3Mvd2F0ZXJtYXJrLnBuZw)

## 部署验证

部署成功我们可以访问服务器的 18083 端口，访问 MQTT 集群的 dashboard, 默认账号是 admin，密码是 public，登录以后会提示你修改密码

![查看服务情况](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/install-mqtt/6.jpg?x-oss-process=image/watermark,image_YmxvZ3Mvd2F0ZXJtYXJrLnBuZw)
![访问 18083 端口登录，默认账密是 admin/public](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/install-mqtt/7.jpg?x-oss-process=image/watermark,image_YmxvZ3Mvd2F0ZXJtYXJrLnBuZw)
![提示修改密码](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/install-mqtt/8.jpg?x-oss-process=image/watermark,image_YmxvZ3Mvd2F0ZXJtYXJrLnBuZw)
![查看概览](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/install-mqtt/9.jpg?x-oss-process=image/watermark,image_YmxvZ3Mvd2F0ZXJtYXJrLnBuZw)
![查看节点](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/install-mqtt/10.jpg?x-oss-process=image/watermark,image_YmxvZ3Mvd2F0ZXJtYXJrLnBuZw)

## 连接验证
我们可以使用 MQTT cli 进行连接验证，下面是验证方法

```bash
# 安装
curl -LO https://www.emqx.com/en/downloads/MQTTX/v1.9.10/mqttx-cli-linux-x64
install ./mqttx-cli-linux-x64 /usr/local/bin/mqttx
# 发起 10 个连接
mqttx bench conn -c 10
```

![安装 MQTT cli](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/install-mqtt/13.jpg?x-oss-process=image/watermark,image_YmxvZ3Mvd2F0ZXJtYXJrLnBuZw)
![查看连接情况](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/install-mqtt/11.jpg?x-oss-process=image/watermark,image_YmxvZ3Mvd2F0ZXJtYXJrLnBuZw)
![可以看到已经有 10 个客户端连接](https://images-ktzz.oss-cn-beijing.aliyuncs.com/blogs/install-mqtt/12.jpg?x-oss-process=image/watermark,image_YmxvZ3Mvd2F0ZXJtYXJrLnBuZw)

> 安装完成，可以正常访问使用


# 部署参考文档
[https://www.emqx.com/zh/blog/emqx-mqtt-broker-k8s-cluster](https://www.emqx.com/zh/blog/emqx-mqtt-broker-k8s-cluster)
[https://www.emqx.com/zh/blog/install-emqx-mqtt-broker#%E4%BD%BF%E7%94%A8-docker-%E5%AE%89%E8%A3%85-emqx](https://www.emqx.com/zh/blog/install-emqx-mqtt-broker#%E4%BD%BF%E7%94%A8-docker-%E5%AE%89%E8%A3%85-emqx)
[https://docs.emqx.com/zh/emqx/latest/deploy/cluster/create-cluster.html](https://docs.emqx.com/zh/emqx/latest/deploy/cluster/create-cluster.html)

> 本文首发于技术博客 [Leeoo’s Blog](https://blog.ktzz.cc)，如果觉得这篇文章有所帮助，请不要犹豫，将它分享给那些可能从中受益的朋友和同事。您的支持是我继续创作高质量内容的动力。此外，如果有任何问题或想要进一步讨论的话题，请在下面的评论区留下想法。非常期待深入的交流