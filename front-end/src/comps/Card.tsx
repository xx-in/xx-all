import { useProps, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";

interface ICardProps {
  children: Children;
  class?: ClassName;
  onClick?: () => void;
}

export function Card(props: IProps<ICardProps>) {
  const {
    children,
    class: className,
    onClick,
  } = useProps(props, {
    class: "",
  });

  const baseClass = twMerge(["border-gray-200 border", "shadow-lg", "p-4 pb-6 mb-4", "rounded-md"]);

  return (
    <div class={twMerge(baseClass, className.get())} onClick={onClick}>
      {children}
    </div>
  );
}

interface ICardTitleProps {
  children: Children;
  class?: ClassName;
  onClick?: () => void;
}
/**
 * 卡片标题
 * @param props
 * @returns
 */
export function Title(props: IProps<ICardTitleProps>) {
  const {
    children,
    class: className,
    onClick,
  } = useProps(props, {
    class: "",
  });

  const baseClass = twMerge(["text-xl font-bold mb-4 pb-2 border-b border-b-gray-200"]);

  return (
    <div class={twMerge(baseClass, className.get())} onClick={onClick}>
      {children}
    </div>
  );
}

Card.Title = Title;
