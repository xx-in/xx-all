import { Button } from "@comps/Button";
import { Upload } from "@comps/Upload";
import { useSignal, stringifyJSON, parseJSON, parseResponse } from "@/utils";

export default function UploadList() {
  const files = useSignal<File[]>([]);
  async function handleSave() {
    // console.log("开始处理" + Math.random());
    const body = await stringifyJSON(files.get());
    // console.time("用时");
    const response = await fetch("/api/test/saveFile", {
      method: "POST",
      body,
    });
    const data = await parseResponse(response);
    // console.timeEnd("用时");
    // console.log(data);
  }

  return (
    <div class="px-4">
      <Upload files={files} limitSize={Infinity} />
      <div class="mt-2">
        <Button onClick={handleSave}>保存</Button>
      </div>
    </div>
  );
}
