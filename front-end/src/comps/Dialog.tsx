import { useProps, type Children, type ClassName, type IProps } from "@/utils";
import type { JSX } from "solid-js";
import { Portal, Show } from "solid-js/web";
import { twMerge } from "tailwind-merge";
import { Svg } from "./Svg";
import { Flex } from "./Flex";

interface IDialogProps {
  children: Children;
  class?: ClassName;
  onClick?: () => void;
  title?: string;
  visible: boolean;
  showTitle?: boolean;
}

export function Dialog(props: IProps<IDialogProps>) {
  const {
    children,
    class: className,
    onClick,
    title,
    visible,
    showTitle,
  } = useProps(props, {
    class: "",
    title: "",
    showTitle: true,
  });

  const baseClass = twMerge([
    "w-1/2 bg-white overflow-hidden mt-10 max-h-8/9 flex justify-center rounded-xl flex-col",
  ]);
  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    onClick?.();
  }

  function handleClose() {
    visible.set(false);
  }

  return (
    <Show when={visible.get()}>
      <Portal>
        <section
          class="absolute top-0 left-0 z-10 flex h-screen w-screen justify-center bg-black/60 text-center"
          onClick={handleClose}
        >
          <div class={twMerge(baseClass, className.get())} onClick={handleClick}>
            <Show when={title.get()}>
              <Title visible={visible}>{title.get()}</Title>
            </Show>
            <Flex class="flex-1 overflow-auto">{children}</Flex>
          </div>
        </section>
      </Portal>
    </Show>
  );
}

interface IDialogTitleProps {
  children: string;
  visible: boolean;
}
function Title(props: IProps<IDialogTitleProps>) {
  const { children, visible } = useProps(props, {});

  function handleClose() {
    visible.set(false);
  }
  return (
    <div class="flex h-10 shrink-0 grow-0 items-center justify-between border-b border-b-stone-200 px-2 pt-1">
      <div class="flex-1">{children}</div>
      <Svg.Clear class="size-6 cursor-pointer text-gray-500" onClick={handleClose}></Svg.Clear>
    </div>
  );
}
