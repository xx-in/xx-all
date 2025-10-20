import { Button } from "@/comps/Button";
import { Card } from "@/comps/Card";
import { Grid } from "@/comps/Grid";
import { addToast } from "@/comps/Toast";
import { copy, useSignal } from "@/utils";
import { For } from "solid-js";
import { twMerge } from "tailwind-merge";

export function ButtonList() {
  const styles = useSignal<Array<keyof typeof Button>>([
    "sky",
    "blue",
    "green",
    "lime",
    "gray",
    "stone",
    "orange",
    "red",
    "purple",
    "yellow",
    "skyPlain",
    "bluePlain",
    "greenPlain",
    "limePlain",
    "grayPlain",
    "stonePlain",
    "orangePlain",
    "redPlain",
    "purplePlain",
    "yellowPlain",
    "skyText",
    "blueText",
    "greenText",
    "limeText",
    "grayText",
    "stoneText",
    "orangeText",
    "redText",
    "purpleText",
    "yellowText",
    "default",
  ]);

  const textStyles = useSignal<Array<keyof typeof Button>>([
    "skyText",
    "blueText",
    "greenText",
    "limeText",
    "grayText",
    "stoneText",
    "orangeText",
    "redText",
    "purpleText",
    "yellowText",
  ]);

  function handleCopy(text: string) {
    return async () => {
      await copy(text);
      addToast("样式已复制", "info");
    };
  }

  return (
    <div class="px-4">
      <Card>
        <Card.Title>按钮组件</Card.Title>
        <Grid class="grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          <For each={styles.get()}>
            {style => (
              <Button class={Button[style]} onClick={handleCopy(style)}>
                {style}
              </Button>
            )}
          </For>
        </Grid>
      </Card>

      <Card>
        <Card.Title>按钮组件 - 禁用</Card.Title>
        <Grid class="grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          <For each={styles.get()}>
            {style => (
              <Button class={Button[style]} disabled>
                {style}
              </Button>
            )}
          </For>
        </Grid>
      </Card>

      <Card>
        <Card.Title>按钮组件 - 自定义</Card.Title>
        <Grid class="grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          <For each={textStyles.get()}>
            {style => (
              <Button class={twMerge(Button[style], "rounded-2xl bg-stone-50 shadow")}>
                {style}
              </Button>
            )}
          </For>
          <Button
            class="rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg transition-all duration-300 hover:from-pink-500 hover:to-yellow-500"
            onClick={() => {
              addToast("我是一个自定义按钮样式", "fail", 6 * 1000);
            }}
          >
            渐变按钮
          </Button>
        </Grid>
      </Card>
    </div>
  );
}
