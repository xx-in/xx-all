import {
  useProps,
  useSignal,
  type ClassName,
  type Component,
  type IProps,
  type ISignal,
} from "@/utils";
import { For, Show, type Accessor } from "solid-js";
import { twMerge } from "tailwind-merge";

export interface IListItemProps<T> {
  item: T;
  index: Accessor<number>;
  parent: ISignal<Array<T>>;
}

interface IListProps<T> {
  class?: ISignal<ClassName>;
  onClick?: () => void;
  ItemComp: Component<IListItemProps<T>>;
  data: ISignal<Array<any>>;
}

export interface IListItem {
  children?: ISignal<Array<IListItem>>;
}


export type IList = Array<IListItem>


export function List<T extends IListItem>(props: IListProps<T>) {
  const { class: className = useSignal(""), onClick, ItemComp, data } = props;

  const baseClass = twMerge([]);

  return (
    <div class={twMerge(baseClass, className.get())} onClick={onClick}>
      <Show when={data && data.get()}>
        <For each={data.get()}>
          {(item, index) => {
            return (
              <>
                <ItemComp item={item} index={index} parent={data} />
                <Show when={item.get()?.children}>
                  <List data={item.get().children as any} ItemComp={ItemComp} />
                </Show>
              </>
            );
          }}
        </For>
      </Show>
    </div>
  );
}
