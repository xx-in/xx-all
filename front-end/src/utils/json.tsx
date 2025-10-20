import { base64ToFile, fileToBase64 } from "./base64";
import { parse, stringify } from "flatted";

async function parseBase64ToFile(data: unknown, seen = new WeakSet()): Promise<any> {
  const match = /data:.*;base64/;
  // 如果是字符串
  if (typeof data == "string") {
    if (match.test(data)) {
      return base64ToFile(data);
    }
    return data;
  }
  //   数组
  else if (Array.isArray(data)) {
    if (seen.has(data)) {
      return data;
    }
    seen.add(data);
    const result: any = [];
    for await (const item of data) {
      const parsed = await parseBase64ToFile(item, seen);
      result.push(parsed);
    }
    return result;
  }
  // 对象
  else if (data && typeof data === "object") {
    if (seen.has(data)) {
      return data;
    }
    seen.add(data);
    const result: any = {};
    for await (const key of Object.keys(data)) {
      // @ts-ignore
      const parsed = await parseBase64ToFile(data[key], seen);
      result[key] = parsed;
    }
    return result;
  }
  return data;
}

async function parseFileToBase64(data: unknown, seen = new WeakSet()): Promise<any> {
  if (data instanceof File) {
    const result = await fileToBase64(data);
    return result;
  }
  //   数组
  else if (Array.isArray(data)) {
    if (seen.has(data)) {
      return data;
    }
    seen.add(data);
    const result: any = [];

    for await (const item of data) {
      const parsed = await parseFileToBase64(item, seen);
      result.push(parsed);
    }
    return result;
  }
  // 对象
  else if (data && typeof data === "object") {
    if (seen.has(data)) {
      return data;
    }
    seen.add(data);
    const result: any = {};

    for await (const key of Object.keys(data)) {
      // @ts-ignore
      const parsed = await parseFileToBase64(data[key], seen);
      result[key] = parsed;
    }
    return result;
  }
  return data;
}

/**
 * 将JSON还原为变量
 */
export async function parseJSON(data: string) {
  let result = parse(data);
  result = await parseBase64ToFile(result);
  return result;
}

/**
 * 将变量处理为JSON
 * @param data
 * @returns
 */
export async function stringifyJSON(data: unknown) {
  let result = await parseFileToBase64(data);
  result = stringify(result);
  return result;
}

/**
 * 直接解析响应
 * @param response
 * @returns
 */
export async function parseResponse(response: Response) {
  const text = await response.text();
  return parseJSON(text);
}
