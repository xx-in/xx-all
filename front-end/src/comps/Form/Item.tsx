import {
  randomId,
  throttle,
  useContainerWidth,
  useDestroy,
  useEffect,
  useMount,
  useProps,
  useSignal,
  type Children,
  type ClassName,
  type IProps,
  type ISignal,
} from "@/utils";
import { twMerge } from "tailwind-merge";
import { Flex } from "@comps/Flex";
import { Match, onMount, Show, Switch } from "solid-js";
import { ItemHorizontal } from "./ItemHorizontal";
import { ItemVertical } from "./ItemVertical";

export interface IFormItemProps {
  children: Children;
  class?: ClassName;
  onClick?: () => void;
  label: string;
  labelClass?: ClassName;
  showColon?: boolean;
  isRequired?: boolean;
  error?: string;
  direction?: "vertical" | "horizontal";
}

export function Item(props: IProps<IFormItemProps>) {
  const { direction, ...rest } = useProps(props, {
    class: "",
    showColon: true,
    labelClass: "",
    isRequired: false,
    error: "",
    direction: "horizontal",
  });

  const id = randomId();
  const width = useContainerWidth(id);

  return (
    <div class="@container" id={id}>
      <Switch fallback={<ItemVertical {...rest} />}>
        <Match when={direction.get() == "horizontal" && width.get() > 640}>
          <ItemHorizontal {...rest} />
        </Match>
      </Switch>
    </div>
  );
}
