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
import { Document } from "./Document";
import { Delete } from "./Delete";
import { Download } from "./Download";
import { FullScreen } from "./FullScreen";
import { Close } from "./Close";

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

Svg.Calendar = Calendar;
Svg.Search = Search;
Svg.Success = Success;
Svg.Fail = Fail;
Svg.Info = Info;
Svg.Warning = Warning;
Svg.EyeClosed = EyeClosed;
Svg.EyeOpened = EyeOpened;
Svg.Clear = Clear;
Svg.Document = Document;
Svg.Delete = Delete;
Svg.Download = Download;
Svg.FullScreen = FullScreen;
Svg.Close = Close;
