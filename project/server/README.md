# 目的-集大成
### db
- 主键 自己维护,不依赖数据库

### 账户体系:三户模型
- 客户，指自然人或者法人。法人一般被称之为企业客户。如无特指，一般客户指个人客户。
- 用户，指通过注册的方式进入系统，使用系统提供的服务的实体，也称为登录账户，即用户在系统中登录凭证和个人信息。对应的，法人客户在系统中注册后，被称之为商户。
- 账户，这里特指支付账户，指用户在支付系统中用于交易的资金所有者权益的凭证。

客户端实验不同的业务模块单独的css,服务器端用超媒体以及jpa 解决80%以上的简单业务

- 超媒体
    - 服务器:spring-boot-starter-data-rest
    - 客户端: 
- jpa的关联关系
    - 1-1
    - 1-m
    - m-n

### HAL
- 包:spring-data-rest-hal-browser
- 访问地址: http://127.0.0.1:8006/api/browser/index.html
- [使用 Spring Data Rest 创建HAL风格Restful接口](http://www.jianshu.com/p/84f2bbffb885)
- 解析相关库
    - [hal 相关库汇总](https://github.com/mikekelly/hal_specification/wiki/Libraries)
    - [angular-hal](https://github.com/LuvDaSun/angular-hal)
    - [angular-hypermedia](https://github.com/jcassee/angular-hypermedia)
### cascade属性表示
- 不定义,则对关系表不会产生任何影响
- CascadeType.PERSIST （级联新建）
- CascadeType.REMOVE （级联删除）
- CascadeType.MERGE （级联更新）中选择一个或多个。
- 还有一个选择是使用CascadeType.ALL ，表示选择全部四项


### 相关技术
- [restangular](https://github.com/mgonto/restangular)
- [spring boot 1.4默认使用 hibernate validator](http://www.cnblogs.com/softidea/p/6043879.html)
- jpa
    - [jpa概述](http://www.cnblogs.com/holbrook/archive/2012/12/30/2839842.html)
    - [Hibernate之jpa实体映射的三种继承关系](http://www.cnblogs.com/shangxiaofei/p/5704321.html)
    - [JPA One-To-One Shared Primary Key Relationship Mapping Example with Spring Boot](https://hellokoding.com/jpa-one-to-one-shared-primary-key-relationship-mapping-example-with-spring-boot-hsql/)
    - [JpaTreeDao](http://members.chello.at/fritz.ritzberger/downloads/jpatreedao/JpaTreeDao.html)
    - [JPA-NestedSet](https://github.com/romanb/JPA-NestedSet)
    - [Baobaba library applying the nested set model](http://baobab.sideralis.org/)
    - [Spring BootとSpring Data JPAで検索アプリケーションを開発してCircleCIでビルドする](http://qiita.com/rubytomato@github/items/7551b02abc34054301c0)

### 命名约定
- 数据表名：单数，下划线分隔单词（例如 book_club）
- 模型类名：单数，每个单词的首字母大写（例如 BookClub）
- 控制器:   PhotoController
- 文件命名全部采取首字母大写

## Restful为核心进行设计

### 参考
| HTTP 方法| 路径| 控制器#动作|作用|备注|返回码|
| ----- |-------------|-----|----|----|---|
|GET|/photos| photos#index|显示所有图片||||200|
|GET| /photos/:id | photos#show |显示指定的图片||
|POST|/photos|photos#create|新建图片||
|PUT | /photos/:id|photos#update|更新指定的图片||
|DELETE| /photos/:id | photos#destroy|删除指定的图片|||
|GET|/photos/new|photos#new|显示新建图片的表单|前端作为路由控制时不适用|
|GET|/photos/:id/edit|photos#edit|显示新建图片的表单|前端作为路由控制时不适用|

### 参考rails routes
| Prefix| Verb| URI Pattern|前端路由|Controller#Action|备注|
| ------------- |-------------|-----|----|----|----|
|articles|GET| /articles(.:format)|articles#index|index|
|articles| POST |/articles(.:format) |articles#create|create|
|new_article|GET|/articles/new(.:format)|articles#new|后端不需要|
|edit_article| GET|/articles/:id/edit(.:format)|articles#edit|后端不需要|
|article|GET  | /articles/:id(.:format)|articles#show|show|
|article|PUT|/articles/:id(.:format)|articles#update|update|
|article|DELETE|/articles/:id(.:format)|articles#destroy|destroy|


### 返回结果
- GET /collection：返回资源对象的列表（数组）
- GET /collection/resource：返回单个资源对象
- POST /collection：返回新生成的资源对象
- PUT /collection/resource：返回完整的资源对象
- PATCH /collection/resource：返回完整的资源对象
- DELETE /collection/resource：返回一个空文档
### 返回状态码
- 200 OK - for plain GET requests.
- 201 Created - for POST and PUT requests that create new resources.
- 204 No Content - for PUT, PATCH, and DELETE requests if the configuration is set to not return response bodies 
    for resource updates (RepositoryRestConfiguration.returnBodyOnUpdate). If the configuration value is set to include responses for PUT, 200 OK will be returned for updates, 201 Created will be returned for resource created through PUT.

### 过滤信息（Filtering）
- ?limit=10：指定返回记录的数量
- ?offset=10：指定返回记录的开始位置。
- ?page=2&per_page=100：指定第几页，以及每页的记录数。
- ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
- ?photo_type_id=1：指定筛选条件


### 状态码（Status Codes）
- 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
- 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
- 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
- 204 NO CONTENT - [DELETE]：用户删除数据成功。
- 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
- 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
- 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
- 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
- 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
- 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
- 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
- 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

### 日志相关
- [Spring Boot干货系列：（七）默认日志框架配置](http://blog.csdn.net/gebitan505/article/details/70142155?locationNum=1&fps=1)

### ui
- https://wrapbootstrap.com/
- http://www.themeon.net/nifty/v2.8/index.html
- http://coderthemes.com/minton/ 
- http://webapplayers.com/inspinia_admin-v2.7.1/index.html 
- https://htmlstream.com/preview/unify-v2.3/


### 参考文章
1. [paypal](https://developer.paypal.com/docs/api/)
1. [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
1. [Rails 路由全解](http://guides.ruby-china.org/routing.html)
1. [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
1. [Rails 路由全解](http://guides.ruby-china.org/routing.html)
1. [Exception Handling in Spring MVC](http://spring.io/blog/2013/11/01/exception-handling-in-spring-mvc)

