/**
 * Slapukų sutikimas (BDAR / ePrivacy).
 *
 * Sprendimas saugomas naršyklėje, todėl juosta rodoma tik kartą.
 * Pakeisti pasirinkimą galima bet kada – poraštėje yra „Slapukų nustatymai“.
 *
 * SVARBU: analitikos ir reklamos scenarijai privalo būti paleidžiami TIK
 * gavus sutikimą. Vieta jiems pažymėta funkcijoje applyConsent().
 */

export type ConsentCategories = {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

export type Consent = ConsentCategories & {
  /** Versija – padidinus ji iš naujo paklaus visų lankytojų. */
  v: number;
  ts: string;
};

export const CONSENT_VERSION = 1;
const KEY = "motivus.consent";

export const ALL_ON: ConsentCategories = { analytics: true, marketing: true, functional: true };
export const ALL_OFF: ConsentCategories = { analytics: false, marketing: false, functional: false };

/** Grąžina išsaugotą sutikimą arba null, jei lankytojas dar nesirinko. */
export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (c?.v !== CONSENT_VERSION) return null;
    return c;
  } catch {
    // Privatus langas arba išjungta saugykla – elgiamės taip, lyg nebūtų sutikimo.
    return null;
  }
}

export function saveConsent(categories: ConsentCategories): Consent {
  const c: Consent = { ...categories, v: CONSENT_VERSION, ts: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    // Jei išsaugoti nepavyko, juosta pasirodys kitą kartą – tai saugesnis variantas.
  }
  applyConsent(c);
  window.dispatchEvent(new CustomEvent("motivus:consent", { detail: c }));
  return c;
}

/**
 * Čia įjungiami scenarijai pagal lankytojo pasirinkimą.
 *
 * Kol kas svetainėje nėra nei Google Analytics, nei Meta Pixel – todėl
 * funkcija nieko nedaro. Prijungiant juos, kodą rašykite TIK čia, kad
 * sutikimas būtų tikrai gerbiamas.
 *
 * Pavyzdys:
 *   if (c.analytics) loadScript("https://www.googletagmanager.com/gtag/js?id=G-XXXX");
 *   if (c.marketing) loadMetaPixel("1977964182985464");
 */
export function applyConsent(c: ConsentCategories): void {
  // Google Consent Mode v2 – jei kada bus prijungtas gtag, jis perims šias reikšmes.
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "consent_update",
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
    functionality_storage: c.functional ? "granted" : "denied",
  });
}

/** Atidaro nustatymų langą iš bet kurios vietos (poraštės nuorodos). */
export function openConsentSettings(): void {
  window.dispatchEvent(new Event("motivus:consent-open"));
}
