import type { JSX } from "solid-js";
import { render } from "solid-js/web";

/**
 * 将组件作为新内容渲染到DOM的body中
 * @param Comp
 */
export function appendComponentToBody(Comp: () => JSX.Element) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  render(() => <Comp />, container!);
}
