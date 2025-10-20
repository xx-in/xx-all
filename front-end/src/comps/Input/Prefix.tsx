import { useProps, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";
import { Flex } from "@/comps/Flex";
interface IPrefixProps {
  children: Children;
  class?: ClassName;
  onClick?: () => void;
}

export function Prefix(props: IProps<IPrefixProps>) {
  const {
    children,
    class: className,
    onClick,
  } = useProps(props, {
    class: "",
  });

  const baseClass = twMerge(["border-r-1 border-gray-300 px-2 overflow-hidden"]);

  return (
    <Flex class={twMerge(baseClass, className.get())} onClick={onClick}>
      {children}
    </Flex>
  );
}
