// 复制文本到剪贴板
export async function copy(text: string) {
  return navigator.clipboard.writeText(text);
}

// 从剪贴板读取文本
export async function paste() {
  const text = await navigator.clipboard.readText();
  return text;
}
