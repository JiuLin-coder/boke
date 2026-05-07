import http from "http";
import fs from "fs";
import path from "path";

async function server(req, res) {
  try {
    const { method, url, headers } = req;

    //把请求的url转换成 ，后端文件夹（就是这里的文件夹）的文件的相对路径
    let filePath = decodeURI(url);
    if (filePath === "/") {
      filePath = "./dist/index.html";
    } else {
      filePath = "./dist" + filePath.substring(5); //由于我设置了"/boke/src/*"，但是在相对路径却是"./dist/src"
    }

    const mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
      ".json": "application/json",
    };
    const ext = path.extname(filePath);

    const contentType = mimeTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });

    res.end(fs.readFileSync(filePath));
  } catch (e) {
    console.log(e.message);
  }
}
http.createServer(server).listen(3000);
console.log("服务启动，地址：http://localhost:3000/");
