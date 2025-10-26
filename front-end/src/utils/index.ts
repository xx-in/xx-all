export * from "./clipboard";
export * from "./signal";
export * from "./dom.tsx";
import { nanoid } from "nanoid";
// JSON 循环引用的解析
export * from "./base64";
export * from "./jsx.tsx";
export * from "./validate";
export * from "./json.tsx";
/**
 * 生成随机ID
 */
export const randomId = nanoid;
/**
 * 文件去重
 */
export * from "./md5";

export function throttle<T extends (...args: any[]) => void>(fn: T, delay = 300): T {
  let timer: number | null = null;
  return ((...args: any[]) => {
    if (timer) return;
    timer = window.setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  }) as T;
}

export * from "./file";
