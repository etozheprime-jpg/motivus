import { CITIES, LT_PATH } from "../lib/content";
import { CountUp, SectionLabel } from "./ui";

export default function Coverage() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-5 lg:grid-cols-[0.9fr_1fr] lg:gap-20 lg:px-8">
        <div className="reveal">
          <SectionLabel>Geografija</SectionLabel>
          <h2 className="mt-5 text-[clamp(2.1rem,5.6vw,3.5rem)]">Dirbame visoje Lietuvoje</h2>
          <p className="mt-5 max-w-[46ch] text-[16.5px] leading-[1.65] text-chalk-dim">
            Atvykstame į jūsų nurodytą vietą — didmiestyje ar mažesniame mieste. Jums nereikia
            niekur važiuoti ir niekuo rūpintis.
          </p>

          <div className="mt-9 grid grid-cols-2 gap-x-6 border-t border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] sm:grid-cols-3">
            {CITIES.map((c) => (
              <div
                key={c.name}
                className="border-b border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] py-3.5 text-[15.5px] font-semibold"
              >
                {c.name}
              </div>
            ))}
            <div className="border-b border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] py-3.5 text-[15.5px] font-semibold text-signal">
              …ir kiti miestai
            </div>
          </div>

          <div className="mt-9 flex items-baseline gap-4">
            <span
              className="font-display text-[clamp(2.6rem,7vw,4rem)] font-black leading-none text-signal"
            >
              <CountUp to={400} suffix="+" />
            </span>
            <span className="max-w-[18ch] text-[14.5px] leading-tight text-chalk-dim">
              supirktų automobilių visoje Lietuvoje
            </span>
          </div>
        </div>

        <div className="reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <div className="relative overflow-hidden rounded-panel border border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] bg-ink-700/45 p-6 sm:p-10">
            <div className="absolute inset-0 sheen" aria-hidden="true" />
            <svg
              viewBox="-18 -18 221 175"
              className="relative w-full"
              role="img"
              aria-label="Lietuvos žemėlapis su miestais, kuriuose teikiame paslaugas"
            >
              <defs>
                <linearGradient id="ltFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#aeff3f" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#aeff3f" stopOpacity="0.04" />
                </linearGradient>
              </defs>
              <path d={LT_PATH} fill="url(#ltFill)" stroke="#aeff3f" strokeOpacity="0.55" strokeWidth="1.2" />
              {CITIES.map((c, i) => (
                <g key={c.name}>
                  <circle cx={c.x} cy={c.y} r="3" fill="#aeff3f">
                    <animate
                      attributeName="r"
                      values="3;4.4;3"
                      dur="2.6s"
                      begin={`${i * 0.42}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx={c.x} cy={c.y} r="3" fill="none" stroke="#aeff3f" strokeOpacity="0.5" strokeWidth="0.8">
                    <animate
                      attributeName="r"
                      values="3;13"
                      dur="2.6s"
                      begin={`${i * 0.42}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-opacity"
                      values="0.5;0"
                      dur="2.6s"
                      begin={`${i * 0.42}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text
                    x={c.x + (c.name === "Vilnius" ? -6 : 6)}
                    y={c.y - 6}
                    textAnchor={c.name === "Vilnius" ? "end" : "start"}
                    fill="#f4f4f1"
                    fillOpacity="0.85"
                    style={{ font: "600 7px Manrope, sans-serif", letterSpacing: "0.02em" }}
                  >
                    {c.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
