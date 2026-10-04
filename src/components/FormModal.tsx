import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ValuationForm from "./ValuationForm";
import { useFormModal } from "../lib/formModal";

export default function FormModal() {
  const { open, closeForm } = useFormModal();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreFocus.current = document.activeElement as HTMLElement | null;

    const { style } = document.body;
    const prevOverflow = style.overflow;
    const prevPad = style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    style.overflow = "hidden";
    if (gap > 0) style.paddingRight = `${gap}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeForm();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      // Fokusas lieka dialogo viduje.
      const items = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLElement>("input, select, textarea")
        ?.focus();
    }, 220);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      style.overflow = prevOverflow;
      style.paddingRight = prevPad;
      restoreFocus.current?.focus?.();
    };
  }, [open, closeForm]);

  if (!open) return null;

  /**
   * Be AnimatePresence išėjimo animacijos. Jei ji neužbaigiama (fone atidarytas
   * skirtukas, energijos taupymas, droselinamas requestAnimationFrame), dialogas
   * liktų DOM'e ir uždengtų visą puslapį. Uždarymas privalo būti besąlygiškas.
   */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
    >
      <div
        onClick={closeForm}
        aria-hidden="true"
        className="absolute inset-0 bg-ink-900/80 backdrop-blur-sm"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Automobilio įvertinimo užklausa"
        initial={{ y: 40, scale: 0.985 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[26px] bg-ink-800 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)] sm:max-h-[90svh] sm:max-w-[640px] sm:rounded-[26px] sm:border sm:border-[color-mix(in_oklab,#f4f4f1_20%,transparent)]"
      >
        <div className="vform-head flex flex-none items-center justify-between gap-4 px-5 pb-3 pt-5 sm:px-7 sm:pt-6">
          <h2 className="text-[clamp(1.25rem,4vw,1.6rem)]">
            Sužinokite automobilio kainą
          </h2>
          <button
            type="button"
            onClick={closeForm}
            aria-label="Uždaryti"
            className="grid h-11 w-11 flex-none place-items-center rounded-full border border-[color-mix(in_oklab,#f4f4f1_20%,transparent)] text-chalk-dim transition-colors hover:border-signal hover:text-signal"
          >
            <X size={19} strokeWidth={2.3} />
          </button>
        </div>

        {/* Mobiliajame – „grabber“, kad būtų aišku, jog langas slenkamas */}
        <div className="mx-auto mb-1 h-1 w-10 flex-none rounded-full bg-[color-mix(in_oklab,#f4f4f1_18%,transparent)] sm:hidden" />

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(20px,env(safe-area-inset-bottom))] sm:px-7 sm:pb-7">
          <ValuationForm />
        </div>
      </motion.div>
    </motion.div>
  );
}
