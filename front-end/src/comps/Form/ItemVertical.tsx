import { useProps, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";
import { Flex } from "@/comps/Flex";
import { Show } from "solid-js";
import { type IFormItemProps } from "./Item";

interface IFormItemVerticalProps extends IFormItemProps {}

/**
 * 垂直组件
 * @param props
 * @returns
 */
export function ItemVertical(props: IProps<IFormItemVerticalProps>) {
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
    showColon: false,
    labelClass: "",
    isRequired: false,
    error: "",
  });

  const baseClass = twMerge([
    "flex items-center flex-wrap justify-start flex-col gap-2",
    "relative pb-5 mb-1",
  ]);

  return (
    <Flex class={twMerge(baseClass, className.get())} onClick={onClick}>
      <div class={twMerge("w-full pl-1", labelClass.get())}>
        <Show when={isRequired.get()}>
          <span class="pr-0.5 text-red-500">*</span>
        </Show>
        {label.get()}
        <Show when={showColon.get()}>
          <span>：</span>
        </Show>
      </div>
      <div class="w-full flex-1">{children}</div>
      <div class="absolute bottom-0 left-0 pl-1 text-xs text-red-500">{error.get()}</div>
    </Flex>
  );
}
