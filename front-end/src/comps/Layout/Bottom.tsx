import { useProps, useSignal, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";

function toPx(n: number) {
  return n + "px";
}

interface ILayoutBottomProps {
  height?: number;
  children?: Children;
  class?: ClassName;
}

export function Bottom(props: IProps<ILayoutBottomProps>) {
  const {
    height,
    children,
    class: className,
  } = useProps(props, { class: "", height: 40, children: "" });
  const dragging = useSignal(false);
  let startY = 0;
  let startHeight = 0;

  const onPointerDown = (e: PointerEvent) => {
    dragging.set(true);
    startY = e.clientY;
    startHeight = height.get();
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    e.preventDefault();
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging.get()) return;
    const delta = startY - e.clientY; // 向上拖动时高度增加
    height.set(Math.max(40, startHeight + delta)); // 最小高度50px
  };

  const onPointerUp = () => {
    dragging.set(false);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  };

  return (
    <div
      class={twMerge("relative w-full flex-none border-t border-transparent", className.get())}
      style={{ height: toPx(height.get()) }}
    >
      <div class="size-full overflow-x-auto px-3">{children}</div>
      <div
        class="absolute top-0 left-0 z-10 h-1 w-full cursor-row-resize bg-transparent duration-200 hover:bg-blue-400"
        onPointerDown={onPointerDown}
      ></div>
    </div>
  );
}
