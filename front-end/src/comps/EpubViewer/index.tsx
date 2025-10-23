import { createEffect, createSignal, onCleanup } from "solid-js";
import "foliate-js/view.js";
import { onMount } from "solid-js";
import { useEffect } from "@/utils";

export function EpubViewer(props) {
  let container;

  useEffect(async () => {
    const file = props.url.get();
    const view = document.createElement("foliate-view");
    view.style.height = "100%";
    view.style.width = "100%";
    container.appendChild(view);
    await view.open(file);
    view.renderer.next();
  });

  return <div ref={container} style={{ width: "100%", height: "100%" }}></div>;
}
