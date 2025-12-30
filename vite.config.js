import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load environment variables based on mode (development/production)
  const env = loadEnv(mode, process.cwd(), '');
  
  // Determine API URL based on environment
  const API_URL = env.VITE_NODE_ENV === "production"
    ? "https://clinic2-backend.vercel.app"  // your deployed backend
    : "http://localhost:8000";              // local backend

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        // Forward frontend /api requests to backend URL
        "/api": {
          target: API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
