import http from "http";
import fs from "fs";
import path from "path";

async function server(req, res) {
  try {
    const { method, url, headers } = req;

    let filePath = decodeURI(url);
    if (filePath === "/") {
      filePath = "/index.html";
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

    res.end(fs.readFileSync("./dist" + filePath));
  } catch (e) {
    console.log(e.message);
  }
}
http.createServer(server).listen(3000);
console.log("服务启动，地址：http://localhost:3000/");
