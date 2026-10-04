import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { BUSINESS, NAV } from "../lib/content";
import { useFormModal } from "../lib/formModal";
import Wordmark from "./Wordmark";
import Messengers from "./Messengers";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { openForm } = useFormModal();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={openForm}
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[90] focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:font-bold focus:text-ink-900"
      >
        Pereiti prie užklausos formos
      </button>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid
            ? "border-b border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] bg-ink-900/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-6 px-5 lg:px-8">
          <a href="#pagrindinis" className="group flex items-baseline gap-2" aria-label="MOTIVUS — pagrindinis">
            <Wordmark className="text-[21px] text-chalk [&_svg]:text-signal transition-opacity duration-200 group-hover:opacity-85" />
          </a>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 xl:flex"
            aria-label="Pagrindinė navigacija"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap py-2 text-[14.5px] font-semibold text-chalk-dim transition-colors hover:text-chalk"
              >
                <span className="2xl:hidden">{item.short}</span>
                <span className="hidden 2xl:inline">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={BUSINESS.phoneHref}
              className="hidden items-center gap-2 num text-[14px] font-semibold text-chalk transition-colors hover:text-signal md:flex"
            >
              <Phone size={15} strokeWidth={2.2} className="text-signal" />
              {BUSINESS.phone}
            </a>
            <button
              type="button"
              onClick={openForm}
              className="btn btn-primary hidden !min-h-[46px] !px-5 !text-[14px] sm:inline-flex"
            >
              Gauti pasiūlymą
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Atidaryti meniu"
              className="grid h-12 w-12 place-items-center rounded-full border border-[color-mix(in_oklab,#f4f4f1_20%,transparent)] text-chalk transition-colors hover:border-signal hover:text-signal xl:hidden"
            >
              <Menu size={20} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobilus meniu */}
      <div
        className={`fixed inset-0 z-[60] xl:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink-900/80 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Meniu"
          className={`absolute inset-y-0 right-0 flex w-[min(400px,88vw)] flex-col border-l border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] bg-ink-800 transition-transform duration-[340ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[72px] flex-none items-center justify-between border-b border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] px-5">
            <span className="label-mono">Meniu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Uždaryti meniu"
              className="grid h-12 w-12 place-items-center rounded-full border border-[color-mix(in_oklab,#f4f4f1_20%,transparent)] transition-colors hover:border-signal hover:text-signal"
            >
              <X size={20} strokeWidth={2.2} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-4" aria-label="Mobilioji navigacija">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] py-[18px]"
              >
                <span className="label-mono !text-[10px] text-signal/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[26px] font-extrabold tracking-[-0.03em]">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex-none space-y-3 border-t border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] p-5 pb-8">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openForm();
              }}
              className="btn btn-primary w-full"
            >
              Gauti pasiūlymą
            </button>
            <a href={BUSINESS.phoneHref} className="btn btn-ghost w-full num !font-semibold">
              <Phone size={16} strokeWidth={2.2} /> {BUSINESS.phone}
            </a>
            <Messengers className="justify-center pt-1" />
          </div>
        </div>
      </div>
    </>
  );
}
