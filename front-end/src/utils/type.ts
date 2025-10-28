import type { Accessor, JSX, Setter } from "solid-js";
export type { Component } from "solid-js";
import type { ClassNameValue } from "tailwind-merge";

export type Children = JSX.Element | Element;
export type ClassName = ClassNameValue;

/**
 * 信号类型
 */
export interface ISignal<T> {
  get: Accessor<T>;
  set: Setter<T>;
  update: (cb: (cur: T) => void) => void;
  __signal: boolean;
}
export type ISignalProp<T> = T | ISignal<NonUndefined<T>>;

/**
 * 信号参数类型
 */
export type IProps<T> = {
  [K in keyof T]: T[K] | ISignal<NonUndefined<T[K]>>;
};

/**
 * 将可选类型转变为必填
 */
export type NonUndefined<T> = T extends undefined ? never : T;
// type NonUndefined<T> = Exclude<T, undefined>;
