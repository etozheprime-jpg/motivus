import { ArrowRight, Phone, Truck } from "lucide-react";
import { BUSINESS } from "../lib/content";
import { useFormModal } from "../lib/formModal";

const POINTS = [
  "Po avarijos ir su kėbulo defektais",
  "Su variklio ar elektronikos gedimais",
  "Be galiojančios techninės apžiūros",
  "Visiškai nevažiuojančios transporto priemonės",
];

export default function NonRunning() {
  const { openForm } = useFormModal();
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 120% at 100% 0%, color-mix(in oklab, #ff5a3c 10%, transparent) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 py-20 lg:grid-cols-[1fr_0.92fr] lg:gap-16 lg:px-8 lg:py-28">
        <div className="reveal">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-signal/14 text-signal">
              <Truck size={18} strokeWidth={2.2} />
            </span>
            <span className="label-mono">Sudėtingi atvejai</span>
          </div>

          <h2 className="mt-6 text-[clamp(2.1rem,6vw,3.7rem)]">
            Automobilis nevažiuoja?
            <br />
            <span className="text-signal">Tai ne problema.</span>
          </h2>

          <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-chalk-dim">
            Superkame automobilius po avarijų, su techniniais ar kėbulo defektais, be galiojančios
            techninės apžiūros ir net visiškai nevažiuojančias transporto priemones. Atvykstame
            patys ir pasirūpiname išgabenimu.
          </p>

          <ul className="mt-8 grid gap-0 border-t border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] sm:grid-cols-2">
            {POINTS.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 border-b border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] py-3.5 pr-4 text-[15px] text-chalk"
              >
                <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-signal" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={openForm} className="btn btn-primary group">
              Parduoti automobilį
              <ArrowRight
                size={18}
                strokeWidth={2.4}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
            <a href={BUSINESS.phoneHref} className="btn btn-ghost num !font-semibold">
              <Phone size={16} strokeWidth={2.2} />
              {BUSINESS.phone}
            </a>
          </div>
        </div>

        {/* Pažeisto automobilio brėžinys — be nemalonių vaizdų */}
        <div className="reveal" style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
          <div className="relative overflow-hidden rounded-panel border border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] bg-ink-700/45 p-7 sm:p-9">
            <div className="absolute inset-0 sheen" aria-hidden="true" />
            <svg viewBox="0 0 560 260" className="relative w-full" aria-hidden="true">
              <path
                d="M40 196 C34 170 44 154 70 146 L158 124 C194 76 240 56 294 58 L372 60
                   C410 64 436 78 462 106 L524 124 C548 132 556 150 556 172 L556 190 L40 190 Z"
                fill="none"
                stroke="#f4f4f1"
                strokeOpacity="0.3"
                strokeWidth="1.8"
              />
              <path
                d="M188 136 L358 128 L428 166 L128 176 Z"
                fill="none"
                stroke="#f4f4f1"
                strokeOpacity="0.16"
                strokeWidth="1.4"
              />
              {/* Pažeidimo zona priekyje */}
              <path
                d="M462 106 L492 84 M478 122 L516 110 M444 88 L456 64 M506 140 L540 136"
                stroke="#ff5a3c"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeOpacity="0.9"
              />
              <circle cx="492" cy="112" r="46" fill="#ff5a3c" fillOpacity="0.07" />
              <circle
                cx="492"
                cy="112"
                r="46"
                fill="none"
                stroke="#ff5a3c"
                strokeOpacity="0.4"
                strokeDasharray="5 6"
                strokeWidth="1.4"
              />
              {[172, 452].map((cx) => (
                <g key={cx}>
                  <circle cx={cx} cy={190} r="36" fill="none" stroke="#f4f4f1" strokeOpacity="0.26" strokeWidth="1.6" />
                  <circle cx={cx} cy={190} r="15" fill="none" stroke="#aeff3f" strokeOpacity="0.55" strokeWidth="1.6" />
                </g>
              ))}
              <path d="M20 230 L540 230" stroke="#aeff3f" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="2 10" />
            </svg>
            <div className="relative mt-5 flex items-center justify-between gap-4 border-t border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] pt-5">
              <span className="label-mono">Išgabenimas</span>
              <span className="text-[14.5px] font-semibold text-chalk">Įskaičiuotas į pasiūlymą</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
