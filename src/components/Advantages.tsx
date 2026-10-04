import { ADVANTAGES } from "../lib/content";
import { SectionLabel } from "./ui";

/** Asimetriškas 7/5 · 5/7 tinklelis — ne keturios vienodos kortelės. */
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export default function Advantages() {
  return (
    <section id="kodel-motivus" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="reveal max-w-[62ch]">
          <SectionLabel>Kodėl MOTIVUS</SectionLabel>
          <h2 className="mt-5 text-[clamp(2.1rem,5.6vw,3.6rem)]">
            Kodėl verta rinktis MOTIVUS?
          </h2>
          <p className="mt-5 text-[17px] leading-[1.65] text-chalk-dim">
            Greitas, patikimas ir sąžiningas automobilių supirkimas. Pinigus gaunate iškart po
            sutarties, o visus formalumus sutvarkome už jus.
          </p>
        </div>

        <div className="mt-12 grid gap-3 lg:mt-16 lg:grid-cols-12">
          {ADVANTAGES.map((a, i) => (
            <article
              key={a.index}
              className={`reveal group relative overflow-hidden rounded-panel border border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] bg-ink-700/55 p-6 transition-colors duration-300 hover:border-[color-mix(in_oklab,#aeff3f_42%,transparent)] sm:p-8 ${SPANS[i]}`}
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <span
                className="pointer-events-none absolute -top-5 right-5 font-display text-[6.5rem] font-black leading-none text-[color-mix(in_oklab,#f4f4f1_6%,transparent)] transition-colors duration-500 group-hover:text-[color-mix(in_oklab,#aeff3f_16%,transparent)] sm:text-[8rem]"
                aria-hidden="true"
              >
                {a.index}
              </span>
              <div className="relative">
                <span className="label-mono text-signal/80">{a.index}</span>
                <h3 className="mt-3 text-[clamp(1.4rem,3.4vw,1.85rem)]">{a.title}</h3>
                <p className="mt-3 max-w-[48ch] text-[15.5px] leading-[1.6] text-chalk-dim">
                  {a.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
