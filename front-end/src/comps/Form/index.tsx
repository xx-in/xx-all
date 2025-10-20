import { useProps, useSignal, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";
import { Item } from "./Item";
import { ItemVertical } from "./ItemVertical";

interface IFormProps {
  children: Children;
  class?: ClassName;
  onClick?: () => void;
}

export function Form(props: IProps<IFormProps>) {
  const {
    children,
    class: className,
    onClick,
  } = useProps(props, {
    class: "",
  });

  const baseClass = twMerge([""]);

  return (
    <form
      class={twMerge(baseClass, className.get())}
      onClick={onClick}
      onsubmit={event => event.preventDefault()}
    >
      {children}
    </form>
  );
}

Form.Item = Item;
Form.ItemVertical = ItemVertical;

interface IRule<T> {
  message: string;
  pattern: ((value: T) => boolean) | RegExp;
}

type IRules<T> = Array<IRule<T>>;

export function useFormItem<T>(initValue: T, rules: IRules<T>) {
  const value = useSignal<T>(initValue);
  const error = useSignal("");
  function onValidate() {
    const failedRule = rules.find(rule => {
      const { pattern } = rule;
      if (pattern instanceof RegExp) {
        return !pattern.test(value.get() as string);
      } else {
        return !pattern(value.get());
      }
    });
    if (failedRule) {
      error.set(failedRule.message);
    } else {
      error.set("");
    }
  }
  return {
    value,
    error,
    onValidate,
    /**
     * 清除错误
     */
    clearError() {
      error.set("");
    },
  };
}
