# blog
博客网站
##  1、简介
这是一个blog博客项目。<br>
##  2、功能
* ### 前台：
    * 首页的文章瀑布流、文章详情页的文章信息跟评论、图片列表、简介。
* ### 后台：
    * 文章的增删改查，与前台同步。
##  3、使用说明
* ### 直接clone项目
      $ git clone https://github.com/qq380428652/blog.git
* ### 安装依赖
      npm install 或 cnpm install
* ### 运行项目
      npm run build 或 cnpm run build
* ### 启动数据库
  > #### 进入数据库安装目录的bin文件夹
      cd C:\Program Files\MongoDB\Server\3.4\bin
  > #### 开启数据库（db为数据存放的位置，自定义）
      mongod --dbpath (路径)/data/db
* ### 运行node服务
      node app.js
##  4、注意
项目基于nodejs和数据库mongodb，使用前请先搭好node环境和mongdb数据库安装

