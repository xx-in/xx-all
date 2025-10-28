import { useDeepSignal, useProps, useSignal, type IProps, type ISignal } from "@/utils";
import { Input } from "@comps/Input";
import { List, type IListItem, type IListItemProps } from "@comps/List";

export default function App() {
  const treeData = useDeepSignal([
    {
      text: "1",
      value: "1",
    },
    {
      text: "2",
      value: "2",
      children: [
        {
          text: "3",
          value: "3",
        },
        {
          text: "4",
          value: "4",
        },
      ],
    },
  ]);

  return (
    <div>
      <List ItemComp={A} data={treeData} />
      <List ItemComp={A} data={treeData} />
    </div>
  );
}

function A(props: any) {
  const { item } = useProps(props, {});

  return (
    <div>
      A:{item.get().text.get()}
      <Input value={item.get().value}></Input>
    </div>
  );
}
