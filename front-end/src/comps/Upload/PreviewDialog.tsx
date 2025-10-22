import { type IProps, useProps, useSignal, fileToUrl } from "@/utils";
import { Switch, Match } from "solid-js";
import { Dialog } from "@/comps/Dialog";
import { Flex } from "@/comps/Flex";
import { Svg } from "@/comps/Svg";

interface IPreviewDialogProps {
  visible: boolean;
  file: File | null;
}
/**
 * 文件预览列表
 * @param props
 * @returns
 */
export function PreviewDialog(props: IProps<IPreviewDialogProps>) {
  const { visible, file } = useProps(props, {});

  const fileType = useSignal(() => {
    if (file.get()) {
      return file.get()!.type;
    }
    return "";
  });

  const fileName = useSignal(() => {
    if (file.get()) {
      return file.get()!.name;
    }
    return "";
  });

  const fileUrl = useSignal(() => {
    if (file.get()) {
      return fileToUrl(file.get()!);
    }
    return "";
  });

  /**
   * 是图片类型么
   * @param type
   * @returns
   */
  function isImage(type: string) {
    const map = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      bmp: "image/bmp",
      svg: "image/svg+xml",
      tiff: "image/tiff",
      tif: "image/tiff",
      ico: "image/x-icon",
      heic: "image/heic",
      heif: "image/heif",
    };
    return Object.values(map).includes(type);
  }

  function isPdf(type: string) {
    return type.includes("pdf");
  }

  /**
   * 在新标签页打开
   */
  function handleJump() {
    window.open(fileUrl.get(), "_blank");
  }

  /**
   * 文件下载
   */
  function handleDown() {
    const a = document.createElement("a");
    a.href = fileUrl.get();
    a.download = fileName.get(); // 指定下载文件名
    a.click();
    a.remove();
  }

  return (
    <Dialog visible={visible} title={fileName}>
      <div class="relative size-full bg-transparent">
        <Switch>
          <Match when={isPdf(fileType.get())}>
            <iframe src={fileUrl.get()} width="100%" height="100%"></iframe>
          </Match>
          <Match when={isImage(fileType.get())}>
            <img src={fileUrl.get()} class="mx-auto size-full object-contain" />
          </Match>
          <Match when={true}>
            <Flex class="w-full flex-col justify-center gap-4 py-10">
              <div>暂未支持预览的文件</div>
              <a
                href={fileUrl.get()}
                download={fileName.get()}
                class="text-blue-500 underline underline-offset-2"
              >
                下载 {fileName.get()}
              </a>
            </Flex>
          </Match>
        </Switch>
        {/* 操作按钮组 */}
        <Flex class="absolute right-3 bottom-5 flex-col gap-2 p-2 text-stone-300">
          <Svg.FullScreen
            tip="全屏"
            class="size-8 cursor-pointer bg-stone-700 p-2 hover:text-white"
            onClick={handleJump}
          />
          <Svg.Download
            tip="下载"
            class="size-8 cursor-pointer bg-stone-700 p-2 hover:text-white"
            onClick={handleDown}
          />
        </Flex>
      </div>
    </Dialog>
  );
}
