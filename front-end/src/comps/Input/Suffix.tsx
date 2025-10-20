import { useProps, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";
import { Flex } from "@/comps/Flex";

interface ISuffixProps {
  children: Children;
  class?: ClassName;
  onClick?: () => void;
}

export function Suffix(props: IProps<ISuffixProps>) {
  const {
    children,
    class: className,
    onClick,
  } = useProps(props, {
    class: "",
  });

  const baseClass = twMerge(["border-l-1 border-gray-300 px-2 outline-hidden"]);

  return (
    <Flex class={twMerge(baseClass, className.get())} onClick={onClick}>
      {children}
    </Flex>
  );
}
