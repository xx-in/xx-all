import type { JSX } from "solid-js";

/**
 * 高阶组件 wrapper
 * @param Comp - 被包裹的组件
 * @param wrapperProps - 默认 props
 * @returns 新组件
 */
export function wrapper<
  P extends Record<string, any> = {}, // 组件 props 类型泛型
>(
  Comp: (props: P) => JSX.Element, // 被包裹组件
  wrapperProps?: Partial<Omit<PageRevealEvent, "children">> & {
    children: () => JSX.Element;
  }, // 默认 props
) {
  return (props: P) => {
    const mergedProps = { ...wrapperProps, ...props };
    return <Comp {...mergedProps} />;
  };
}
