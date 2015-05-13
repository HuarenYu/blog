# 个人博客源码

### 一、采用的技术

* mongodb
* express
* markdown
* http basic authentication
* gulp
* bower

### 二、安装
* npm install
* bower install
* gulp
* mv config.sample.json config.json 并且修改为你的配置
* node lib/createdb.js 创建seed数据
* node app.js 运行
* 采用http basic authentication，访问/admin 输入你配置的用户名和密码管理和发布文章