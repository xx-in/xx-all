from fastapi import FastAPI, Request, Response
from fastapi.responses import FileResponse, JSONResponse, PlainTextResponse
from pathlib import Path
from flatted import PlainJSONResponse, parse, parse_request, stringify
app = FastAPI()


def sendFile(url_path, root="dist/index.html"):
    """
    如果文件存在就发送文件,
    否则就发送root文件
    """
    file_path = Path("dist", url_path)  # 将URL路径转换为本地文件路径
    if file_path.exists() and file_path.is_file():
        return FileResponse(path=file_path)
    return FileResponse(path=Path(root))


@app.post("/api/test/saveFile")
async def saveFile(request: Request):
    body = await parse_request(request)
    return PlainJSONResponse(body)


@app.get("/api/test/getFile")
async def getFile():
    return "getFile"


@app.api_route("/api/{full_path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def catch_all_api(full_path: str):
    """拦截所有api开头请求，
    区分前后端错误
    """
    return JSONResponse({"error": 404, "message": f"`/api/{full_path}` 接口不存在"})


@app.get("/{url_path:path}")
async def spa(url_path: str):
    return sendFile(url_path)
