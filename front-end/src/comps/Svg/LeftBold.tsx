import type { IProps } from "@/utils";
import { Svg, type ISvgProps } from ".";

export function SvgLeftBold(props: IProps<Omit<ISvgProps, "children">>) {
  return (
    <Svg {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <path
          fill="currentColor"
          d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0"
          stroke-width="25.5"
          stroke="currentColor"
        />
      </svg>
    </Svg>
  );
}
