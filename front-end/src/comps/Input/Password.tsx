import { useProps, useSignal, type IProps } from "@/utils";
import { Show } from "solid-js";
import { twMerge } from "tailwind-merge";
import { Svg } from "@/comps/Svg";
import { Input, type IInputProps } from ".";

interface IPasswordProps extends Omit<IInputProps, "type"> {}

export function Password(props: IProps<IPasswordProps>) {
  const {
    class: className,
    baseClass,
    ...restProps
  } = useProps(props, {
    class: "",
    placeholder: "请输入",
    value: "",
    disabled: false,
    readonly: false,
    autocomplete: "new-password",
    maxLength: Infinity,
    minLength: 0,
    baseClass: twMerge([
      "w-full border border-gray-300 rounded-lg outline-none transition px-1",
      "inline-flex items-stretch",
      "has-[input:disabled]:bg-gray-100",
      "has-[input:focus]:ring-blue-500 has-[input:focus]:ring-1 has-[input:focus]:border-transparent",
      "has-[input:read-only:focus]:ring-0 has-[input:read-only]:border-gray-100",
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

  const type = useSignal("password");

  function toggle() {
    if (type.get() == "text") {
      type.set("password");
    } else {
      type.set("text");
    }
  }

  return (
    <div class={twMerge(baseClass.get(), className.get())}>
      <Input {...restProps} baseClass={inputClass} type={type} />
      <div class="flex items-center p-2" onClick={toggle}>
        <Show when={type.get() != "password"}>
          <Svg.EyeOpened class="size-4 cursor-pointer" />
        </Show>
        <Show when={type.get() == "password"}>
          <Svg.EyeClosed class="size-4 cursor-pointer" />
        </Show>
      </div>
    </div>
  );
}
