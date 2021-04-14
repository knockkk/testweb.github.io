---
title: 360考核系统（Express+Vue）开发记录
date: 2020-12-5
tags: 
  - Vue
  - Express
---

## 后端 Express

[项目地址](https://gitlab.dian.org.cn/knockkk/360check-server)

### 1. 项目初始化

（1）使用 express-generator 生成项目骨架

```sh
express --no-view #不带模板
```

（2）修改项目目录，如添加 controller，models等目录。

最终项目目录如下图所示：

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1gku9h14f9nj30ey14owja.jpg" alt="截屏2020-11-19 上午10.13.54" style="zoom:50%;" />

### 2. 数据库设计

此项目中使用Mongodb数据库，在写逻辑处理前我们需要先定义好数据库。下面是一个 user 表的字段：

```js
const UserSchema = new Schema({
  username: { type: String, unique: true },
  realname: { type: String },
  teamNo: { type: Number }, //团队编号(预备队员编号为0)
  identity: { type: String }, //1. 导师 2. 在站
});
```

设计时需要考虑Mongodb非结构化数据库的特点。

### 3. 功能设计

#### （1）登录模块

本项目使用session，并将其存储在 mongodb 中：

```sh
#安装依赖
npm install express-session
npm install connect-mongo
```

##### 登录

```js
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);

app.use(
  session({
    secret: "SDCA!@#$ASDAC^*(",
    cookie: { maxAge: 60 * 60 * 1000 },
    store: new mongoStore({ url: require("./config").dbUrl }),
  })
);

//测试路由
app.get("/", function (req, res) {
  if (req.session.userinfo) {
    res.send("你好" + req.session.userinfo + "欢迎回来");
  } else {
    res.send("未登录");
  }
});
app.get("/login", function (req, res) {
  req.session.userinfo = "张三"; //设置session
  res.send("登录成功");
});

//请求 /login 和 /即可正常完成session验证
```

最终存储在浏览器cookie中的内容为：

 <img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gj50gggbxvj30oc03uaaf.jpg" alt="截屏2020-09-27 上午10.42.30" style="zoom:50%;" />

##### 退出

```js
req.session.destroy(function (err) {
    if (err) {
        next({
          status: 500,
          msg: "操作失败",
        });
      } else {
        res.send({
          code: 0,
          msg: "success",
        });
      }
});
```



#### （2）设置允许跨域访问

```js
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
```



### 4. 中间件

#### （1）express.json()

```js
app.use(express.json()); //解析 Application/JSON 文件类型
```

#### （2）express.urlencoded()

```js
app.use(express.urlencoded({ extended: false })); //解析 Application/Urlencoded 文件类型
```

#### （3）自定义错误处理中间件

```js
app.use(errorHandler);

(err, req, res, next) => {
  if (typeof err === "object" && err.status) {
    const statusErrorMap = {
      400: "InvalidParams",
      401: "Unauthorized",
      500: "ServerError",
    };
    const status = err.status;
    const errType = statusErrorMap[status] || "";
    const msg = err.msg;
    res.status(status).send({ error: errType, msg });
  } else {
    res.status(500).send({ msg: JSON.stringify(err) });
  }
};
```

#### （4）身份认证中间件

```js
(req, res, next) => {
  if (!req.session.username) {
    next({
      status: 401,
      msg: "未登陆",
    });
  } else {
    next();
  }
};
```

### 5. 服务器部署

#### （1）准备服务器

阿里云等服务器。

ssh连接：

```sh
ssh root@120.27.238.75
```

#### （2）部署环境

此项目是Node.js + mongodb。

[部署Node.js教程](https://help.aliyun.com/document_detail/50775.html)

#### （3）部署项目

1. 拉取github最新代码
2. 上传前端静态文件

```sh
# 将前端打包后的dist文件夹上传到服务器项目public目录下
scp -r ./dist/*  root@120.27.238.75:/root/project/backend_360check/public
```

3. 启动服务

使用 pm2 部署项目：

```sh
npm run pm2
# 即运行下面的命令
PORT='1337' pm2 start ./bin/www --watch -i max
```



## 前端 Vue

[项目地址](https://gitlab.dian.org.cn/knockkk/360check_fe)

### 1. 目录结构

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1gkuanncnfmj30bm0rwac0.jpg" alt="截屏2020-11-19 上午10.54.53" style="zoom:50%;" />

### 2. 路由

使用vue-router库。

[vue-router教程](https://router.vuejs.org/zh/installation.html)

### 3. 状态管理

使用 vuex 库。

### 4. 请求

使用axios 库。

封装请求方法：

```js
import axios from "axios";
const request = (() => {
  const baseRequest = (method, url, params = {}) => {
    return new Promise((resolve, reject) => {
      axios[method](url, params)
        .then((response) => {
          const data = response.data || {};
          if (data.error && data.error === "NotLogin") {
            alert("请先登录！");
          }
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return {
    get: (url, params) => {
      return baseRequest("get", url, params);
    },
    post: (url, params) => {
      return baseRequest("post", url, params);
    },
  };
})();
export default request;
```

### 5. 配置跨域

前端设置

```js
withCredentials: true
```

另外：[浏览器80版本跨域无法携带cookie问题](https://harttle.land/2020/01/27/secure-cookies.html)

解决方案：开发时，使用Chrome浏览器打开 `chrome://flags/`，搜索`SameSite`并设置为`disabled`即可。