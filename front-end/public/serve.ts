// main.ts
import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

Deno.serve(async (req) => {
    const url = new URL(req.url);
    const pathname = url.pathname;
    // 配置代理
    if (pathname.startsWith("/api")) {
        const targetBase =
            "https://solid-own-server-mf6acd8dhe5a.xx-98946.deno.net";
        const targetUrl =
            targetBase + pathname.replace(/^\/api/, "") + url.search;
        // console.log("-----------pathname", pathname)
        // console.log(targetUrl)
        const proxyRequest = new Request(targetUrl, {
            method: req.method,
            headers: req.headers,
            body: req.body,
            redirect: "manual",
        });
        return fetch(proxyRequest);
    }

    // 1. 处理静态文件（自动支持 assets/ 等）
    const res = await serveDir(req, {
        fsRoot: "./", // 打包输出目录
        urlRoot: "",
        showDirListing: false,
        enableCors: true,
    });

    // 2. 如果找不到文件，回退到 index.html（支持前端路由）
    if (res.status === 404) {
        const index = await Deno.readFile("./index.html");
        return new Response(index, {
            headers: {
                "content-type": "text/html",
            },
        });
    }

    return res;
});