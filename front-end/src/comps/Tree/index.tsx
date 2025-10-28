import { useProps, type Children, type IProps, type ISignal } from "@/utils";
import { For, Show, type Accessor } from "solid-js";

interface ITreeProps<T> {
  data: T[];
  children: (item: T, index: Accessor<number>, data: ISignal<T[]>) => Children;
}

export function Tree<T>(props: IProps<ITreeProps<T>>) {
  const { data, children } = useProps(props, {});

  return (
    <Show when={data && data.get()}>
      <For each={data.get()}>
        {(item, index) => {
          return (
            <>
              {children(item, index, data)}
              {/* @ts-ignore */}
              <Tree data={item.get().children} children={children} />
            </>
          );
        }}
      </For>
    </Show>
  );
}
