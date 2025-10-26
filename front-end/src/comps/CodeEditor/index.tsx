// src/components/CodeEditor.tsx
import { createEffect, createSignal, onMount, onCleanup } from "solid-js";
import * as monaco from "monaco-editor";
import { useEffect, useProps, useSignal, type IProps } from "@/utils";
import "./worker.ts";
import "./index.css";

interface ICodeEditorProps {
  /** File 对象 */
  file: File | null;
  //   height?: string;
  theme?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}

export function CodeEditor(props: IProps<ICodeEditorProps>) {
  const { file, theme, readOnly, onChange } = useProps(props, {
    theme: "vs-light",
    readOnly: true,
  });
  let editorContainer!: HTMLDivElement;
  let editor: monaco.editor.IStandaloneCodeEditor;
  let currentModel = useSignal<monaco.editor.ITextModel>(null);

  // 扩展名 -> Monaco语言映射
  const extToLang: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    jsx: "javascript",
    tsx: "typescript",
    html: "html",
    css: "css",
    json: "json",
    py: "python",
    md: "markdown",
    c: "c",
    cpp: "cpp",
    java: "java",
    sh: "shell",
    xml: "xml",
    yml: "yaml",
    yaml: "yaml",
    txt: "plaintext",
  };

  // 根据文件名判断语言
  const getLanguageFromFileName = (fileName: string): string => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    return extToLang[ext] || "plaintext";
  };

  onMount(() => {
    editor = monaco.editor.create(editorContainer, {
      value: "",
      language: "plaintext",
      theme: theme.get(),
      readOnly: readOnly.get(),
      minimap: { enabled: false },
      // 自动换行并取消缩进
      wordWrap: "on",
      wrappingIndent: "none",
      tabSize: 4,
      // 滚动条
      scrollbar: {
        horizontal: "hidden",
        vertical: "auto",
      },
    });

    // 监听内容变化
    const sub = editor.getModel()?.onDidChangeContent(() => {
      onChange?.(editor.getValue());
    });
  });

  useEffect(async () => {
    const curFile = file.get()!;
    const text = await curFile.text();

    const language = getLanguageFromFileName(curFile.name);
    // 释放旧 model
    if (currentModel.get()) {
      currentModel.get()?.dispose();
    }

    // 创建新 model 并设置到 editor
    currentModel.set(monaco.editor.createModel(text, language));
    editor.setModel(currentModel.get());
  });

  return (
    <div class="flex size-full">
      <div ref={editorContainer!} class="h-full flex-1" />
    </div>
  );
}
