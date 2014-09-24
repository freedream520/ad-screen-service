# 数据库设计 #

## 【暂不使用】核心数据库 db_pro_core ##

### 【暂不使用】组织机构 organizations ###

- id：组织机构的英文名称代号（唯一标识）。
- title：组织机构的中文名称。
- description：组织机构的描述信息。

## 广告屏数据库 db_pro_screen ##

### 广告屏终端组 screen_groups ###

- id：广告屏终端组的标识。
- title：广告屏终端组的标题名称。
- description：广告屏终端组的描述信息。
- org：所属组织机构的标识。

### 广告屏终端 ad_screens ###

- id：广告屏终端的标识。
- title：广告屏终端的标题名称。
- description：广告屏终端的描述信息。
- group：所属广告终端组的标识。
- org：所属组织机构的标识。

### 广告屏广告 screen_ads ###

- id：广告的标识。
- title：广告的主题。
- slotType：广告的位置。
- materielType：广告物料的类型。
- path：广告物料的文件地址。
- org：所属组织机构的标识。
- active：广告的激活状态。
- start：广告开始投放的时间。
- end：广告结束投放的时间。
- screens：投放的广告屏终端ID列表。
