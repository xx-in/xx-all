import { useSignal, stringifyJSON, parseJSON, parseResponse } from "@/utils";
import { parse, stringify } from "flatted";
import type { JSX } from "solid-js";

export default function App() {
  const file = useSignal([]);

  const handleChange: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> = async e => {
    try {
      const files = e.target.files!;
      const rawData = {
        files,
      };
      //@ts-ignore
      rawData.child = {
        parent: rawData,
        a: Math.random(),
      };
      console.time("响应时间");
      const body = await stringifyJSON(rawData);
      const response = await fetch("/api/test/saveFile", {
        method: "POST",
        body,
      });
      const data = await parseResponse(response);
      console.timeEnd("响应时间");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="p-6">
      <input type="file" onchange={handleChange} multiple id="1" />
    </div>
  );
}
