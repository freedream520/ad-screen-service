# 互联网广告屏的后端服务 #

## 环境依赖 ##

- mongoDB服务需开启，最好设置为开机启动。

环境依赖的部署安装，参考：[http://www.localad.org.cn/requisites.html](http://www.localad.org.cn/requisites.html)

## 部署服务的目录结构 ##

部署服务需要的目录结构如下：

- **config：**服务的配置目录
- **ad-screen：**服务的软链接目录。
- **data：**服务的数据存储目录。
	- **mongodb：**MongoDB的目录。
		- **data：**数据库目录。
		- **log：**日志目录。
- **static：**用于存储上传的广告物料等静态资源。
- **tmp：**上传文件时，用于临时存储。
- **release：**版本发布目录。

**建议：**可以部署在目标服务器的`/home/localad/ad-screen-service`目录下。

## 服务部署的方法 ##

### 克隆和部署 ###

使用GIT克隆项目代码：

	cd /home/localad/ad-screen-service/release
	git clone https://github.com/com-localad/ad-screen-service.git ad-screen-service-{版本号} -b {版本号}

### 建立软连接 ###

	rm -rf /home/localad/ad-screen-service/ad-screen
	ln -s /home/localad/ad-screen-service/release/ad-screen-service-{版本号}/dist/ad-screen /home/localad/ad-screen-service/ad-screen

### 配置系统 ###

第一次部署时，需要复制系统配置文件，并设置：

	cp -r /home/localad/ad-screen-service/release/ad-screen-service-{版本号}/dist/config /home/localad/ad-screen-service

可以使用如下命令，复制mongoDB的存储目录结构：

	cp -r /home/localad/ad-screen-service/release/ad-screen-service-{版本号}/dist/data /home/localad/ad-screen-service

## 配置文件 ##

### 应用的配置 ###

配置文件：`config/settings.json`

	{
	    "serverHost": "http://113.10.167.163:8341",
	    "uploadDir": "/home/localad/ad-screen-service/static/uploads"
	}

- **serverHost：**服务的地址（用于替换广告屏终端HTML中访问物料的服务地址）
- **uploadDir：**上传物料的目标路径

### Web服务器的配置 ###

配置文件：`config/pro.json`

	{
	    "app": {
	        "http_port": "8341",
	        "static_routes": [
	            { "path": "/uploads", "dir": "/home/localad/ad-screen-service/static/uploads" }
	        ]
	    }
	}

- **http_port：**服务的端口
- **static_routes：**静态资源外部访问的配置

### 数据库的配置 ###

配置文件：`config/dao/mongodb.json`

## 启动系统服务 ##

### Windows测试环境 ###

进入`dist/ad-screen/bin`目录，使用`shift+右键`，在当前目录打开命令窗口。

执行命令`node-server.cmd`，启动桩的Web服务（安装NPM包，扫瞄服务模块，启用端口，启用域名）。

### Linux产品环境 ###

进入`ad-screen/bin`目录，可以使用以下命令：

1. `sh server-install.sh`：安装服务框架NPM包，扫瞄服务模块，安装服务模块依赖的NPM包。
2. `sh node-server.sh start`：启动产品环境的Web服务（启用端口，启用域名）。
3. `sh node-server.sh stop`：停止产品环境的Web服务。
4. `sh node-server.sh restart`：重启产品环境的Web服务。

## 防火墙策略 ##

开启8341端口：

	/sbin/iptables -I INPUT -p tcp --dport 8341 -j ACCEPT

保存配置：

	/etc/rc.d/init.d/iptables save

重启服务：

	/etc/rc.d/init.d/iptables restart

查看端口是否已经开放：

	/etc/init.d/iptables status 