import { useProps, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";
import { Search } from "./Search";
import { Success } from "./Success";
import { Info } from "./Info";
import { Fail } from "./Fail";
import { Warning } from "./Warning";
import { EyeClosed } from "./EyeClosed";
import { EyeOpened } from "./EyeOpened";

import { Clear } from "./Clear";
import { Calendar } from "./Calendar";

export interface ISvgProps {
  children: Children;
  class?: ClassName;
  onClick?: () => void;
}

export function Svg(props: IProps<ISvgProps>) {
  const {
    children,
    class: className,
    onClick,
  } = useProps(props, {
    class: "",
  });

  const baseClass = twMerge(["flex items-center size-4"]);

  return (
    <svg class={twMerge(baseClass, className.get())} onClick={onClick}>
      {children}
    </svg>
  );
}

Svg.Calendar = Calendar;

Svg.Search = Search;
Svg.Success = Success;
Svg.Fail = Fail;
Svg.Info = Info;
Svg.Warning = Warning;
Svg.EyeClosed = EyeClosed;
Svg.EyeOpened = EyeOpened;
// Svg.Calendar = Calendar;
Svg.Clear = Clear;
