---
title: Web富文本编辑器实现
date: 2020-12-15
tags: 
  - React
---

## 实现一

1. 设置属性 `contenteditable="true"` 使元素可编辑
2. 使用 `document.execCommand`命令来操作 **可编辑区域** 中**选中的内容**

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1glnd3j942mj30vu0est9a.jpg" alt="截屏2020-12-14 下午2.20.40" style="zoom:40%;" />

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Rich Text Editor</title>
    <style>
      button {
        margin: 5px;
        font-size: 12px;
        padding: 3px 10px;
      }

      .textBox {
        width: 500px;
        height: 200px;
        border: 1px #000000 solid;
        padding: 12px;
        overflow: scroll;
      }
    </style>
    <script>
      function formatDoc(sCmd, sValue) {
        document.execCommand(sCmd, false, sValue);
      }
    </script>
  </head>

  <body>
    <div>
      <button onclick="formatDoc('formatblock','h1');">标题</button>
      <button onclick="formatDoc('bold');">粗体</button>
      <button onclick="formatDoc('italic');">斜体</button>
    </div>
    <div class="textBox" contenteditable="true"><p>Hello World~</p></div>
  </body>
</html>
```

只需要简单的这些代码，就可以操控文字样式了。原理就是执行命令后，**选中内容会被加上相应的标签和样式：**

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1glndbsqw2bj30no08gq41.jpg" alt="截屏2020-12-14 下午2.28.39" style="zoom:50%;" />



### 缺点

`document.execCommand` 在不同浏览器浏览器的实现上存在差异，表现在剪切板API，换行处理，键盘事件，指令行为等等的不一致上。

如 **bold** 指令，IE 和 Opera 会使用 \<strong> 标签包裹文本，而 Safari 和 Chrome则 使用 \<b> 标签，firefox 使用 \<span>。

MDN文档上也声明这个接口已被废弃：

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1glndeokbgdj31li0fywhx.jpg" alt="截屏2020-12-14 下午2.31.27" style="zoom:30%;" />



## 实现二

1. 维护一个结构化的对象 **State** 来描述富文本的DOM结构
2. 捕获浏览器事件，在事件触发时修改 **State** 对象，再把对象映射为DOM结构，从而实现数据控制视图

这就严格控制了元素的渲染和行为，使得每个操作将保证它的一致性。

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1gloervp1h3j314a0mqn6y.jpg" alt="截屏2020-12-15 下午12.04.14" style="zoom:20%;" />



相关JS库：

1. [draft.js](https://github.com/facebook/draft-js) 

   基于React，可高度定制化富文本的控制

    ![Live Demo](https://camo.githubusercontent.com/50551c59fb8c39c6c28f96a742753998c859aacb75f6b1242a69bf12cf900bc4/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f5848556a6178454c7063313153695253714e2f67697068792e676966)

   

2. [braft-editor](https://github.com/margox/braft-editor)

   基于draft.js，做了一些功能的封装

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1glof229li0j319g0s6jst.jpg" alt="截屏2020-12-15 下午12.14.03" style="zoom:40%;" />



## 参考

1. [聊聊富文本编辑器](https://minsky.me/%E8%81%8A%E8%81%8A%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8/#document-execCommand)

2. [Draft.js 在知乎的实践](https://zhuanlan.zhihu.com/p/24951621)

3. [深入浅出contenteditable富文本编辑器](https://zhuanlan.zhihu.com/p/37051858?edition=yidianzixun&utm_source=yidianzixun&yidian_docid=0J5z1tQQ)
4. [draft.js](https://draftjs.org/docs/getting-started/)

4. [braft-editor](https://github.com/margox/braft-editor)

