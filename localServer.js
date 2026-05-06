import http from "http";
import fs from "fs";
import path from "path";

async function server(req, res) {
  try {
    const { method, url, headers } = req;

    const mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
      ".json": "application/json",
    };
    if (url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fs.readFileSync("./dist/index.html"));
      return; //记得res.end后面要结束函数，不然就向下执行了
    }

 
    console.log(decodeURI(url.substring(1)));
    const ext = path.extname(url);

    const contentType = mimeTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });

    res.end(fs.readFileSync("./dist" + url));
  } catch (e) {
    console.log(e.message);
  }
}
http.createServer(server).listen(3000);
console.log("服务启动，地址：http://localhost:3000/");
