// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/boke/", // 关键！改为相对路径,/本地部署改成./  ，而github page要改成/boke/  （当然也可以统一改成/boke）
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]", // 确保路径一致性
      },
    },
  },
});
