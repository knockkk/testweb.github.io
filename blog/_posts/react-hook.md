---
title: React Hook 上手与实践
date: 2020-12-28
tags: 
  - React
---

## Hook 指南

## useState 

### 基础使用

```js
const [count, setCount] = useState(0);
const addClick= () => {
  setCount(count + 1);
}
```

1. 更新是 **异步的**，`setCount` 后你无法立即获取到最新的 count 值；
2. **跳过 state 更新**：如果 `setCount` 传入的值 与当前 `count` 完全相同（使用 `Object.is()` 比较），则随后的 **重渲染会被跳过**。



### *函数式更新state

在旧状态值基的础上操作，返回新的状态值，更方便理解。

```js
const addClick= () => {
   setCount(prevCount => prevCount + 1)
}
```



### 初始state传入函数

> 如果初始 state 需要通过复杂计算获得，则可以**传入一个函数**，在函数中计算并返回初始的 state。**此函数只在初始渲染时被调用**，即只会被调用一次。

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```



参考：[hook-state](https://zh-hans.reactjs.org/docs/hooks-state.html)



## useReducer

> 在 state 逻辑较复杂且包含多个子值的情况下，useReducer可能比useState更适用。

```jsx
import { useReducer } from "react";
const initialState = { count: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
};
```

**如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。**



### dispatch函数是不变的

> React 会确保 `dispatch` 函数的标识是稳定的，并且不会在组件重新渲染时改变。

也就是当我们传递 dispatch 给子组件，每次重新渲染时，dispatch函数的引用都会保持不变，而不是像普通函数那样每次都会创建一个新的对象。



### 惰性初始化

可以使用函数来初始化 initState，并且可以给这个函数传入参数。

```jsx
const [state, dispatch] = useReducer(reducer, initialCount, init);
```

`init` 函数只会在组件初始化时执行一次。



注意，像下面这样直接传入函数并不可取❌，因为它会在**每次状态更新时执行**，而不是仅在第一次初始化时执行。

```js
//错误
const [state, dispatch] = useReducer(reducer, init());
```





## useEffect

### 基础使用

```js
useEffect(() => {
    //...
});
```



### effect 的执行时机

`useEffect` 传入一个函数，这个函数将在 **每轮渲染结束后 （DOM更新之后） **执行。

```js
const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("useEffect执行了～ count: ", count);
  });
  console.log("123456");

  const addClick = () => {
    setCount((prevCount) => prevCount + 1);
    console.log("更新count值～");
  };
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={addClick}>Add</button>
    </div>
  );
};
```

 <img src="https://tva1.sinaimg.cn/large/0081Kckwgy1gm05oo4wgwj30l4076q3l.jpg" alt="截屏2020-12-25 下午3.56.34" style="zoom:50%;" />

`useEffect` 函数中获取的state值 **始终是最新的**。你可以在这里监听状态的变化，如：

```js
useEffect(()=>{
	//...
},[count])
```



### 清除 effect

> `useEffect` 函数返回一个函数，这个函数会在 **每次重新渲染前** 执行。

 ```js
const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("useEffect执行了～", count);
    return () => {
      console.log("useEffect清除函数执行了～", count);
    };
  });

  const addClick = () => {
    console.log("更新state~");
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={addClick}>Add</button>
    </div>
  );
};
 ```

 <img src="https://tva1.sinaimg.cn/large/0081Kckwgy1gm06cknpn6j30fi05q74w.jpg" alt="截屏2020-12-25 下午4.19.30" style="zoom:50%;" />



### effect 的条件执行

```js
useEffect(() => {
  console.log("useEffect执行了～", count);
},[count]);
```

此时，**只有当 `count` 改变后 `useEffect` 函数 才会重新执行**。如果传入空数组，则 `useEffect` 函数只会执行一次。



## useLayoutEffect

> `useEffect` 在浏览器 **完成布局与绘制之后** 执行， [`useLayoutEffect`](https://zh-hans.reactjs.org/docs/hooks-reference.html#uselayouteffect) 则是在浏览器执行下一次绘制前执行，这样用户就不会感觉到视觉上的不一致，但是它的弊端是会**阻塞渲染**。

区别可以参考 [这篇文章](https://juejin.cn/post/6844904008402862094)。



## useContext

适用于**参数需要传递给深层组件**的场景。

```tsx
import React, { useContext } from "react";
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};
const ThemeContext = React.createContext(themes.light);
const App = () => {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
};

const Toolbar = () => {
  return <ThemedButton />;
};

const ThemedButton = () => {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
};

```

### 结合 useReducer使用

```jsx
import React, { useReducer, useContext } from "react";
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};
const init = (count) => {
  return { count };
};
const ReducerContext = React.createContext(null);
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, 100, init);
  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      <Child></Child>
    </ReducerContext.Provider>
  );
};

const Child = () => {
  const { state, dispatch } = useContext(ReducerContext);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
};
export default Counter;
```



## useCallback

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

该回调函数**仅在某个依赖项改变时才会更新**，所以可以维持`memorizedCallback` 在每次组件更新时保持不变。

> 当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

如与React.memo搭配使用：

```js
const Child = React.memo((props: { id: number; onClick: () => void }) => {
  console.log("Child~");
  return <div>{props.id}</div>;
});
const App = () => {
  const [state, setState] = useState(1);
  const handleClick = useCallback(() => {}, []);
  console.log("App~");
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



## useMemo

> 它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

```js
const memorizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

可以当作 Vue 的Computed使用。



## Hook实现原理

理解：Hook就是一些与组件绑定的钩子。一个简单的函数组件，只是执行并返回新的视图而已。而Hook却能赋予组件一些“特性”。比如**state hook** 可以让组件控制状态从而改变视图，而**effect hook** 则可以在组件初始化，组件更新，或是某个状态变化时执行。hook使得函数组件拥有了复杂组件所需要的完整功能。

[useState简单实现](https://codesandbox.io/s/hook-h8bhy?file=/src/react.js)



## Hook规则

我们知道，`useState` 和 `useEffect`都可以在一个组件中使用多次，而它实现的基础就是维护了一个顺序的数组（也可以链表实现）。所以我们必须保证每一次组件更新 hook 都是顺序读取的。

### 只在最顶层使用 Hook

> **不要在循环，条件或嵌套函数中调用 Hook，** 确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。

⚠️避免在条件语句中调用 Hook：

```js
  // 🔴 在条件语句中使用 Hook 违反第一条规则
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
```





## 在TS中使用 React Hook

### 创建 React + TS 项目

（1）创建项目

```sh
npx create-react-app react_ts_demo --typescript
```

（2）安装依赖

```sh
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

（3）将 `index.js` 重命名为` index.tsx` ，运行 `npm run start` 将自动创建 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```

具体hook使用参考：https://www.freecodecamp.org/news/react-typescript-how-to-set-up-types-on-hooks/

### useReducer

[使用示例](https://codesandbox.io/s/ts-usereducer-71i00?file=/src/App.tsx)



## 参考

1. [React官方文档](https://zh-hans.reactjs.org/docs/hooks-reference.html)
2. [create-react-app/docs/adding-typescript](https://www.html.cn/create-react-app/docs/adding-typescript/)
3. https://github.com/brickspert/blog/issues/26
4. https://www.freecodecamp.org/news/react-typescript-how-to-set-up-types-on-hooks/



