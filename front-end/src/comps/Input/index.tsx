import { useProps, type ClassName, type IProps } from "@/utils";
import type { JSX } from "solid-js";
import { twMerge } from "tailwind-merge";
import { Password } from "./Password";
import { Clearable } from "./Clearable";
import { Group } from "./Group";
import { Suffix } from "./Suffix";
import { Prefix } from "./Prefix";
import { InputNumber } from "./InputNumber";

export interface IInputProps {
  class?: ClassName;
  onClick?: (e: MouseEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onInput?: (e: InputEvent) => void;
  onValidate?: () => void;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
  type?: JSX.InputHTMLAttributes<HTMLInputElement>["type"];
  autocomplete?: "new-password" | "on";
  maxLength?: number;
  minLength?: number;
  baseClass?: ClassName;
  min?: number;
  max?: number;
}

export function Input(props: IProps<IInputProps>) {
  const {
    class: className,
    onClick,
    onInput,
    onBlur,
    onValidate,
    placeholder,
    value,
    disabled,
    readonly,
    type,
    autocomplete,
    maxLength,
    minLength,
    baseClass,
    min,
    max,
  } = useProps(props, {
    class: "",
    placeholder: "请输入",
    value: "",
    disabled: false,
    readonly: false,
    type: "text",
    autocomplete: "new-password",
    maxLength: Infinity,
    minLength: 0,
    min: -Infinity,
    max: Infinity,
    baseClass: twMerge([
      "w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition",
      "disabled:bg-gray-100 disabled:cursor-not-allowed",
      "read-only:focus:ring-0 read-only:border-gray-100 read-only:cursor-default read-only:bg-gray-100",
    ]),
  });

  const handleInput: JSX.InputEventHandlerUnion<HTMLInputElement, InputEvent> = e => {
    const newValue = e.target.value;
    value.set(newValue);
    onInput?.(e);
    onValidate?.();
  };

  const handleBlur: JSX.FocusEventHandlerUnion<HTMLInputElement, FocusEvent> = e => {
    onBlur?.(e);
    onValidate?.();
  };

  return (
    <input
      class={twMerge(baseClass.get(), className.get())}
      onClick={onClick}
      placeholder={placeholder.get()}
      value={value.get()}
      onInput={handleInput}
      readonly={readonly.get()}
      disabled={disabled.get()}
      type={type.get()}
      autocomplete={autocomplete.get()}
      maxLength={maxLength.get()}
      minLength={minLength.get()}
      onBlur={handleBlur}
      min={min.get()}
      max={max.get()}
    />
  );
}

Input.Password = Password;
Input.Clearable = Clearable;
Input.Group = Group;
Input.Suffix = Suffix;
Input.Prefix = Prefix;
Input.Number = InputNumber;
