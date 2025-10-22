/**
 * 获取文件列表的大小
 * @param files
 * @returns
 */
export function getAllFilesSize(files: File[]) {
  const totalSize = files.reduce((size, file) => size + file.size, 0) / 1024 / 1024;
  return Math.ceil(totalSize);
}

/**
 * 将字节数转换为人类可读的大小
 * @param n
 */
export function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return "0B";
  const k = 1024; // 1KB = 1024B
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
  return `${size}${units[i]}`;
}
