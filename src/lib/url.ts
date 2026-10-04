/**
 * Vidinė nuoroda su teisingu prefiksu.
 *
 * Gamyboje BASE_URL yra "/", o GitHub Pages peržiūroje – "/motivus/",
 * todėl visos vidinės nuorodos turi eiti per šią funkciją.
 */
export function url(path: string): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
}

/** Ar esame pagrindiniame puslapyje (ne teisiniame)? */
export function isHome(): boolean {
  if (typeof window === "undefined") return true;
  return window.location.pathname.replace(/\/$/, "") === import.meta.env.BASE_URL.replace(/\/$/, "");
}
