---
title: 一个使用React.memo优化的例子
date: 2020-12-26
tags: 
  - React
---

## React.memo使用示例

`React.memo` 的简单示例如下所示：

```tsx
const Child = React.memo((props: { id: number; onClick: () => void }) => {
  console.log("Child~");
  return <div>{props.id}</div>;
});

const App = () => {
  const [state, setState] = useState(1);
  console.log("App~");
  const handleClick = useMemo(() => () => {}, []);
  return (
    <div>
      <Child id={1} onClick={handleClick}></Child>
      <button
        onClick={() => {
          setState(state + 1);
        }}
      >
        点击
      </button>
    </div>
  );
};
```

使用React.memo的好处是：**当子组件接收的props没有变化时，子组件不会重渲染**。

需要注意的是，如果需要给子组件传递函数，则需要在父组件中使用 `useMemo` 或 `useCallback` 来保证这个函数的引用没有改变。



## 实际场景

如下图所示：页面中有多个富文本编辑器，它们的状态由同一个父组件 `<List>` 控制。

![截屏2020-12-26 下午3.23.31](https://tva1.sinaimg.cn/large/0081Kckwly1gm1acpq9qvj31920u0tdo.jpg)



当我们在一个输入框中连续输入内容，会出现卡顿的情况。优化之前，**在一个输入框中输入内容，所有输入框都会重渲染**：

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1gm1ag6la3pj30mw05ujsi.jpg" alt="截屏2020-12-26 下午3.23.31" style="zoom:50%;" />

当我们增加更多的输入框时，卡顿会越来越严重。这说明**多个输入框的渲染影响了单个输入框的响应速度**。



使用 React.memo 优化后，每次在一个输入框中输入，则只有这个输入框会重渲染，页面卡顿缓解了很多。这样即使渲染更多的富文本组件也不会有影响了。

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1gm1bxebrk0j30ng04y759.jpg" alt="截屏2020-12-26 下午4.17.55" style="zoom:50%;" />

