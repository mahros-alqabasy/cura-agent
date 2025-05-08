
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";


const isDev = true;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/cura-agent/',
  server: {
    watch: isDev ? { usePolling: true } : undefined,
    host: "::",
    port: 8080,
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
