import { useEffect, useMount, useProps, useSignal, type Children, type IProps } from "@/utils";
import { Show } from "solid-js";
import { twMerge } from "tailwind-merge";
import { Input, type IInputProps } from ".";
import Decimal from "decimal.js";

interface IInputNumberProps extends Omit<IInputProps, "type" | "autocomplete"> {
  controls?: boolean;
  step?: number;
  min?: number;
  max?: number;
  precision?: number;
}

export function InputNumber(props: IProps<IInputNumberProps>) {
  const {
    class: className,
    baseClass,
    controls,
    step,
    value,
    min,
    max,
    precision,
    onBlur,
    onValidate,
    disabled,
    readonly,
    ...restProps
  } = useProps(props, {
    class: "",
    placeholder: "请输入",
    value: "0",
    disabled: false,
    readonly: false,
    controls: true,
    maxLength: Infinity,
    minLength: 0,
    precision: 0,
    baseClass: twMerge([
      "w-full border border-gray-300 rounded-lg outline-none transition",
      "inline-flex items-stretch overflow-hidden",
      "has-[input:disabled]:bg-gray-100 has-[input:disabled]:border-gray-100",
      "has-[input:read-only]:bg-gray-100 has-[input:read-only]:border-gray-100",
      "has-[input:focus]:ring-blue-500 has-[input:focus]:ring-1 has-[input:focus]border-transparent",
      "has-[input:read-only:focus]:ring-0",
    ]),
    min: -Infinity,
    max: Infinity,
    step: 0,
  });

  function getStep(precision: number) {
    return Number((1 / Math.pow(10, precision)).toFixed(precision));
  }

  // 如果步长未指定时，根据精度设置步长
  if (!step.get()) {
    step.set(getStep(precision.get()));
  }

  const inputClass = twMerge([
    "border-none outline-none ring-0",
    "flex-1 p-2",
    "disabled:cursor-not-allowed",
    "read-only:cursor-default",
    "text-center",
  ]);

  const type = useSignal("number");

  const controlsClass = twMerge([
    "inline-flex items-center bg-gray-100 px-4 hover:text-blue-500",
    "cursor-pointer text-xl select-none  border-gray-200",
  ]);

  /**
   * 根据步长自增
   */
  function handleAdd() {
    const decimalValue = new Decimal(value.get());
    const decimalStep = new Decimal(step.get());
    updateValue(decimalValue.plus(decimalStep).toFixed(precision.get()));
    onValidate?.();
  }

  /**
   * 确保值在精度和最小最大值范围内
   * @param newValue
   */
  function updateValue(newValue: string) {
    if (disabled.get() || readonly.get()) {
      return;
    }
    const newFixedValue = Number(newValue).toFixed(precision.get());
    const newValueNumber = parseFloat(newFixedValue);
    if (newValueNumber < min.get()) {
      value.set(min.get().toFixed(precision.get()));
    } else if (newValueNumber > max.get()) {
      value.set(max.get().toFixed(precision.get()));
    } else {
      value.set(newFixedValue);
    }
  }

  /**
   * 根据步长自减
   */
  function handleSub() {
    const decimalValue = new Decimal(value.get());
    const decimalStep = new Decimal(step.get());
    updateValue(decimalValue.minus(decimalStep).toFixed(precision.get()));
    onValidate?.();
  }

  /**
   * 失焦时自动计算精度
   * @param e
   */
  function handleBlur(e: FocusEvent) {
    updateValue(value.get());
    onBlur?.(e);
  }

  return (
    <div class={twMerge(baseClass.get(), className.get())}>
      <Show when={controls.get() && !disabled.get() && !readonly.get()}>
        <div class={twMerge(controlsClass, "border-r")} onClick={handleSub}>
          -
        </div>
      </Show>
      <Input
        {...restProps}
        baseClass={inputClass}
        type={type}
        value={value}
        min={min}
        max={max}
        onBlur={handleBlur}
        disabled={disabled}
        readonly={readonly}
        onValidate={onValidate}
      ></Input>
      <Show when={controls.get() && !disabled.get() && !readonly.get()}>
        <div class={twMerge(controlsClass, "border-l")} onClick={handleAdd}>
          +
        </div>
      </Show>
    </div>
  );
}
