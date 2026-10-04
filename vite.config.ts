import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Puslapis serveruojamas iš domeno šaknies (motivus.lt), todėl keliai – absoliutūs.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: { target: "es2020" },
});
