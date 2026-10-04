import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LegalPage from "./components/LegalPage";
import { LEGAL_DOCS } from "./lib/legal";
import "./styles.css";

// Kiekvienas teisinis HTML failas nurodo savo dokumentą per data-doc atributą.
const slug = document.body.dataset.doc ?? "";
const doc = LEGAL_DOCS[slug];

if (!doc) {
  window.location.replace(import.meta.env.BASE_URL);
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <LegalPage doc={doc} />
    </StrictMode>,
  );
}
