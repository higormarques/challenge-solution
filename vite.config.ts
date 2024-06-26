import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslintPlugin from "@nabla/vite-plugin-eslint";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), eslintPlugin()],
    define: {
      'process.env': {
        VITE_JSON_DB_API_URL: env.VITE_JSON_DB_API_URL
      }
    },
    server: {
      port: 3001,
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
  }
});
