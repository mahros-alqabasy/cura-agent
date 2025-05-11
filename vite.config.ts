
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";


const isDev = true;
const basename = process.env.VITE_APP_DOMAIN === 'mahros-alqabasy.github.io' ? "/cura-agent/" : "/";




// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: basename,
  server: {
    watch: isDev ? { usePolling: true } : undefined,
    host: "::",
    port: 8080,
    allowedHosts: [
      "53cd302f-2315-4940-9a77-f86cbbe956f0.lovableproject.com",
      ".lovableproject.com"
    ]
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
