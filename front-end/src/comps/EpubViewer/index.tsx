import { useEffect, useProps, useSignal, type IProps } from "@/utils";
import { SvgLeftBold } from "@comps/Svg/LeftBold";
import { SvgRightBold } from "@comps/Svg/RightBold";
import ePub from "epubjs";
import { twMerge } from "tailwind-merge";

interface IEpubViewer {
  file: File | null;
  flow?: "scrolled" | "paginated";
}

export function EpubViewer(props: IProps<IEpubViewer>) {
  const { file, flow } = useProps(props, {
    flow: "scrolled",
  });
  let refContainer: HTMLDivElement;

  const curBook = useSignal<any>(null);
  const curChapter = useSignal<number>(1);
  const totalChapters = useSignal<number>(1);

  useEffect(() => {
    if (file.get()) {
      refContainer.innerHTML = "";

      const book = ePub(file.get() as any) as any;
      const rendition = book.renderTo(refContainer, {
        width: "100%",
        height: "100%",
        flow: flow.get(), // 滚动阅读
        spread: "none",
      });

      rendition.display();

      // 设置主题样式
      rendition.themes.default({
        body: {
          background: "transparent",
        },
        a: {
          "font-size": "1.1em",
          "line-height": "2.2",
        },
        p: {
          "font-size": "1.1em",
          "line-height": "2.2",
        },
      });

      curBook.set(rendition);

      // 获取章节信息（spine）
      book.ready.then(() => {
        totalChapters.set(book.spine.items.length);
      });

      // 当翻页或跳转章节时更新当前章节
      rendition.on("relocated", (location: any) => {
        const spineIndex = book.spine.items.findIndex(
          (item: any) => item.href === location.start.href,
        );
        if (spineIndex >= 0) {
          curChapter.set(spineIndex + 1);
        }
      });
    }
  });

  function handleNext() {
    curBook.get()?.next();
  }

  function handlePrev() {
    curBook.get()?.prev();
  }

  return (
    <div class="relative size-full py-5">
      {/* epub内容容器 */}
      <div ref={e => (refContainer = e)} class="mx-auto h-full"></div>

      {/* 左翻页按钮 */}
      <div
        class={twMerge(
          "group absolute top-0 left-0 flex h-full w-20 cursor-pointer items-center justify-center bg-transparent",
        )}
        onClick={handlePrev}
      >
        <SvgLeftBold class="size-6 scale-y-125 text-stone-200 group-hover:text-black" />
      </div>

      {/* 右翻页按钮 */}
      <div
        class={twMerge(
          "group absolute top-0 right-0 flex h-full w-20 cursor-pointer items-center justify-center bg-transparent",
        )}
        onClick={handleNext}
      >
        <SvgRightBold class="size-6 scale-y-125 text-stone-200 group-hover:text-black" />
      </div>

      {/* 章节分页 */}
      <div class="absolute right-4 bottom-3 rounded-md px-3 py-1 text-sm text-stone-500">
        {curChapter.get()} / {totalChapters.get()}
      </div>
    </div>
  );
}
