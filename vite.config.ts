import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import basicSsl from "@vitejs/plugin-basic-ssl";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ✅ gunakan return jika pakai kurung kurawal
export default defineConfig(({ mode }) => {
  return {
    server: {
      https: true,
      host: "0.0.0.0",
      port: 8080,
    },
    plugins: [
      react(),
      basicSsl(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
