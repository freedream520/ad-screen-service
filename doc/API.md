# API #

## 广告屏终端组 ##

### 获取广告屏终端组列表 ###

REST URI：/ad-screen/api/screen-groups

HTTP方法：GET

返回数据：

	[
      { id: '1', title: '广告屏终端组1', description: '广告屏终端组1是第1个广告屏终端组' },
      ...
    ]

### 获取广告屏终端组数据实体 ###

REST URI：/ad-screen/api/screen-groups/:id

HTTP方法：GET

返回数据：

	{ id: '1', title: '广告屏终端组1', description: '广告屏终端组1是第1个广告屏终端组' }

### 添加广告屏终端组数据 ###

REST URI：/ad-screen/api/screen-groups

HTTP方法：POST

提交数据：

	{ title: '广告屏终端组1', description: '广告屏终端组1是第1个广告屏终端组' }

### 更新广告屏终端组数据 ###

REST URI：/ad-screen/api/screen-groups

HTTP方法：PUT

提交数据：

	{ id: '1', title: '广告屏终端组1', description: '广告屏终端组1是第1个广告屏终端组' }

## 广告屏终端 ##

### 获取广告屏终端列表 ###

REST URI：/ad-screen/api/ad-screens

HTTP方法：GET

返回数据：

	[
      { id: '1', title: '广告屏终端1', description: '广告屏终端1是第1个广告屏终端',  group: '' },
      ...
    ]

### 获取广告屏终端数据实体 ###

REST URI：/ad-screen/api/ad-screens/:id

HTTP方法：GET

返回数据：

	{ id: '1', title: '广告屏终端1', description: '广告屏终端1是第1个广告屏终端', group: '' }

### 添加广告屏终端数据 ###

REST URI：/ad-screen/api/ad-screens

HTTP方法：POST

提交数据：

	{ title: '广告屏终端1', description: '广告屏终端1是第1个广告屏终端', group: '' }

### 更新广告屏终端数据 ###

REST URI：/ad-screen/api/ad-screens

HTTP方法：PUT

提交数据：

	{ id: '1', title: '广告屏终端1', description: '广告屏终端1是第1个广告屏终端', group: '' }

### 下载广告屏终端HTML文件 ###

REST URI：/ad-screen/api/ad-screens/html/:id

HTTP方法：GET

## 广告屏广告 ##

### 获取广告屏广告列表 ###

REST URI：/ad-screen/api/screen_ads

HTTP方法：GET

查询参数：

- page：查询的页码（默认第1页）
- rows：一次查询需要的记录条数（默认20条）
- group：所属广告屏终端组
- screen：所属广告屏终端
- active：激活状态

返回数据：

	{
	  "total": "10",
	  "page": "1", 
	  "records": "10000",
	  "rows": [
	    { "id": "1", "title": "广告屏上投放的广告1", "active": 1, "start": "2014-09-20 13:36", "end": "2014-09-20 13:36" },
	    { "id": "2", "title": "广告屏上投放的广告1", "active": 1, "start": "2014-09-20 13:36", "end": "2014-09-20 13:36" },
	    { "id": "3", "title": "广告屏上投放的广告1", "active": 1, "start": "2014-09-20 13:36", "end": "2014-09-20 13:36" },
	    { "id": "95", "title": "广告屏上投放的广告1", "active": 1, "start": "2014-09-20 13:36", "end": "2014-09-20 13:36" }
	  ]
	}

### 获取广告屏广告数据实体 ###

REST URI：/ad-screen/api/screen_ads/:id

HTTP方法：GET

返回数据：

	{ "id": "1", "title": "广告屏上投放的广告1", slotType: "", materielType: "", path: "", "active": 1, "start": "2014-09-20 13:36", "end": "2014-09-20 13:36", screens: ["1", "2", "3"] }

### 添加广告屏广告数据 ###

REST URI：/ad-screen/api/screen_ads

HTTP方法：POST

提交数据：

	{ "title": "广告屏上投放的广告1", slotType: "", materielType: "", path: "", "active": 1, "start": "2014-09-20 13:36", "end": "2014-09-20 13:36", screens: ["1", "2", "3"] }

### 更新广告屏广告数据 ###

REST URI：/ad-screen/api/screen_ads

HTTP方法：PUT

提交数据：

	{ "id": "1", "title": "广告屏上投放的广告1", slotType: "", materielType: "", path: "", "active": 1, "start": "2014-09-20 13:36", "end": "2014-09-20 13:36", screens: ["1", "2", "3"] }

## 上传物料文件 ##

REST URI：/ad-screen/api/upload

HTTP方法：POST
