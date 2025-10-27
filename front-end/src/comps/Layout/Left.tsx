import { useProps, useSignal, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";

function toPx(n: number) {
  return n + "px";
}

interface ILayoutLeftProps {
  width: number;
  children: Children;
  class?: ClassName;
}
export function Left(props: IProps<ILayoutLeftProps>) {
  const { width, children, class: className } = useProps(props, { class: "" });
  const dragging = useSignal(false);
  let startX = 0;
  let startWidth = 0;

  const onPointerDown = (e: PointerEvent) => {
    dragging.set(true);
    startX = e.clientX;
    startWidth = width.get();
    // 捕获全局事件
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    e.preventDefault();
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging.get()) return;
    const delta = e.clientX - startX;
    width.set(Math.max(50, startWidth + delta)); // 最小宽度50px
  };

  const onPointerUp = () => {
    dragging.set(false);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  };

  return (
    <div
      class={twMerge(
        "broder-r relative h-full flex-none border-r border-stone-200 break-all",
        className.get(),
      )}
      style={{ width: toPx(width.get()) }}
    >
      <div class="h-full overflow-y-auto pr-3">{children}</div>
      <div
        class="absolute top-0 right-0 z-10 h-full w-1 cursor-col-resize bg-transparent duration-200 hover:bg-blue-400"
        onPointerDown={onPointerDown}
      ></div>
    </div>
  );
}
