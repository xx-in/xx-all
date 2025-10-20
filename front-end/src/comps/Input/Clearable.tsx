import { useProps, type IProps } from "@/utils";
import { Show } from "solid-js";
import { twMerge } from "tailwind-merge";
import { Svg } from "@/comps/Svg";
import { Input, type IInputProps } from ".";

interface IClearableProps extends IInputProps {}

export function Clearable(props: IProps<IClearableProps>) {
  const {
    class: className,
    baseClass,
    value,
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
    type: "text",
    baseClass: twMerge([
      "w-full border border-gray-300 rounded-lg outline-none transition px-1",
      "inline-flex items-stretch",
      "has-[input:disabled]:bg-gray-100",
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

  function handleClear() {
    value.set("");
  }

  return (
    <div class={twMerge(baseClass.get(), className.get())}>
      <Input {...restProps} baseClass={inputClass} value={value} />
      <div class="flex items-center p-2" onClick={handleClear}>
        <Show when={value.get()}>
          <Svg.Clear class="size-4 cursor-pointer hover:text-red-500" />
        </Show>
      </div>
    </div>
  );
}
