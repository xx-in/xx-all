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

// ================== 分批添加逻辑 ==================
interface ToastTask {
  message: string;
  type: ToastType;
  duration?: number;
}

let addQueue: ToastTask[] = [];
let addProcessing = false;
let addLastTrigger = 0;

export function addToast(message: string, type: ToastType = "info", duration = 3000) {
  const now = Date.now();
  addQueue.push({ message, type, duration });

  if (now - addLastTrigger > 501) {
    processAddQueue();
  } else if (!addProcessing) {
    setTimeout(() => processAddQueue(), 501 - (now - addLastTrigger));
  }

  addLastTrigger = now;
}

function processAddQueue() {
  if (addProcessing || addQueue.length === 0) return;
  addProcessing = true;

  const next = () => {
    const task = addQueue.shift();
    if (!task) {
      addProcessing = false;
      return;
    }
    showToast(task);

    if (addQueue.length > 0) {
      setTimeout(next, 499);
    } else {
      addProcessing = false;
    }
  };

  next();
}

function showToast({ message, type, duration }: ToastTask) {
  const id = randomId();
  const newItem = { id, message, type, duration };
  toasts.update(cur => {
    cur.push(newItem);
  });
}

// ================== 分批移除逻辑 ==================
let removeQueue: string[] = [];
let removeProcessing = false;
let removeLastTrigger = 0;

export function removeToast(id: string) {
  const now = Date.now();
  removeQueue.push(id);

  if (now - removeLastTrigger > 501) {
    processRemoveQueue();
  } else if (!removeProcessing) {
    setTimeout(() => processRemoveQueue(), 501 - (now - removeLastTrigger));
  }

  removeLastTrigger = now;
}

function processRemoveQueue() {
  if (removeProcessing || removeQueue.length === 0) return;
  removeProcessing = true;

  const next = () => {
    const id = removeQueue.shift();
    if (!id) {
      removeProcessing = false;
      return;
    }

    toasts.set(cur => cur.filter(t => t.id !== id));

    if (removeQueue.length > 0) {
      setTimeout(next, 499);
    } else {
      removeProcessing = false;
    }
  };

  next();
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
    setTimeout(() => props.onClose(), 300);
  };

  const timer = setTimeout(handleClose, props.toast.duration || 5000);
  useDestroy(() => clearTimeout(timer));

  function toTypeColor() {
    const colors = {
      success: "bg-green-50 text-green-500",
      fail: "bg-red-50 text-red-500",
      info: "bg-stone-50 text-stone-500",
      warning: "bg-orange-50 text-orange-500",
    };
    return colors[props.toast.type];
  }

  return (
    <div
      class={twMerge([
        "inline-flex items-center rounded-md p-2 pl-6 shadow-md",
        "justify-start gap-3 border border-gray-100",
        "transform transition-all duration-500 ease-in-out",
        "min-w-96",
        toTypeColor(),
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
  success: () => <Svg.Success class="size-5 text-green-500" />,
  fail: () => <Svg.Fail class="size-5 text-red-500" />,
  info: () => <Svg.Info class="size-5 text-gray-500" />,
  warning: () => <Svg.Warning class="size-5 text-orange-500" />,
};

createToast();
