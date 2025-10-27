import { throttle, useEffect, useProps, useSignal, type IProps } from "@/utils";
import { SvgLeftBold } from "@comps/Svg/LeftBold";
import { SvgRightBold } from "@comps/Svg/RightBold";
import ePub from "epubjs";
import { twMerge } from "tailwind-merge";

interface IEpubViewer {
  file: File | null;
  flow?: "scrolled" | "paginated";
  spread?: "auto" | "none";
  class?: string;
}

export function EpubViewer(props: IProps<IEpubViewer>) {
  const {
    file,
    class: className,
    flow,
    spread,
  } = useProps(props, { class: "", flow: "scrolled", spread: "auto" });

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
        flow: flow.get(),
        spread: spread.get(),
      });

      rendition.display();
      curBook.set(rendition);

      setStyles({
        body: {
          background: "transparent",
        },
        image: {
          width: "100%",
        },
        a: {
          "line-height": "2.2",
          "font-size": "1em",
        },
        p: {
          "font-size": "1.2em",
          "line-height": "2.2",
        },
      });

      // 获取章节信息（spine）
      book.ready.then(() => {
        totalChapters.set(book.spine.items.length);
      });

      // 翻页时更新当前章节
      rendition.on("relocated", (location: any) => {
        const spineIndex = book.spine.items.findIndex(
          (item: any) => item.href === location.start.href,
        );
        if (spineIndex >= 0) {
          curChapter.set(spineIndex + 1);
        }
      });

      // ✅ 每次章节渲染完成时，在结尾添加提示段落
      rendition.on("rendered", (_section: any, view: any) => {
        const doc = view.document;
        if (!doc) return;

        // 避免重复插入
        if (!doc.querySelector("#chapter-end-hint")) {
          const endHint = doc.createElement("p");
          endHint.id = "chapter-end-hint";
          endHint.textContent = "—— 本章节已结束 ——";
          Object.assign(endHint.style, {
            textAlign: "center",
            color: "#999",
            fontSize: "0.9em",
            marginTop: "2em",
            marginBottom: "2em",
            fontStyle: "italic",
          });

          doc.body.appendChild(endHint);
        }
      });
    }
  });

  /**
   * 设置样式
   * @param style
   */
  function setStyles(style: object) {
    curBook.get().themes.default(style);
  }

  function handleNext() {
    curBook.get()?.next();
  }

  function handlePrev() {
    curBook.get()?.prev();
  }

  return (
    <div class={twMerge("relative flex size-full", className.get())}>
      {/* epub内容容器 */}
      <div ref={e => (refContainer = e)} class="h-full flex-1 py-2"></div>

      {/* 左翻页按钮 */}
      <div
        class={twMerge(
          "group absolute left-0 flex h-full w-20 flex-none cursor-pointer items-center justify-center",
        )}
        onClick={handlePrev}
      >
        <SvgLeftBold class="size-6 scale-y-125 text-stone-200 group-hover:text-black" />
      </div>

      {/* 右翻页按钮 */}
      <div
        class={twMerge(
          "group absolute right-0 flex h-full w-20 flex-none cursor-pointer items-center justify-center",
        )}
        onClick={handleNext}
      >
        <SvgRightBold class="size-6 scale-y-125 text-stone-200 group-hover:text-black" />
      </div>

      {/* 章节分页 */}
      <div class="absolute right-4 bottom-4 rounded-md text-sm text-stone-500 select-none">
        {curChapter.get()} / {totalChapters.get()}
      </div>
    </div>
  );
}
