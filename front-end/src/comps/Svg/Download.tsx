import type { IProps } from "@/utils";
import { Svg, type ISvgProps } from ".";

export function SvgDownload(props: IProps<Omit<ISvgProps, "children">>) {
  return (
    <Svg {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <path
          fill="currentColor"
          d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64m384-253.696l236.288-236.352l45.248 45.248L508.8 704L192 387.2l45.248-45.248L480 584.704V128h64z"
          stroke-width="25.5"
          stroke="currentColor"
        />
      </svg>
    </Svg>
  );
}
