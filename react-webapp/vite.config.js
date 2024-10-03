import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType: "autoUpdate",
  includeAssets: ["apple-touch-icon.png", "maskable-icon-512x512.png"],
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: "CNKAV",
    short_name: "CNKAV",
    description: "Different, Social!!!",
    start_url: '/',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
  
      {
        src: "apple-touch-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  base: "/",
  server: {
    host: "0.0.0.0",
    port: 4000,
  },
});

