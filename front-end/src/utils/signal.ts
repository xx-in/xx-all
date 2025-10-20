import { produce } from "immer";
import {
  createSignal,
  createEffect,
  type Accessor,
  type Setter,
  onMount,
  type JSX,
  onCleanup,
} from "solid-js";
import type { ClassNameValue } from "tailwind-merge";

export const useEffect = createEffect;
/**
 * 组件创建
 */
export const useMount = onMount;
/**
 * 组件销毁
 */
export const useDestroy = onCleanup;
export interface ISignal<T> {
  get: Accessor<T>;
  set: Setter<T>;
  update: (cb: (cur: T) => void) => void;
  __signal: boolean;
}

export function useSignal<T>(val: () => T): ISignal<T>;
export function useSignal<T>(val: T | ISignal<T>): ISignal<T>;
export function useSignal<T>(val: T | ISignal<T>) {
  // 1. 信号类型
  //@ts-ignore
  if (val && val.__signal) {
    return val as ISignal<T>;
  }

  function update(callback: (cur: T) => void) {
    // @ts-ignore
    set(produce(get(), callback));
  }

  // 2. 函数类型是用于生成计算属性
  if (typeof val == "function") {
    const [get, set] = createSignal(val());
    useEffect(() => {
      set(val());
    });
    return {
      update,
      get,
      set,
      __signal: true,
    };
  }
  const [get, set] = createSignal(val);
  // 3. 其他任意类型
  return {
    update,
    get,
    set,
    __signal: true,
  };
}

export type ISignalProp<T> = T | ISignal<NonNullable<T>>;

/**
 * 数据类型
 */
type IDatas<T> = {
  // 普通属性：非 on 开头，非 children
  [K in keyof Required<T> as K extends `on${string}` | `${string}Children` | "children"
    ? never
    : K]: ISignal<NonUndefined<T[K]>>;
} & {
  // on 开头属性或 children：保持原样
  [K in keyof T as K extends `on${string}` | `${string}Children` | "children" ? K : never]: T[K];
};

/**
 * 参数类型
 */
export type IProps<T> = {
  [K in keyof T]: T[K] | ISignal<NonNullable<T[K]>>;
};

/**
 * 将参数类型转变为数据类型
 * @param props 参数
 * @param defaultProps 默认参数
 * @returns
 */
export function useProps<T extends Record<string, any>>(
  props: IProps<T>,
  defaultProps: RequiredFromOptional<T>,
) {
  const result = {} as IDatas<T>;
  Object.entries({
    ...defaultProps,
    ...props,
  }).forEach(([prop, value]) => {
    /**
     * 如果以on开头或者为属性包含chidren
     * 则该内容直接渲染，不处理
     *
     * 否则处理为信号类型
     */
    if (prop.match(/children/i) || prop.startsWith("on")) {
      // @ts-ignore
      result[prop] = value;
    } else {
      //
      // @ts-ignore
      result[prop] = useSignal(value);
    }
  });
  return result;
}

/**
 * 将可选的属性挑出来并设置为必填；
 * 如果属性名以 "on" 开头，则保持原样。
 */
type RequiredFromOptional<T> = {
  [K in keyof T as {} extends Pick<T, K>
    ? K extends `on${string}`
      ? never
      : K // 不处理 on 开头的
    : never]-?: T[K];
};

/**
 * 将可选类型转变为必填
 */
type NonUndefined<T> = Exclude<T, undefined>;

export type Children = JSX.Element;

export type ClassName = ClassNameValue;
