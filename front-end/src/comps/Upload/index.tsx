import { useProps, useSignal, type Children, type ClassName, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button";
import { type JSX } from "solid-js";
import { addToast } from "../Toast";
import { getAllFilesSize } from "./tools";
import { FileList } from "./FileList";
/**
 * 文件上传类型
 */
interface IUploadProps {
  children?: Children;
  class?: ClassName;
  onClick?: () => void;
  files: File[];
  disabled?: boolean;
  limit?: number; // 限制文件数量
  limitSize?: number; // 限制文件总大小 (MB)
  ListComp?: typeof FileList; // 文件列表组件
}
/**
 * 文件上传
 * @param props
 * @returns
 */
export function Upload(props: IProps<IUploadProps>) {
  const {
    children,
    class: className,
    onClick,
    files,
    disabled,
    limit,
    limitSize,
    ListComp,
  } = useProps(props, {
    class: "",
    children: "",
    disabled: false,
    limit: Infinity,
    limitSize: 380,
    ListComp: FileList,
  });

  const baseClass = twMerge([""]);

  let refFile: HTMLInputElement;

  /**
   * 根据数量限制是否多选
   */
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
      const exist = files.get().some(curFile => {
        return curFile.name == file.name && curFile.size == file.size;
      });
      if (exist) {
        addToast(`“${file.name} 文件” 已存在`, "warning");
      } else {
        newFiles.push(file);
      }
    }

    if (newFiles.length + files.get().length > limit.get()) {
      addToast(`当前限制选择 ${limit.get()} 个文件，已达到限制`, "warning");
      refFile.value = "";
      return;
    } else {
      const newResult = [...files.get(), ...newFiles];
      const totalSize = getAllFilesSize(newResult);
      if (totalSize > limitSize.get()) {
        addToast(
          `选择文件大小为 ${totalSize} MB，已超过 ${limitSize.get()} MB 文件限制`,
          "warning",
        );
        refFile.value = "";
        return;
      }
      refFile.value = "";
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
      {ListComp && <ListComp files={files} disabled={disabled} />}
    </div>
  );
}
