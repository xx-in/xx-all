import pdfjsLib from "./pdfWorker.ts";
import { useEffect, useProps, useSignal, type IProps } from "@/utils";

interface IPdfViewerProps {
  url: string;
  preload?: number; // 预加载范围，比如2表示前后各加载2页
}

let currentLoadId = 0;

export function PdfViewer(props: IProps<IPdfViewerProps>) {
  let containerRef: HTMLDivElement;
  const { url, preload } = useProps(props, { preload: 2 });

  const pdfDoc = useSignal<pdfjsLib.PDFDocumentProxy | null>(null);
  const renderedPages = new Set<number>(); // 已渲染页
  const isRendering = useSignal(false);

  /** 创建占位元素 */
  const createPlaceholder = (pageNum: number, height: number) => {
    const placeholder = document.createElement("div");
    placeholder.dataset.page = pageNum.toString();
    placeholder.style.height = `${height}px`;
    placeholder.style.background = "#f5f5f5";
    placeholder.style.marginBottom = "10px";
    placeholder.style.display = "flex";
    placeholder.style.alignItems = "center";
    placeholder.style.justifyContent = "center";
    placeholder.textContent = `第 ${pageNum} 页加载中...`;
    return placeholder;
  };

  /** 渲染单页 */
  const renderSinglePage = async (pageNum: number, loadId: number) => {
    if (renderedPages.has(pageNum) || loadId !== currentLoadId) return;
    const doc = pdfDoc.get();
    if (!doc) return;

    renderedPages.add(pageNum);

    const page = await doc.getPage(pageNum);
    const containerWidth = containerRef!.clientWidth;
    const viewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    canvas.style.display = "block";
    canvas.style.marginBottom = "10px";

    // 新增：设置 data-page 属性
    canvas.dataset.page = pageNum.toString();

    // 渲染 PDF 页面
    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;

    if (loadId !== currentLoadId) return;

    const placeholder = containerRef!.querySelector(`[data-page="${pageNum}"]`);
    if (placeholder) placeholder.replaceWith(canvas);
  };

  /** 懒加载（滚动渲染） */
  const handleScroll = async (e: Event) => {
    const doc = pdfDoc.get();
    if (!doc) return;

    const loadId = currentLoadId;
    const { scrollTop, clientHeight } = e.target as HTMLDivElement;
    const scrollBottom = scrollTop + clientHeight;

    const placeholders = Array.from(containerRef!.children) as HTMLElement[];

    for (const el of placeholders) {
      const rect = el.getBoundingClientRect();
      const top = rect.top + scrollTop;
      const bottom = top + rect.height;
      const pageNum = parseInt(el.dataset.page || "1");

      // 判断是否在可视范围内或附近
      if (
        (top < scrollBottom + 800 && bottom > scrollTop - 800) || // 可视区域前后缓冲800px
        Math.abs(scrollTop - top) < preload.get() * 800 // 预加载几页
      ) {
        await renderSinglePage(pageNum, loadId);
      }
    }
  };

  /** 渲染入口 */
  const render = async (url: string) => {
    if (!url) return;
    currentPageNum.set("1");
    currentLoadId++;
    const loadId = currentLoadId;

    renderedPages.clear();
    containerRef!.innerHTML = "";
    isRendering.set(false);

    try {
      const doc = await pdfjsLib.getDocument(url).promise;
      if (loadId !== currentLoadId) return;
      pdfDoc.set(doc);

      // 插入所有占位
      for (let i = 1; i <= doc.numPages; i++) {
        const placeholder = createPlaceholder(i, 600);
        containerRef!.appendChild(placeholder);
      }

      // 初始渲染前几页
      await renderSinglePage(1, loadId);
      await renderSinglePage(2, loadId);
    } catch (err) {
      if (loadId === currentLoadId) console.error("PDF 加载失败:", err);
    }
  };

  /** 初始化与监听 */
  useEffect(() => {
    render(url.get());
  });

  const currentPageNum = useSignal("1");
  function handleMouseOver(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const page = target.dataset.page;
    if (page) {
      currentPageNum.set(page);
    }
  }

  return (
    <div class="size-full">
      <div
        ref={containerRef!}
        class="size-full overflow-auto"
        onScroll={handleScroll}
        onMouseOver={handleMouseOver}
      ></div>
      <div class="absolute bottom-2 left-2 z-10 rounded-sm bg-black/10 px-4 py-1 text-stone-500">
        {currentPageNum.get()} / {pdfDoc.get()?.numPages}
      </div>
    </div>
  );
}
