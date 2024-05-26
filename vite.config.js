import { resolve } from "path";
import { defineConfig } from "vite";
import vitePluginFaviconsInject from "vite-plugin-favicons-inject";

export default defineConfig({
  base: "/atptrmapbeta/",
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        attributions_en: resolve(__dirname, "attributions/en.html"),
        attributions_es: resolve(__dirname, "attributions/es.html"),
        attributions_uk: resolve(__dirname, "attributions/ua.html"),
        arizona_forest: resolve(__dirname, "maps/arizona-forest.html"),
      },
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
  plugins: [vitePluginFaviconsInject("./favicon.ico")],
});
