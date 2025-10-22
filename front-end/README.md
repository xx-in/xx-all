# solid-js 组件库

为什么选择`solid-js`来实现这个组件库，而不是用其他的框架呢，是因为`solid-js`存在几个优势：

1. 基于信号量机制，渲染逻辑更清晰，虽然存在`API`上的不一致性，但经过封装后已经较为一致。
   - 信号量是我选择的重要原因，因为信号可以在各种位置传递，而不会丢失响应式。
2. 基于`JSX`渲染，边界条件少，相比`react`心智负担较轻，没有`hooks`各种限制。

## 高阶组件

`solid-js`中的`children`因为采用的编译方案，是直接将组件编译为`DOM`，而不存在`虚拟DOM`中转。所以`children`存在一些特殊行为:

注意：这里的`children`指的是`props.children`

- `children` 在`ts`中的类型是普通变量，但实际上是一个`readSignal`函数。

- `children`只能被渲染一次，第二次渲染是移动，原因未知，如果需要多次渲染，考虑多包裹一次函数实现。

## null vs undefined

之前一直以为`null`和`undefined`的功能重复了，直到我使用`typescript`来完成一些功能的时候。`null`和`undefined`都表示空，其中未赋值的变量默认为`undefined`。根据这点行为上的不同，我们可以在思维模型上区分这种类型：

- `undefined`表示未赋值，在变量处理上，我们可以给这种变量赋默认值
- `null`表示已经赋值，在变量处理上，此时我们就不能给变量赋默认值

或者做如下类比：

```js
let v1 = 0; // number
let v2 = ""; // string
let v3 = null; // object
```
