---
title: Typescirpt 5min快速上手
date: 2020-12-26
tags: 
  - Vue
---

> Typescript提供了Javascript的所有特性，唯一不同的是在Javascript之上建立了**类型系统**。

## 基本类型

```tsx
let helloWorld:string = "Hello World";
let num: number = 100;
let arr: number[] = [1, 2, 3];
```

## 函数

```tsx
function getUsername(id: number): string {
  return "XiaoMing";
}
const username: string = getUsername(101);

//箭头函数
const getUsername = (id: number): string => {
  return "XiaoMing";
};
const username: string = getUsername(101);
```

## 对象

```tsx
interface User {
  name: string;
  id: number;
}

const user: User = {
  name: "Hayes",
  id: 0,
};
```

## 类

```tsx
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
```

## Typescript 新增类型

Javascript 中的基本类型有`boolean`, `bigint`, `null`, `number`, `string`, `symbol`, `object`, `undefined`；TypeScript 中新增了几个类型：`any	`，`unknown`， `never` 和 `void` （函数返回`undefined`或无返回值）。

### `any` Vs. `unknown`

`any` 表示接受任意类型；`unknown` 则不同，它的约束更严格：

```tsx
let value: any = [];
let length = value.join(""); //OK

let value: unknown = [];
value.join(""); //Error
```

我们需要通过**类型判断**来缩小 unknown 范围：

```tsx
let value: unknown = [];
Array.isArray(value) && value.join(""); //OK
```

也可以通过 **类型断言** 来强制编译器信任类型：

```tsx
let value: unknown = [];
const arr: [] = value as [];
arr.join(""); //OK
```



## Unions 组合类型

> 多个值或多个类型之一

```tsx
//多个值之一
type WindowStates = "open" | "closed" | "minimized";
let state: WindowStates;
state = "otherstate"; //Error

//多个类型之一
type Props = string | number;
let props: Props;
props = true; //Error
```

使用时可以 **使用 `typeof`判断类型：**

```tsx
function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj];
  } else {
    return obj;
  }
}
```



## Generics 泛型

```tsx
interface Backpack<Type> { //Type可以声明为任意类型
  add: (val: Type) => void;
  get: () => Type;
}
const backpack: Backpack<string> = {
  add: (val: string) => {},
  get: () => {
    return "";
  },
};
backpack.add(100); //Error（参数应为string类型）
```



参考：[typescript-in-5-minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

