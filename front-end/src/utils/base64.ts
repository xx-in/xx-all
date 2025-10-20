export function getMimeFromBase64(name: string) {
  return name.split(";")[0].split(":")[1];
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // 读取完成
    reader.onload = () => {
      const base64 = reader.result;
      resolve(`${file.name},${base64}`);
    };

    reader.onerror = err => reject(err);
    reader.readAsDataURL(file); // 读取为 Base64 DataURL
  });
}

export function base64ToFile(base64: string) {
  const [filename, mimeType, base64Raw] = base64.split(",");
  const binary = atob(base64Raw);
  const len = binary.length;
  const array = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    array[i] = binary.charCodeAt(i);
  }

  return new File([array], filename, {
    type: getMimeFromBase64(mimeType),
  });
}

export const fileToUrl = URL.createObjectURL;
