import { useProps, useSignal, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";
import { Left } from "./Left";

interface ILayoutProps {
  class?: ClassName;
  children: Children;
}
export function Layout(props: IProps<ILayoutProps>) {
  const { class: className, children } = useProps(props, { class: "" });

  const baseClass = twMerge(["h-screen w-screen max-h-screen max-w-screen flex items-stretch"]);

  return <div class={twMerge(baseClass, className.get())}>{children}</div>;
}
interface ILayoutMainProps {
  children: Children;
}
function Main(props: IProps<ILayoutMainProps>) {
  const { children } = useProps(props, {});
  return <div class="max-h-screen flex-1 overflow-auto">{children}</div>;
}

Layout.Left = Left;
Layout.Main = Main;

function Right() {}
