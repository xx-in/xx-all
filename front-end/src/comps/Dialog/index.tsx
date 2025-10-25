import { useEffect, useProps, type Children, type ClassName, type IProps } from "@/utils";
import { Portal, Show } from "solid-js/web";
import { twMerge } from "tailwind-merge";
import { Flex } from "@comps/Flex";
import { Title } from "./Title";

interface IDialogProps {
  children: Children;
  class?: ClassName;
  onClick?: () => void;
  title?: string;
  visible: boolean;
  closeOnClickMask?: boolean;
}

export function Dialog(props: IProps<IDialogProps>) {
  const {
    children,
    class: className,
    onClick,
    title,
    visible,
    closeOnClickMask,
  } = useProps(props, {
    class: "",
    title: "",
    closeOnClickMask: true,
  });

  const baseClass = twMerge([
    "w-auto max-w-9/10 lg:max-w-3/4 overflow-hidden mt-10 max-h-8/9 flex justify-center rounded-lg flex-col p-0 bg-stone-500  shadow-lg border border-black/60",
  ]);
  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    onClick?.();
  }

  function handleClose() {
    visible.set(false);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == "Escape") {
      handleClose();
    }
  }

  let refMask: HTMLElement;

  /**
   * 弹窗打开时就自动聚焦
   * 聚焦是为了监听按键Esc关闭弹窗
   */
  useEffect(() => {
    if (visible.get()) {
      refMask.focus();
    }
  });

  function handleClickMask() {
    if (closeOnClickMask) {
      handleClose();
    }
  }

  return (
    <>
      <Show when={visible.get()}>
        <Portal>
          <section
            class="absolute top-0 left-0 z-10 flex h-screen w-screen justify-center bg-black/60 text-center outline-none"
            onClick={handleClickMask}
            tabIndex={0}
            ref={e => (refMask = e)}
            onkeydown={handleKeyDown}
          >
            <div class={twMerge(baseClass, className.get())} onClick={handleClick}>
              <Show when={title.get()}>
                <Title visible={visible}>{title}</Title>
              </Show>
              <Flex class="flex-1 overflow-auto">{children}</Flex>
            </div>
          </section>
        </Portal>
      </Show>
    </>
  );
}
