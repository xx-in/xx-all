import { useProps, type IProps, type ISignal } from "@/utils";
import { Flex } from "@comps/Flex";
import { SvgClose } from "@comps/Svg/Close";

interface IDialogTitleProps {
  children: ISignal<string>;
  visible: boolean;
}
export function Title(props: IProps<IDialogTitleProps>) {
  const { children, visible } = useProps(props, {});

  function handleClose() {
    visible.set(false);
  }
  return (
    <div
      class="flex min-h-12 shrink-0 grow-0 items-center justify-between rounded-sm border-b border-b-stone-200 bg-gray-100 px-2 pt-1 select-none"
      title={children.get()}
    >
      <div class="flex-1 truncate px-24 font-bold">{children.get()}</div>
      <Flex class="mr-2 size-5 justify-center hover:bg-stone-200">
        <SvgClose class="size-4 cursor-pointer" onClick={handleClose} />
      </Flex>
    </div>
  );
}
