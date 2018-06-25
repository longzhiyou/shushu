
### 添加一个模块的顺序
- 在 src/app/pages.module.js angular.module中增加 如'BlurAdmin.pages.customers',BlurAdmin.pages是固定的值
- 在 src/app/下创建要增加的模块文件夹 如:customers,名字尽量用复数与rest资源命名相似
- 在新增的文件夹下面创建对应的 module.js 进行配置 参考:customers.module.js

### 选型
- admin 模板
    - [blur-admin](http://akveo.github.io/blur-admin/)

### 相关命令
- 安装package.json
    - 直接转到当前项目目录下
    - 用命令npm install 或npm install --save-dev安装即可
    - 自动将package.json中的模块安装到node-modules文件夹下