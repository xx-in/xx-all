import OpenSeadragon from "openseadragon";
import { randomId, useEffect, useMount, useProps, type IProps } from "@/utils";
import { twMerge } from "tailwind-merge";

interface IImageViewer {
  src: string;
  class?: string;
}
export function ImageViewer(props: IProps<IImageViewer>) {
  const { src, class: className } = useProps(props, { class: "" });
  let refContainer: HTMLDivElement;
  let viewer: OpenSeadragon.Viewer;

  useEffect(() => {
    if (viewer) {
      viewer.open({
        type: "image",
        url: src.get(),
      });
    } else {
      viewer = OpenSeadragon({
        element: refContainer,
        tileSources: {
          type: "image",
          url: src.get(),
        },
        maxZoomLevel: 3,
        minZoomLevel: 0.1,
        showZoomControl: true,
        showRotationControl: true,
        showFlipControl: true,
      });
    }
  });

  return (
    <div ref={e => (refContainer = e)} class={twMerge("size-full bg-black", className.get())}></div>
  );
}
