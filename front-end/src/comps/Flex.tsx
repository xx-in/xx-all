import { useProps, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";

interface IFlexProps {
  children: Children;
  class?: ClassName;
  onClick?: () => void;
  title?: string;
}

export function Flex(props: IProps<IFlexProps>) {
  const {
    children,
    class: className,
    onClick,
    title,
  } = useProps(props, {
    class: "",
    title: "",
  });

  // console.log("??flex", children);

  const baseClass = twMerge(["flex items-center"]);

  return (
    <div class={twMerge(baseClass, className.get())} onClick={onClick} title={title.get()}>
      {children}
    </div>
  );
}

function Fixed() {}
