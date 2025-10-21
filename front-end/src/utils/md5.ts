import SparkMD5 from "spark-md5";

export function getFileMD5(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const arrayBuffer = e.target?.result;
      if (arrayBuffer) {
        const md5 = SparkMD5.ArrayBuffer.hash(arrayBuffer as ArrayBuffer);
        resolve(md5);
      } else {
        reject(new Error("读取文件失败"));
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
