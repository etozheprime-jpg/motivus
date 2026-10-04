import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serveris talpina puslapį pakatalogyje, todėl keliai – reliatyvūs.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: { target: "es2020" },
});
