import {
  fileToUrl,
  getFileMD5,
  useEffect,
  useProps,
  useSignal,
  type Children,
  type ClassName,
  type IProps,
} from "@/utils";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button";
import { For, Match, Show, Switch, type JSX } from "solid-js";
import { Flex } from "@/comps/Flex";
import { Svg } from "../Svg";
import { Grid } from "../Grid";
import { addToast } from "../Toast";
import { Dialog } from "../Dialog";

interface IUploadProps {
  children?: Children;
  class?: ClassName;
  onClick?: () => void;
  files: File[];
  disabled?: boolean;
  limit?: number;
}

export function Upload(props: IProps<IUploadProps>) {
  const {
    children,
    class: className,
    onClick,
    files,
    disabled,
    limit,
  } = useProps(props, {
    class: "",
    children: "",
    disabled: false,
    limit: Infinity,
  });

  const baseClass = twMerge([""]);

  let refFile: HTMLInputElement;

  const multiple = useSignal(() => {
    if (limit.get() == 1) {
      return false;
    }
    return true;
  });

  function handleClick() {
    if (files.get().length >= limit.get()) {
      addToast(`当前限制选择 ${limit.get()} 个文件，已达到限制`, "warning");
      return;
    }
    refFile.click();
    onClick?.();
  }

  const handleChange: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> = async e => {
    const fileList = e.target.files!;
    const newFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const exists = files.get().some(curFile => {
        return curFile.name == file.name && curFile.size == file.size;
      });
      if (!exists) {
        newFiles.push(file);
      }
    }

    if (newFiles.length + files.get().length > limit.get()) {
      addToast(`当前限制选择 ${limit.get()} 个文件，已达到限制`, "warning");
    } else {
      const newResult = [...files.get(), ...newFiles];
      const totalSize = getAllFilesSize(newResult);
      if (totalSize > 380) {
        console.log(totalSize);
        addToast(`选择文件大小为 ${totalSize} MB，已超过 380 MB 文件限制`, "warning");
        return;
      }
      files.set(newResult);
    }
  };

  return (
    <div class={twMerge(baseClass, className.get())}>
      <input
        type="file"
        class="hidden"
        ref={e => (refFile = e)}
        onChange={handleChange}
        multiple={multiple.get()}
      />
      <button onClick={handleClick} disabled={disabled.get()}>
        {children || (
          <Button class={Button.blue} disabled={disabled}>
            选择文件
          </Button>
        )}
      </button>
      <FileList files={files} disabled={disabled} />
    </div>
  );
}

/**
 * 获取文件列表的大小
 * @param files
 * @returns
 */
function getAllFilesSize(files: File[]) {
  const totalSize = files.reduce((size, file) => size + file.size, 0) / 1024 / 1024;
  return Math.ceil(totalSize);
}

/**
 * 将字节数转换为人类可读的大小
 * @param n
 */
function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return "0B";
  const k = 1024; // 1KB = 1024B
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
  return `${size}${units[i]}`;
}

function FileList(
  props: IProps<{
    files: Array<File>;
    disabled: boolean;
  }>,
) {
  const { files, disabled } = useProps(props, {});

  function handleRemove(index: number) {
    files.update(cur => {
      cur.splice(index, 1);
    });
  }

  function handlePreview(file: File) {
    previewDialogVisible.set(true);
    // const url = fileToUrl(file);
    previewFile.set(file);
  }

  const previewDialogVisible = useSignal(false);
  const previewFile = useSignal<File | null>(null);

  const previewFileInfo = useSignal(() => {
    const file = previewFile.get();
    if (file) {
      const type = file.type;
      const url = fileToUrl(file);
      return { type, url };
    }
    return {};
  });

  function isImage(type: string | undefined) {
    if (!type) {
      return false;
    }
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

  function handleJump() {
    window.open(previewFileInfo.get().url, "_blank");
  }

  return (
    <>
      <div>
        <Grid class="mt-2 grid-cols-1 gap-x-3 gap-y-2 overflow-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
          <For each={files.get()}>
            {(file, index) => {
              return (
                <Flex class="group cursor-pointer rounded-sm px-2 py-1 select-none hover:bg-blue-50">
                  <Flex class="flex-1 gap-2 overflow-hidden" title={file.name}>
                    <Svg.Document class="text-gray-500" />

                    <span
                      class="flex-1 truncate group-hover:text-blue-500 hover:underline hover:underline-offset-4"
                      onClick={() => handlePreview(file)}
                      // href={download(file)}
                    >
                      {file.name}
                    </span>
                  </Flex>
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
      </div>
      <Dialog visible={previewDialogVisible} title="文件预览">
        <div class="relative size-full">
          <Switch>
            <Match when={previewFileInfo.get().type?.includes("pdf")}>
              <iframe src={previewFileInfo.get().url} width="100%" height="100%"></iframe>
            </Match>
            <Match when={isImage(previewFileInfo.get().type)}>
              <img src={previewFileInfo.get().url} class="mx-auto size-full object-contain" />
            </Match>
            <Match when={true}>
              <Flex class="w-full flex-col justify-center gap-4 py-10">
                <div>暂未支持预览的文件</div>
                <a
                  href={previewFileInfo.get().url}
                  download={previewFile.get()?.name}
                  class="text-blue-500 underline underline-offset-2"
                >
                  下载 {previewFile.get()?.name}
                </a>
              </Flex>
            </Match>
          </Switch>
          <Svg.FullScreen
            class="absolute right-5 bottom-5 size-5 cursor-pointer text-gray-300"
            onClick={handleJump}
          />
        </div>
      </Dialog>
    </>
  );
}
