import { type Children, type ClassName, type IProps, useProps } from "@/utils";
import { twMerge } from "tailwind-merge";

interface ILayoutMainProps {
  children?: Children;
  class?: ClassName;
}
export function Main(props: IProps<ILayoutMainProps>) {
  const { children, class: className } = useProps(props, { children: "", class: "" });
  return (
    <div class={twMerge("max-h-screen flex-1 overflow-auto", className.get())}>{children}</div>
  );
}
