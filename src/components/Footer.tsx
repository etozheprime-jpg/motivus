import { Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS, LEGAL, NAV } from "../lib/content";
import Wordmark from "./Wordmark";
import Messengers from "./Messengers";
import { useFormModal } from "../lib/formModal";
import { isHome, url } from "../lib/url";

export default function Footer() {
  const { openForm } = useFormModal();
  // Teisiniuose puslapiuose sekcijų nuorodos turi grąžinti į pagrindinį puslapį.
  const onHome = isHome();
  const sectionHref = (hash: string) => (onHome ? hash : url(hash));
  return (
    <footer
      id="kontaktai"
      className="scroll-mt-20 pb-28 pt-16 lg:pb-16 lg:pt-20"
    >
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark className="text-[24px] text-chalk [&_svg]:text-signal" />
            <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.6] text-chalk-dim">
              Automobilių supirkimas — greitai, patogiai ir sąžiningai visoje Lietuvoje.
            </p>
            <div className="mt-6 flex gap-2">
              {BUSINESS.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[color-mix(in_oklab,#f4f4f1_20%,transparent)] px-4 py-2 text-[13px] font-semibold transition-colors hover:border-signal hover:text-signal"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Puslapio nuorodos">
            <h2 className="label-mono">Svetainė</h2>
            <ul className="mt-3 space-y-0.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={sectionHref(n.href)}
                    className="block py-1.5 text-[15px] text-chalk-dim transition-colors hover:text-signal"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label-mono">Kontaktai</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={BUSINESS.phoneHref}
                  className="flex items-center gap-2.5 num text-[15px] font-semibold transition-colors hover:text-signal"
                >
                  <Phone size={15} className="flex-none text-signal" strokeWidth={2.2} />
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-center gap-2.5 text-[15px] text-chalk-dim transition-colors hover:text-signal"
                >
                  <Mail size={15} className="flex-none text-signal" strokeWidth={2.2} />
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[15px] text-chalk-dim">
                <MapPin size={15} className="mt-1 flex-none text-signal" strokeWidth={2.2} />
                {BUSINESS.address}
              </li>
            </ul>

            <h2 className="label-mono mt-7">Žinutės</h2>
            <Messengers size="sm" className="mt-3" />

            <h2 className="label-mono mt-7">Darbo laikas</h2>
            <ul className="mt-3 space-y-1.5">
              {BUSINESS.hours.map((h) => (
                <li key={h.days} className="flex gap-3 num text-[14px] text-chalk-dim">
                  <span className="w-16 flex-none text-chalk">{h.days}</span>
                  {h.time}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label-mono">Teisinė informacija</h2>
            <ul className="mt-3 space-y-0.5">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <a href={url(l.href)} className="block py-1.5 text-[15px] text-chalk-dim transition-colors hover:text-signal">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <button type="button" onClick={openForm} className="btn btn-primary mt-7 !min-h-[48px] !px-5 !text-[14px]">
              Gauti pasiūlymą
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] pt-6 text-[13px] text-chalk-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            {new Date().getFullYear()} © {BUSINESS.legal}. Visos teisės saugomos.
          </p>
          <p className="num">Automobilių supirkimas Lietuvoje</p>
        </div>
      </div>
    </footer>
  );
}
