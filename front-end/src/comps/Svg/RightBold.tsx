import type { IProps } from "@/utils";
import { Svg, type ISvgProps } from ".";

export function SvgRightBold(props: IProps<Omit<ISvgProps, "children">>) {
  return (
    <Svg {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <path
          fill="currentColor"
          d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0"
          stroke-width="25.5"
          stroke="currentColor"
        />
      </svg>
    </Svg>
  );
}
