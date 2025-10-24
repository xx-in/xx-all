// @ts-ignore
import { View } from "foliate-js/view.js";
import { useEffect, useProps, useSignal, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";
import { SvgLeftBold } from "@comps/Svg/LeftBold";
import { SvgRightBold } from "@comps/Svg/RightBold";

interface IEpubViewer {
  url: string;
}
export function EpubViewerFoliate(props: IProps<IEpubViewer>) {
  const { url } = useProps(props, {});
  let refContainer: HTMLDivElement;

  const book = useSignal<any>(null);

  function handleNext() {
    book.get().next();
  }

  function handlePrev() {
    book.get().prev();
  }

  useEffect(async () => {
    refContainer.innerHTML = "";
    const view = new View();
    console.log("??view", view);
    book.set(view);
    view.style.height = "100%";
    view.style.width = "100%";
    if (refContainer) {
      refContainer.appendChild(view);
    }
    await view.open(url.get());
    view.renderer.next();
  });

  return (
    <div class="relative size-full py-5">
      <div ref={e => (refContainer = e)} class="mx-auto h-full px-2"></div>
      <div
        class={twMerge(
          "group absolute top-0 left-0 flex h-full w-20 cursor-pointer items-center justify-center bg-transparent",
        )}
        onClick={handlePrev}
      >
        <SvgLeftBold class="size-6 scale-y-125 text-stone-200 group-hover:text-black" />
      </div>

      <div
        class={twMerge(
          "group absolute top-0 right-0 flex h-full w-20 cursor-pointer items-center justify-center bg-transparent",
        )}
        onClick={handleNext}
      >
        <SvgRightBold class="size-6 scale-y-125 text-stone-200 group-hover:text-black" />
      </div>
    </div>
  );
}
