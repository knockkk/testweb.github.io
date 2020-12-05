---
title: Vue实现简单账号密码框
date: 2020-12-5
tags: 
  - Vue
---

### 实现一：不使用 `<form>`

```html
<div class="form">
  <div class="inputBox id">
    <label for="yxid">账号：</label>
    <input type="text" id="yxid" v-model="username" required />
  </div>
  <div class="inputBox">
    <label for="pwd">密码：</label>
    <input type="password" id="pwd" v-model="password" required />
  </div>
  <div class="submit">
    <button @click="onSubmit">提交</button>
  </div>
</div>

```

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1gku8a1l5lrj30ok0cogmm.jpg" alt="截屏2020-11-19 上午9.32.30" style="zoom:50%;" />

这样可以避免`<form>`的默认提交行为，但其缺点至少有两个：

1. 无法利用表单的**数据校验功能**

2. 键盘上**点击Enter键不会触发提交**

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1gku8fh8329j30nc0cit9m.jpg" alt="截屏2020-11-19 上午9.37.44" style="zoom:50%;" />



### 实现二（推荐）：使用 `<form>`

```html
<form @submit.prevent="onSubmit">
  <div class="inputBox id">
    <label for="yxid">账号：</label>
    <input type="text" id="yxid" v-model="username" required />
  </div>
  <div class="inputBox">
    <label for="pwd">密码：</label>
    <input type="password" id="pwd" v-model="password" required />
  </div>
  <div class="submit">
    <button type="submit">提交</button>
  </div>
</form>
```

主要注意：

1. 屏蔽 `<form>` 的默认提交功能。Vue中可以直接使用 `@submit.prevent="onSubmit"`

2. `<form>`内部的提交按钮可以响应 Enter键 事件。且 `<form>` 在提交前会对表单数据进行校验。

3. `<form>` 的语义化更好。