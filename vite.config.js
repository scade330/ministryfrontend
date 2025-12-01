import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Choose API depending on mode/environment
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://clinic-backend-flax.vercel.app/"   // API1 from your domain
    : "https://clinic-backend-flax.vercel.app/"             // Local backend for dev

export default defineConfig({
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
})
