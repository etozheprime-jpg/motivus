import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import {
  ALL_OFF,
  ALL_ON,
  applyConsent,
  readConsent,
  saveConsent,
  type ConsentCategories,
} from "../lib/consent";
import { url } from "../lib/url";

type Category = {
  key: keyof ConsentCategories | "necessary";
  title: string;
  text: string;
  locked?: boolean;
};

/** Kategorijos sutampa su Slapukų politikos 2 skyriumi. */
const CATEGORIES: Category[] = [
  {
    key: "necessary",
    title: "Būtinieji",
    text: "Reikalingi svetainės veikimui – formų pateikimui ir jūsų pasirinkimo išsaugojimui. Be jų svetainė tinkamai neveiks.",
    locked: true,
  },
  {
    key: "analytics",
    title: "Analitiniai",
    text: "Padeda suprasti, kaip lankytojai naudojasi svetaine, kad galėtume ją tobulinti.",
  },
  {
    key: "marketing",
    title: "Reklaminiai",
    text: "Leidžia rodyti jūsų interesus atitinkančius skelbimus Google ir Meta tinkluose.",
  },
  {
    key: "functional",
    title: "Funkciniai",
    text: "Išsaugo jūsų pasirinkimus, pavyzdžiui, nustatymus svetainėje.",
  },
];

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [picked, setPicked] = useState<ConsentCategories>(ALL_OFF);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      // Jau pasirinkta – scenarijai paleidžiami pagal išsaugotą sprendimą.
      applyConsent(existing);
      return;
    }
    // Trumpas atidėjimas, kad juosta neužgožtų pirmo įspūdžio.
    const t = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  /** Poraštės nuoroda „Slapukų nustatymai“ atidaro langą iš naujo. */
  useEffect(() => {
    const onOpen = () => {
      const c = readConsent();
      setPicked(
        c
          ? {
              analytics: c.analytics,
              marketing: c.marketing,
              functional: c.functional,
            }
          : ALL_OFF,
      );
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener("motivus:consent-open", onOpen);
    return () => window.removeEventListener("motivus:consent-open", onOpen);
  }, []);

  const decide = useCallback((categories: ConsentCategories) => {
    saveConsent(categories);
    setOpen(false);
    setDetails(false);
  }, []);

  /** Esc = atmesti neprivalomus: tyla negali reikšti sutikimo. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        decide(readConsent() ? picked : ALL_OFF);
      }
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    }, 320);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, picked, decide]);

  const toggle = (k: keyof ConsentCategories) =>
    setPicked((p) => ({ ...p, [k]: !p[k] }));

  if (!open) return null;

  /**
   * Sąmoningai be AnimatePresence išėjimo animacijos: jei ji neužbaigiama
   * (fone atidarytas skirtukas, energijos taupymas, droselinamas rAF),
   * DOM'e liktų nematomas blokas, perimantis paspaudimus. Uždarymas turi
   * būti besąlygiškas, o įėjimo animacijos pakanka.
   */
  return (
    <motion.div
      role="dialog"
      aria-modal="false"
      aria-label="Slapukų nustatymai"
      ref={panelRef}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 bottom-0 z-[80] p-3 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:p-0"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto w-full max-w-[460px] overflow-hidden rounded-panel border border-[color-mix(in_oklab,#f4f4f1_20%,transparent)] bg-ink-800/97 shadow-[0_30px_90px_-25px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:w-[440px]">
        <div className="flex items-start gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 flex-none place-items-center rounded-full bg-signal/14 text-signal"
          >
            <Cookie size={18} strokeWidth={2.2} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[17px] leading-tight tracking-[-0.02em]">
              Slapukai šioje svetainėje
            </h2>
            <p className="mt-2 text-[14px] leading-[1.6] text-chalk-dim">
              Būtinuosius slapukus naudojame, kad svetainė veiktų. Analitinius
              ir reklaminius – tik jums sutikus. Plačiau –{" "}
              <a
                href={url("/slapuku-politika/")}
                className="font-semibold text-signal underline underline-offset-4 hover:no-underline"
              >
                slapukų politikoje
              </a>
              .
            </p>
          </div>
          {readConsent() && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Uždaryti"
              className="grid h-8 w-8 flex-none place-items-center rounded-full border border-[color-mix(in_oklab,#f4f4f1_18%,transparent)] text-chalk-faint transition-colors hover:border-signal hover:text-signal"
            >
              <X size={15} strokeWidth={2.4} />
            </button>
          )}
        </div>

        {details && (
          <div className="mt-4 max-h-[38svh] overflow-y-auto overscroll-contain border-t border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] px-5 sm:px-6">
            {CATEGORIES.map((c) => {
              const on = c.locked
                ? true
                : picked[c.key as keyof ConsentCategories];
              return (
                <div
                  key={c.key}
                  className="border-b border-[color-mix(in_oklab,#f4f4f1_9%,transparent)] py-4 last:border-b-0"
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={on}
                      disabled={c.locked}
                      onChange={() =>
                        !c.locked && toggle(c.key as keyof ConsentCategories)
                      }
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 grid h-5 w-9 flex-none items-center rounded-full border transition-colors ${
                        on
                          ? "border-signal bg-signal/30"
                          : "border-[color-mix(in_oklab,#f4f4f1_24%,transparent)] bg-ink-700"
                      } ${c.locked ? "opacity-55" : ""}`}
                    >
                      <span
                        className={`block h-3.5 w-3.5 rounded-full transition-transform duration-200 ${
                          on
                            ? "translate-x-[18px] bg-signal"
                            : "translate-x-[3px] bg-chalk-faint"
                        }`}
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14.5px] font-bold">
                        {c.title}
                        {c.locked && (
                          <span className="label-mono ml-2 !text-[9.5px] text-chalk-faint">
                            visada įjungti
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-[13.5px] leading-[1.55] text-chalk-dim">
                        {c.text}
                      </span>
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-2 p-5 sm:p-6">
          <div className="grid gap-2 sm:grid-cols-2">
            {/* Atmesti turi būti taip pat lengva, kaip sutikti – to reikalauja BDAR. */}
            <button
              type="button"
              onClick={() => decide(ALL_OFF)}
              className="btn btn-ghost !min-h-[46px] !px-4 !text-[14px]"
            >
              Tik būtinieji
            </button>
            <button
              type="button"
              onClick={() => decide(ALL_ON)}
              className="btn btn-primary !min-h-[46px] !px-4 !text-[14px]"
            >
              Sutinku su visais
            </button>
          </div>
          {details ? (
            <button
              type="button"
              onClick={() => decide(picked)}
              className="btn btn-ghost !min-h-[44px] !border-transparent !px-4 !text-[13.5px] !text-chalk-dim hover:!text-signal"
            >
              Išsaugoti pasirinkimą
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setDetails(true)}
              className="btn btn-ghost !min-h-[44px] !border-transparent !px-4 !text-[13.5px] !text-chalk-dim hover:!text-signal"
            >
              Nustatymai
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
