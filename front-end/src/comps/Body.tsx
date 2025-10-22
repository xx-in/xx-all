import { useDestroy, useEffect, useMount, useProps, type IProps } from "@/utils";

type IBodyProps = {
  onkeydown?: (e: any) => void;
};

/**
 * 设置页面的标题
 */
export function Body(props: IBodyProps) {
  useMount(() => {
    Object.entries(props).forEach(([event, cb]) => {
      // @ts-ignore
      document.addEventListener(event.replace(/^on/, ""), cb);
    });
  });

  useDestroy(() => {
    Object.entries(props).forEach((event, cb) => {
      // @ts-ignore
      document.removeEventListener(event.replace(/^on/, ""), cb);
    });
  });

  return <></>;
}
