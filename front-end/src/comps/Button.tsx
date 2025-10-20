import { useProps, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";

interface IButtonProps {
  children: Children;
  class?: ClassName;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button(props: IProps<IButtonProps>) {
  const {
    children,
    class: className,
    disabled,
    onClick,
  } = useProps(props, {
    class: Button.default,
    disabled: false,
  });

  const baseClass = twMerge([
    "cursor-pointer py-1 px-4 rounded-lg",
    "disabled:cursor-not-allowed",
    "transition border border-transparent",
    "inline-flex items-center justify-center",
  ]);
  return (
    <button class={twMerge(baseClass, className.get())} onClick={onClick} disabled={disabled.get()}>
      {children}
    </button>
  );
}

Button.default = twMerge([
  "text-gray-600 border-gray-300",
  "enabled:hover:bg-blue-100 enabled:hover:border-blue-200 hover:enabled:text-blue-500",
  "enabled:active:border-blue-400",
  "disabled:text-gray-300",
]);

Button.blue = twMerge([
  "text-white",
  "enabled:bg-blue-400  enabled:hover:bg-blue-500",
  "enabled:active:bg-blue-600",
  "disabled:bg-blue-300 text-gray-50 ",
]);

Button.sky = twMerge([
  "text-white",
  "enabled:bg-sky-400  enabled:hover:bg-sky-500",
  "enabled:active:bg-sky-600",
  "disabled:bg-sky-300 text-gray-50 ",
]);

Button.green = twMerge([
  "text-white",
  "enabled:bg-green-400  enabled:hover:bg-green-500",
  "enabled:active:bg-green-600",
  "disabled:bg-green-300 text-gray-50 ",
]);

Button.lime = twMerge([
  "text-white",
  "enabled:bg-lime-400  enabled:hover:bg-lime-500",
  "enabled:active:bg-lime-600",
  "disabled:bg-lime-300 text-gray-50 ",
]);

Button.gray = twMerge([
  "text-white",
  "enabled:bg-gray-400  enabled:hover:bg-gray-500",
  "enabled:active:bg-gray-600",
  "disabled:bg-gray-300 text-gray-50 ",
]);

Button.stone = twMerge([
  "text-white",
  "enabled:bg-stone-400  enabled:hover:bg-stone-500",
  "enabled:active:bg-stone-600",
  "disabled:bg-stone-300 text-gray-50 ",
]);

Button.orange = twMerge([
  "text-white",
  "enabled:bg-orange-400  enabled:hover:bg-orange-500",
  "enabled:active:bg-orange-600",
  "disabled:bg-orange-300 text-gray-50 ",
]);

Button.purple = twMerge([
  "text-white",
  "enabled:bg-purple-400  enabled:hover:bg-purple-500",
  "enabled:active:bg-purple-600",
  "disabled:bg-purple-300 text-gray-50 ",
]);

Button.yellow = twMerge([
  "text-white",
  "enabled:bg-yellow-400  enabled:hover:bg-yellow-500",
  "enabled:active:bg-yellow-600",
  "disabled:bg-yellow-300 text-gray-50 ",
]);

Button.red = twMerge([
  "text-white",
  "enabled:bg-red-400  enabled:hover:bg-red-500",
  "enabled:active:bg-red-600",
  "disabled:bg-red-300 text-gray-50 ",
]);

Button.skyPlain = twMerge([
  "enabled:text-sky-500 enabled:bg-sky-100 enabled:border-sky-200",
  "enabled:hover:bg-sky-500 enabled:hover:text-white",
  "enabled:active:bg-sky-600",
  "disabled:text-sky-300 disabled:border-sky-200 disabled:bg-sky-100",
]);

Button.bluePlain = twMerge([
  "enabled:text-blue-500 enabled:bg-blue-100 enabled:border-blue-200",
  "enabled:hover:bg-blue-500 enabled:hover:text-white",
  "enabled:active:bg-blue-600",
  "disabled:text-blue-300 disabled:border-blue-200 disabled:bg-blue-100",
]);

Button.greenPlain = twMerge([
  "enabled:text-green-500 enabled:bg-green-100 enabled:border-green-200",
  "enabled:hover:bg-green-500 enabled:hover:text-white",
  "enabled:active:bg-green-600",
  "disabled:text-green-300 disabled:border-green-200 disabled:bg-green-100",
]);

Button.redPlain = twMerge([
  "enabled:text-red-500 enabled:bg-red-100 enabled:border-red-200",
  "enabled:hover:bg-red-500 enabled:hover:text-white",
  "enabled:active:bg-red-600",
  "disabled:text-red-300 disabled:border-red-200 disabled:bg-red-100",
]);

Button.limePlain = twMerge([
  "enabled:text-lime-500 enabled:bg-lime-100 enabled:border-lime-200",
  "enabled:hover:bg-lime-500 enabled:hover:text-white",
  "enabled:active:bg-lime-600",
  "disabled:text-lime-300 disabled:border-lime-200 disabled:bg-lime-100",
]);

Button.grayPlain = twMerge([
  "enabled:text-gray-500 enabled:bg-gray-100 enabled:border-gray-200",
  "enabled:hover:bg-gray-500 enabled:hover:text-white",
  "enabled:active:bg-gray-600",
  "disabled:text-gray-300 disabled:border-gray-200 disabled:bg-gray-100",
]);

Button.stonePlain = twMerge([
  "enabled:text-stone-500 enabled:bg-stone-100 enabled:border-stone-200",
  "enabled:hover:bg-stone-500 enabled:hover:text-white",
  "enabled:active:bg-stone-600",
  "disabled:text-stone-300 disabled:border-stone-200 disabled:bg-stone-100",
]);

Button.orangePlain = twMerge([
  "enabled:text-orange-500 enabled:bg-orange-100 enabled:border-orange-200",
  "enabled:hover:bg-orange-500 enabled:hover:text-white",
  "enabled:active:bg-orange-600",
  "disabled:text-orange-300 disabled:border-orange-200 disabled:bg-orange-100",
]);

Button.yellowPlain = twMerge([
  "enabled:text-yellow-500 enabled:bg-yellow-100 enabled:border-yellow-200",
  "enabled:hover:bg-yellow-500 enabled:hover:text-white",
  "enabled:active:bg-yellow-600",
  "disabled:text-yellow-300 disabled:border-yellow-200 disabled:bg-yellow-100",
]);

Button.purplePlain = twMerge([
  "enabled:text-purple-500 enabled:bg-purple-100 enabled:border-purple-200",
  "enabled:hover:bg-purple-500 enabled:hover:text-white",
  "enabled:active:bg-purple-600",
  "disabled:text-purple-300 disabled:border-purple-200 disabled:bg-purple-100",
]);

Button.defaultText = twMerge(["enabled:hover:bg-gray-100", "disabled:text-gray-300"]);

Button.blueText = twMerge([
  "enabled:hover:bg-gray-100 enabled:text-blue-500",
  "enabled:active:bg-gray-200",
  "disabled:text-blue-300",
]);

Button.redText = twMerge([
  "enabled:hover:bg-gray-100 enabled:text-red-500",
  "enabled:active:bg-gray-200",
  "disabled:text-red-300",
]);

Button.orangeText = twMerge([
  "enabled:hover:bg-gray-100 enabled:text-orange-500",
  "enabled:active:bg-gray-200",
  "disabled:text-orange-300",
]);

Button.yellowText = twMerge([
  "enabled:hover:bg-gray-100 enabled:text-yellow-500",
  "enabled:active:bg-gray-200",
  "disabled:text-yellow-300",
]);

Button.greenText = twMerge([
  "enabled:hover:bg-gray-100 enabled:text-green-500",
  "enabled:active:bg-gray-200",
  "disabled:text-green-300",
]);
Button.prupleText = twMerge([
  "enabled:hover:bg-gray-100 enabled:text-pruple-500",
  "enabled:active:bg-gray-200",
  "disabled:text-pruple-300",
]);
Button.limeText = twMerge([
  "enabled:hover:bg-gray-100 enabled:text-lime-500",
  "enabled:active:bg-gray-200",
  "disabled:text-lime-300",
]);
Button.skyText = twMerge([
  "enabled:hover:bg-gray-100 enabled:text-sky-500",
  "enabled:active:bg-gray-200",
  "disabled:text-sky-300",
]);
Button.stoneText = twMerge([
  "enabled:hover:bg-gray-100 enabled:text-stone-500",
  "enabled:active:bg-gray-200",
  "disabled:text-stone-300",
]);

Button.grayText = twMerge([
  "enabled:hover:bg-gray-100 enabled:text-gray-500",
  "enabled:active:bg-gray-200",
  "disabled:text-stone-300",
]);

Button.purpleText = twMerge([
  "enabled:hover:bg-gray-100 enabled:text-purple-500",
  "enabled:active:bg-gray-200",
  "disabled:text-purple-300",
]);
