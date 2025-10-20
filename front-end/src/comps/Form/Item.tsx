import { useProps, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";
import { Flex } from "@/comps/Flex";
import { Show } from "solid-js";

export interface IFormItemProps {
  children: Children;
  class?: ClassName;
  onClick?: () => void;
  label: string;
  labelClass?: ClassName;
  showColon?: boolean;
  isRequired?: boolean;
  error?: string;
}

/**
 * 水平组件
 * @param props
 * @returns
 */
export function Item(props: IProps<IFormItemProps>) {
  const {
    children,
    class: className,
    onClick,
    label,
    labelClass,
    showColon,
    isRequired,
    error,
  } = useProps(props, {
    class: "",
    showColon: true,
    labelClass: "",
    isRequired: false,
    error: "",
  });

  const baseClass = twMerge([
    "flex items-center flex-wrap justify-start",
    "mb-1 gap-1 pb-5 relative",
  ]);

  return (
    <Flex class={twMerge(baseClass, className.get())} onClick={onClick}>
      <div class={twMerge("w-20", labelClass.get())}>
        <Show when={isRequired.get()}>
          <span class="pr-0.5 text-red-500">*</span>
        </Show>
        {label.get()}
        <Show when={showColon.get()}>
          <span>：</span>
        </Show>
      </div>
      <div class="w-full flex-1">{children}</div>
      <div class="absolute bottom-0 left-0 flex gap-2 pl-1 text-xs text-red-500">
        <div class={twMerge("h-1 w-20", labelClass.get())}></div>
        {error.get()}
      </div>
    </Flex>
  );
}
