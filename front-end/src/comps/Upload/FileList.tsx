import { useEffect, useProps, useSignal, type IProps } from "@/utils";
import { Show, For } from "solid-js";
import { Flex } from "@/comps/Flex";
import { Grid } from "@/comps/Grid";
import { Svg } from "@/comps/Svg";
import { formatBytes } from "./tools";
import { PreviewDialog } from "./PreviewDialog";

/**
 * 文件列表
 * @param props
 * @returns
 */
export function FileList(
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

  function splitFileName(fileName: string) {
    const suffix = fileName.replace(/^.*\./, "");
    const prefix = fileName.replace(/^.*\./, "");
    console.log({ suffix, prefix });
  }

  return (
    <>
      <Show when={files.get().length}>
        <Grid class="mt-2 grid-cols-1 gap-x-3 gap-y-2 overflow-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
          <For each={files.get()}>
            {(file, index) => {
              return (
                <Flex class="group cursor-pointer rounded-sm px-2 py-1 select-none hover:bg-blue-50">
                  {/* 文件名 */}
                  <Flex class="flex-1 gap-2 overflow-hidden" title={file.name}>
                    <Svg.Document class="text-gray-500" />

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
                      <Svg.Success class="text-green-400 group-hover:hidden" />
                      <Svg.Fail
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
      <PreviewDialog visible={previewVisible} file={previewFile}></PreviewDialog>
    </>
  );
}
