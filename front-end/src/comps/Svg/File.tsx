import type { IProps } from "@/utils";
import { Svg, type ISvgProps } from ".";

export function SvgFile(props: IProps<Omit<ISvgProps, "children">>) {
  return (
    <Svg {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g fill="none">
          <path d="M0 0h24v24H0z" />
          <path
            fill="#42a5f5"
            d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"
            stroke-width="0.5"
            stroke="#42a5f5"
          />
        </g>
      </svg>
    </Svg>
  );
}
