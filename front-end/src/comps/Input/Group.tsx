import { useProps, type Children, type IProps } from "@/utils";
import { Show } from "solid-js";
import { twMerge } from "tailwind-merge";

import { Input, type IInputProps } from ".";

interface IGroupProps extends IInputProps {
  prefixChildren?: Children;
  suffixChildren?: Children;
}

export function Group(props: IProps<IGroupProps>) {
  const {
    class: className,
    prefixChildren,
    suffixChildren,
    baseClass,
    ...restProps
  } = useProps(props, {
    class: "",
    placeholder: "请输入",
    value: "",
    disabled: false,
    readonly: false,
    type: "text",
    prefixChildren: "",
    suffixChildren: "",
    autocomplete: "new-password",
    maxLength: Infinity,
    minLength: 0,
    baseClass: twMerge([
      "w-full border border-gray-300 rounded-lg outline-none transition",
      "inline-flex items-stretch overflow-hidden",
      "has-[input:disabled]:bg-gray-100 has-[input:read-only]:bg-gray-50",
      "has-[input:focus]:ring-blue-500 has-[input:focus]:ring-1 has-[input:focus]border-transparent",
      "has-[input:read-only:focus]:ring-0 has-[input:read-only:focus]:border-gray-300",
    ]),
    min: -Infinity,
    max: Infinity,
  });

  const inputClass = twMerge([
    "border-none outline-none ring-0",
    "flex-1 p-2",
    "disabled:cursor-not-allowed",
    "read-only:cursor-default",
  ]);

  return (
    <div class={twMerge(baseClass.get(), className.get())}>
      <Show when={prefixChildren}>{prefixChildren}</Show>
      <Input {...restProps} baseClass={inputClass}></Input>
      <Show when={suffixChildren}>{suffixChildren}</Show>
    </div>
  );
}
