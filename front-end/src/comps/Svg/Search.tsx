import type { IProps } from "@/utils";
import { Svg, type ISvgProps } from ".";

export function Search(props: IProps<Omit<ISvgProps, "children">>) {
  return (
    <Svg {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <path
          fill="currentColor"
          d="m795.904 750.72l124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704a352 352 0 0 0 0 704"
          stroke-width="25.5"
          stroke="currentColor"
        />
      </svg>
    </Svg>
  );
}
