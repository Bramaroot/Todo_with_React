import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa'

const manifestIcons = [
  {
    src: 'vite.svg',
    sizes: '192x192',
    type: 'image/png',
  },
  {
    src: 'vite.svg',
    sizes: '512x512',
    type: 'image/png',
  }
]
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Todo Brama',
      short_name: 'Todo Brama',
      icons: manifestIcons,
    }
  })],
});
