import {
  type IProps,
  useProps,
  useSignal,
  fileToUrl,
  isPdf,
  isEpub,
  isImage,
  isText,
} from "@/utils";
import { Switch, Match } from "solid-js";
import { Dialog } from "@comps/Dialog";
import { Flex } from "@comps/Flex";
import { Button } from "@comps/Button";
import { SvgDownload } from "@comps/Svg/Download";
import { SvgLeftBold } from "@comps/Svg/LeftBold";
import { SvgRightBold } from "@comps/Svg/RightBold";
import { PdfViewer } from "@comps/PdfViewer";
import { EpubViewer } from "@comps/EpubViewer";
import { ImageViewer } from "@comps/ImageViewer";
import { CodeEditor } from "@comps/CodeEditor";
import { SvgShare } from "@comps/Svg/Share";

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

  /**
   * 下一个文件
   */
  function handleNext() {
    let index = files.get().findIndex(curFile => curFile == file.get());
    index += 1;
    if (index == files.get().length) {
      index = 0;
    }
    file.set(files.get()[index]);
  }

  /**
   * 上一个文件
   */
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
          <Match when={isPdf(fileName.get())}>
            {/* <PdfViewer file={fileUrl} /> */}
            <PdfViewer url={fileUrl} class="mx-auto" />
          </Match>
          {/* epub */}
          <Match when={isEpub(fileName.get())}>
            <EpubViewer file={file} flow={"scrolled"} class="mx-auto" spread={"none"} />
          </Match>
          {/* 图片 */}
          <Match when={isImage(fileName.get())}>
            <ImageViewer src={fileUrl} />
          </Match>
          <Match when={isText(fileName.get())}>
            <CodeEditor file={file} />
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

        {/* 左翻页 */}
        <Button
          class={
            "fixed top-1/2 left-10 size-8 -translate-y-1/2 rounded-full bg-stone-600/70 p-2 text-white hover:bg-stone-500/70 sm:left-2 lg:left-10 lg:size-14"
          }
          onClick={handlePre}
        >
          <SvgLeftBold class="lg:size-6" />
        </Button>
        {/* 右翻页 */}

        <Button
          class={
            "fixed top-1/2 right-10 size-8 -translate-y-1/2 rounded-full bg-stone-600/70 p-2 text-white hover:bg-stone-500/70 sm:right-2 lg:right-10 lg:size-14"
          }
          onClick={handleNext}
        >
          <SvgRightBold class="lg:size-6" />
        </Button>

        {/* 操作按钮组 */}
        <Flex class="absolute right-3 bottom-15 flex-col gap-4 p-2 text-stone-500">
          <SvgShare
            tip="在新建标签页打开"
            class="size-8 cursor-pointer rounded-full bg-stone-200 p-2 hover:bg-blue-100 hover:text-blue-500"
            onClick={handleJump}
          />
          <SvgDownload
            tip="下载"
            class="size-8 cursor-pointer rounded-full bg-stone-200 p-2 hover:bg-blue-100 hover:text-blue-500"
            onClick={handleDown}
          />
        </Flex>
      </div>
    </Dialog>
  );
}
