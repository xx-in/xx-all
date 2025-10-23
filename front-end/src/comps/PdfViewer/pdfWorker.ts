// @ts-ignore
import * as pdfjsLib from "pdfjs-dist/build/pdf.min.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
export default pdfjsLib;
