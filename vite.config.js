// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/boke/", // 关键！改为相对路径,/本地部署改成./  ，而github page要改成/boke/  （当然也可以统一改成/boke/）
  build: {
    outDir: "dist",
    assetsDir: "src",
    emptyOutDir: true, // 构建前清空目录
    
  },
});
