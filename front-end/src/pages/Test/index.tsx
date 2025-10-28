import { useDeepSignal, useProps, useSignal, type IProps, type ISignal } from "@/utils";
import { Input } from "@comps/Input";
import { Tree } from "@comps/Tree";

const treeData = useDeepSignal([
  {
    text: "1",
    value: "1",
    children: [],
  },
  {
    text: "2",
    value: "2",
    children: [
      {
        text: "3",
        value: "3",
        children: [
          {
            text: "4",
            value: "4",
            children: null,
          },
        ],
      },
    ],
  },
]);
export default function App() {
  return (
    <div>
      <Tree data={treeData}>
        {item => (
          <>
            <div>标题：{item.get().text.get()}</div>
            <Input value={item.get().value} />
          </>
        )}
      </Tree>
      <Tree data={treeData}>
        {item => (
          <>
            <div>标题：{item.get().text.get()}</div>
            <Input value={item.get().value} />
          </>
        )}
      </Tree>
    </div>
  );
}
