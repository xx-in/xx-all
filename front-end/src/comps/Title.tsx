import { useEffect, useProps, type IProps } from "@/utils";

type ITitleProps = {
  children: string; // 标题
};

/**
 * 设置页面的标题
 */
export function Title(props: IProps<ITitleProps>) {
  const { children } = useProps(props, {});
  const title = document.querySelector("title")!;
  useEffect(() => {
    title.innerText = children;
  });

  return <></>;
}
