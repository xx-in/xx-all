/**
 * 判断是否是文字格式
 * @param type
 * @returns
 */
export function isText(fileName: string) {
  // 常见 Monaco 支持的文本文件扩展名
  const textExts = [
    "js",
    "ts",
    "jsx",
    "tsx",
    "json",
    "html",
    "css",
    "md",
    "py",
    "c",
    "cpp",
    "java",
    "xml",
    "yml",
    "yaml",
    "sh",
    "sql",
    "txt",
    "lua",
  ];

  const ext = getExt(fileName);
  return textExts.includes(ext);
}

export function isPdf(fileName: string) {
  return /pdf$/.test(fileName);
}

export function isEpub(fileName: string) {
  return /epub$/.test(fileName);
}

/**
 * 阶段文件名称，但是保留后缀
 * @param filename
 * @param maxLength
 * @returns
 */
export function truncateFileName(filename: string, maxLength: number = 50): string {
  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex === -1) return filename; // 没有后缀名的情况

  const name = filename.slice(0, dotIndex);
  const ext = filename.slice(dotIndex); // 包含“.”

  // 如果文件名整体长度不超出限制，直接返回
  if (filename.length <= maxLength) return filename;

  // 可显示的主文件名长度（减去后缀和 ...) 的长度）
  const keepLength = maxLength - ext.length - 3;
  if (keepLength <= 0) return "...)" + ext;

  return name.slice(0, keepLength) + "...)" + ext;
}

/**
 * 是图片类型么
 * @param type
 * @returns
 */
export function isImage(fileName: string) {
  const imageExts = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "bmp",
    "svg",
    "tiff",
    "tif",
    "ico",
    "heic",
    "heif",
  ];
  const ext = getExt(fileName);
  return imageExts.includes(ext);
}

/**
 * 获取后缀
 * @param fileName
 * @returns
 */
function getExt(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  return ext;
}
