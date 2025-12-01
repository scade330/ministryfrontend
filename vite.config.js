import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  // load env based on mode
  const env = loadEnv(mode, process.cwd(), '')
  console.log('env.VITE_NODE_ENV =', env.VITE_NODE_ENV)

  const API_URL = env.VITE_NODE_ENV === "production"
    ? "https://clinic-backend-flax.vercel.app"
    : "http://localhost:8000"

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": API_URL,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
