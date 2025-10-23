import { useProps, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";

export interface ISvgProps {
  children: Children;
  class?: ClassName;
  onClick?: () => void;
  tip?: string;
}

export function Svg(props: IProps<ISvgProps>) {
  const {
    children,
    class: className,
    onClick,
    tip,
  } = useProps(props, {
    class: "",
    tip: "",
  });

  const baseClass = twMerge(["flex items-center size-4"]);

  return (
    <svg class={twMerge(baseClass, className.get())} onClick={onClick}>
      <title>{tip.get()}</title>
      {children}
    </svg>
  );
}
