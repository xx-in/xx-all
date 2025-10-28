import { produce } from "immer";
import { createSignal, createEffect, onMount, onCleanup } from "solid-js";
import { throttle, type IProps, type ISignal, type NonUndefined } from ".";

export const useEffect = createEffect;
/**
 * 组件创建
 */
export function useMount(fn: () => void): void;
export function useMount(fn: () => () => void): void;
export function useMount(fn: any): void {
  let cb: undefined | (() => void);
  onMount(() => {
    cb = fn();
  });
  onCleanup(() => {
    cb && cb();
  });
}

/**
 * 组件销毁
 */
export const useDestroy = onCleanup;

export function useSignal<T>(val: () => T): ISignal<T>;
export function useSignal<T>(val: null): ISignal<T | null>;
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
    const cb = val;
    const [get, set] = createSignal(cb());
    useEffect(() => set(cb()));
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

/**
 * 数据类型
 */
type IDatas<T> = {
  // 普通属性：非 on 开头，非 children
  [K in keyof Required<T> as K extends `on${string}` | `${string}hildren` | `${string}Comp`
    ? never
    : K]: ISignal<NonUndefined<T[K]>>;
} & {
  // on 开头属性或 children：保持原样
  [K in keyof T as K extends `on${string}` | `${string}hildren` | `${string}Comp`
    ? K
    : never]: T[K];
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
    if (prop.match(/hildren$/i) || prop.match(/Comp$/i) || prop.startsWith("on")) {
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
 * 根据id获取dom元素宽度
 * @param id
 * @returns
 */
export function useContainerWidth(id: string) {
  const width = useSignal(Infinity);
  /***
   * 实时获取容器宽度
   */
  useMount(() => {
    const container = document.getElementById(id)!;
    const onWidthChange = throttle(() => {
      // 获取容器的宽度并更新状态
      width.set(container.offsetWidth || Infinity);
    }, 500);
    const resizeObserver = new ResizeObserver(onWidthChange);
    resizeObserver.observe(container);
    return () => resizeObserver.unobserve(container);
  });

  return width;
}

// 基本类型映射
type MapType<T> = T extends (infer U)[]
  ? ISignal<MapType<U>[]>
  : T extends object
    ? ISignal<{ [K in keyof T]: MapType<T[K]> }>
    : ISignal<T>;

export function useDeepSignal<T>(value: T): MapType<T> {
  if (Array.isArray(value)) {
    return useSignal(value.map(item => useDeepSignal(item))) as any;
  }
  if (typeof value === "object" && value !== null) {
    const wrappedObj: Record<string, any> = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        wrappedObj[key] = useDeepSignal(value[key]);
      }
    }
    return useSignal(wrappedObj) as any;
  }
  return useSignal(value) as any;
}
