import {
  isEpub,
  isImage,
  isPdf,
  isText,
  truncateFileName,
  useEffect,
  useProps,
  useSignal,
  type IProps,
} from "@/utils";
import { Show, For, Switch, Match } from "solid-js";
import { Flex } from "@comps/Flex";
import { Grid } from "@comps/Grid";
import { Svg } from "@comps/Svg";
import { formatBytes } from "./tools";
import { PreviewDialog } from "./PreviewDialog";
import { SvgDocument } from "@comps/Svg/Document";
import { SvgSuccess } from "@comps/Svg/Success";
import { SvgFail } from "@comps/Svg/Fail";
import { SvgPdf } from "@comps/Svg/Pdf";
import { SvgImage } from "@comps/Svg/Image";
import { SvgEpub } from "@comps/Svg/Epub";
import { SvgCode } from "@comps/Svg/Code";
import { SvgFile } from "@comps/Svg/File";

/**
 * 文件列表
 * @param props
 * @returns
 */
export function List(
  props: IProps<{
    files: Array<File>;
    disabled: boolean;
  }>,
) {
  const { files, disabled } = useProps(props, {});

  /**
   * 移除文件
   * @param index
   */
  function handleRemove(index: number) {
    files.update(cur => {
      cur.splice(index, 1);
    });
  }

  /**
   * 文件预览
   * @param file
   */
  function handlePreview(file: File) {
    previewVisible.set(true);
    previewFile.set(file);
  }

  const previewVisible = useSignal(false);
  const previewFile = useSignal<File>(null);

  return (
    <>
      <Show when={files.get().length}>
        <Grid class="mt-2 grid-cols-1 gap-x-3 gap-y-2 overflow-auto pr-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <For each={files.get()}>
            {(file, index) => {
              return (
                <Flex class="group cursor-pointer rounded-sm px-2 py-1 select-none hover:bg-blue-50">
                  {/* 文件名 */}
                  <Flex class="flex-1 gap-2 overflow-hidden" title={file.name}>
                    {/* 文件后缀 */}
                    <FileType name={file.name} />

                    <span
                      class="flex-1 truncate group-hover:text-blue-500 hover:underline hover:underline-offset-4"
                      onClick={() => handlePreview(file)}
                    >
                      {file.name}
                    </span>
                  </Flex>

                  {/* 文件大小 */}
                  <Flex class="w-24 justify-end gap-2">
                    <span>{formatBytes(file.size)}</span>
                    <Show when={!disabled.get()}>
                      <SvgSuccess class="text-green-400 group-hover:hidden" />
                      <SvgFail
                        class="hidden cursor-pointer text-red-400 group-hover:flex hover:text-red-500"
                        onClick={() => handleRemove(index())}
                      />
                    </Show>
                  </Flex>
                </Flex>
              );
            }}
          </For>
        </Grid>
      </Show>
      {/* 预览弹窗 */}
      <PreviewDialog visible={previewVisible} file={previewFile} files={files}></PreviewDialog>
    </>
  );
}

function getExt(text: string) {
  return text.split(".").at(-1)!;
}

function FileType(props: IProps<{ name: string }>) {
  const { name } = useProps(props, {});

  return (
    <Switch>
      <Match when={isPdf(name.get())}>
        <SvgPdf />
      </Match>

      <Match when={isImage(name.get())}>
        <SvgImage />
      </Match>
      <Match when={isEpub(name.get())}>
        <SvgEpub />
      </Match>
      <Match when={isText(name.get())}>
        <SvgCode />
      </Match>
      <Match when={true}>
        <SvgFile />
      </Match>
    </Switch>
  );
}
