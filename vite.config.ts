import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Puslapis serveruojamas iš domeno šaknies (motivus.lt), todėl keliai – absoliutūs.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    // Teisiniai puslapiai – atskiri HTML įėjimo taškai, kad turėtų realius
    // adresus, savo meta žymas ir būtų indeksuojami be JS maršrutizatoriaus.
    rollupOptions: {
      input: {
        main: "index.html",
        privacy: "privatumo-politika/index.html",
        cookies: "slapuku-politika/index.html",
        terms: "paslaugu-teikimo-salygos/index.html",
      },
    },
  },
});
