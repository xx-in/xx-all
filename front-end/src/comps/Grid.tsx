import { useProps, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";

interface IGridProps {
  children: Children;
  class?: ClassName;
  onClick?: () => void;
}

export function Grid(props: IProps<IGridProps>) {
  const {
    children,
    class: className,
    onClick,
  } = useProps(props, {
    class: "",
  });

  console.log("??flex", children);

  const baseClass = twMerge(["grid items-center"]);

  return (
    <div class={twMerge(baseClass, className.get())} onClick={onClick}>
      {children}
    </div>
  );
}
