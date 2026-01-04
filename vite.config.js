import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log('VITE_NODE_ENV =', env.VITE_NODE_ENV);
  console.log('VITE_API_URL =', env.VITE_API_URL);

  return {
    base: "./", // relative paths for assets
    plugins: [react(), tailwindcss()],
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    server: {
      proxy: env.VITE_NODE_ENV === "development" ? {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false
        }
      } : undefined
    },
    define: { __API_URL__: JSON.stringify(env.VITE_API_URL) }
  };
});