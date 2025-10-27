import { useProps, useSignal, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";
import { Left } from "./Left";
import { Right } from "./Right";
import { Top } from "./Top";
import { Bottom } from "./Bottom";
import { Main } from "./Main";

interface ILayoutProps {
  class?: ClassName;
  children: Children;
  direction?: "vertical" | "horizontal";
}
export function Layout(props: IProps<ILayoutProps>) {
  const {
    class: className,
    children,
    direction,
  } = useProps(props, { class: "", direction: "horizontal" });

  const baseClass = twMerge([
    "h-screen w-screen overflow-hidden max-h-screen max-w-screen flex items-stretch",
  ]);

  return (
    <div class={twMerge(baseClass, direction.get() == "vertical" && "flex-col", className.get())}>
      {children}
    </div>
  );
}

Layout.Main = Main;
Layout.Left = Left;
Layout.Right = Right;
Layout.Top = Top;
Layout.Bottom = Bottom;
