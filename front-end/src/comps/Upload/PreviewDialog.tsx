import { type IProps, useProps, useSignal, fileToUrl } from "@/utils";
import { Switch, Match } from "solid-js";
import { Dialog } from "@comps/Dialog";
import { Flex } from "@comps/Flex";
import { Button } from "@comps/Button";
import { SvgFullScreen } from "@comps/Svg/FullScreen";
import { SvgDownload } from "@comps/Svg/Download";
import { SvgLeftBold } from "@comps/Svg/LeftBold";
import { SvgRightBold } from "@comps/Svg/RightBold";
import { PdfViewer } from "@comps/PdfViewer";
import { EpubViewer } from "@comps/EpubViewer";
import { ImageViewer } from "@comps/ImageViewer";

interface IPreviewDialogProps {
  visible: boolean;
  file: File | null;
  files?: File[];
}
/**
 * 文件预览列表
 * @param props
 * @returns
 */
export function PreviewDialog(props: IProps<IPreviewDialogProps>) {
  const { visible, file, files } = useProps(props, {
    files: [],
  });

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

  function isEpub(type: string) {
    return type.includes("epub");
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

  function handleNext() {
    let index = files.get().findIndex(curFile => curFile == file.get());
    index += 1;
    if (index == files.get().length) {
      index = 0;
    }
    file.set(files.get()[index]);
  }

  function handlePre() {
    let index = files.get().findIndex(curFile => curFile == file.get());
    index -= 1;
    if (index < 0) {
      index = files.get().length - 1;
    }
    file.set(files.get()[index]);
  }

  return (
    <Dialog visible={visible} title={fileName}>
      <div class="relative h-full w-[1000px] bg-stone-50">
        <Switch>
          {/* pdf */}
          <Match when={isPdf(fileType.get())}>
            {/* <PdfViewer file={fileUrl} /> */}
            <PdfViewer url={fileUrl} class="mx-auto" />
          </Match>
          <Match when={isEpub(fileType.get())}>
            {/* <EpubViewer file={file} url={fileUrl} isScrolled={true} /> */}
            <EpubViewer file={file} flow={"scrolled"} class="mx-auto" spread={"none"} />
          </Match>
          {/* 图片 */}
          <Match when={isImage(fileType.get())}>
            <ImageViewer src={fileUrl} />
            {/* <img src={fileUrl.get()} class="mx-auto size-full object-contain" /> */}
          </Match>
          {/* 其他 */}
          <Match when={true}>
            <Flex class="h-full w-full flex-col justify-center gap-4 py-10">
              <div>暂未支持预览的文件</div>
              <a
                href={fileUrl.get()}
                download={fileName.get()}
                class="w-1/2 text-blue-500 underline underline-offset-2"
              >
                <span>{fileName.get()}</span>
              </a>
            </Flex>
          </Match>
        </Switch>

        {/* 左右翻页 */}
        <Button
          class={
            "fixed top-1/2 left-10 size-8 -translate-y-1/2 rounded-full bg-stone-600/70 p-2 text-white hover:bg-stone-500/70 sm:left-2 lg:left-10 lg:size-14"
          }
          onClick={handlePre}
        >
          <SvgLeftBold class="lg:size-6" />
        </Button>

        <Button
          class={
            "fixed top-1/2 right-10 size-8 -translate-y-1/2 rounded-full bg-stone-600/70 p-2 text-white hover:bg-stone-500/70 sm:right-2 lg:right-10 lg:size-14"
          }
          onClick={handleNext}
        >
          <SvgRightBold class="lg:size-6" />
        </Button>

        {/* 操作按钮组 */}
        <Flex class="absolute right-3 bottom-15 flex-col gap-2 p-2 text-stone-300">
          <SvgFullScreen
            tip="全屏"
            class="size-8 cursor-pointer bg-stone-700 p-2 hover:text-white"
            onClick={handleJump}
          />
          <SvgDownload
            tip="下载"
            class="size-8 cursor-pointer bg-stone-700 p-2 hover:text-white"
            onClick={handleDown}
          />
        </Flex>
      </div>
    </Dialog>
  );
}
