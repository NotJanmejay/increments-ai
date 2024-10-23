import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export const HOST = "http://localhost:8000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://increments.msbctechnologies.ai",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
