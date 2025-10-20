import { appendComponentToBody, randomId, useDestroy, useSignal } from "@/utils";
import { For } from "solid-js";
import { Svg } from "./Svg";
import { twMerge } from "tailwind-merge";

export type ToastType = "success" | "fail" | "info" | "warning";

export type ToastItem = {
  id: string;
  message: string;
  class?: string;
  duration?: number;
  type: ToastType;
};

const toasts = useSignal<ToastItem[]>([]);

// 添加提示
export function addToast(message: string, type: ToastType = "info", duration = 3000) {
  const id = randomId();
  toasts.update(cur => {
    cur.push({ id, message, type, duration });
  });
}

// 移除提示
export function removeToast(id: string) {
  toasts.set(cur => cur.filter(t => t.id !== id));
}

export function Toast() {
  return (
    <div class="fixed top-5 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center gap-4">
      <For each={toasts.get()}>
        {toast => <ToastItem toast={toast} onClose={() => removeToast(toast.id)} />}
      </For>
    </div>
  );
}

export function ToastItem(props: { toast: ToastItem; onClose: () => void }) {
  const closing = useSignal(false);

  const handleClose = () => {
    closing.set(true);
    setTimeout(() => props.onClose(), 300); // 与动画时间匹配，需要比动画时间偏短，因为函数有延迟
  };

  // 自动关闭
  const timer = setTimeout(handleClose, props.toast.duration || 3000);
  useDestroy(() => clearTimeout(timer));

  return (
    <div
      class={twMerge([
        "inline-flex items-center rounded-lg bg-white px-4 py-2 shadow-md",
        "justify-center border border-gray-100 text-stone-500",
        "transform transition-all duration-300 ease-in-out", // 只负责出现
        closing.get()
          ? "animate-fade-out -translate-y-2 opacity-0"
          : "animate-fade-in translate-y-0 opacity-100",
        props.toast.class,
      ])}
    >
      {Icons[props.toast.type]()}
      <span>{props.toast.message}</span>
    </div>
  );
}

export function createToast() {
  appendComponentToBody(Toast);
}

const Icons = {
  success: () => <Svg.Success class="mr-2 size-5 text-green-500" />,
  fail: () => <Svg.Fail class="mr-2 size-5 text-red-500" />,
  info: () => <Svg.Info class="mr-2 size-5 text-gray-500" />,
  warning: () => <Svg.Warning class="mr-2 size-5 text-orange-500" />,
};

createToast();
