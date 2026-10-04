import { Star } from "lucide-react";
import { REVIEWS } from "../lib/content";
import { SectionLabel } from "./ui";

export default function Reviews() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="reveal max-w-[56ch]">
          <SectionLabel>Atsiliepimai</SectionLabel>
          <h2 className="mt-5 text-[clamp(2.1rem,5.6vw,3.5rem)]">
            MOTIVUS renkasi žmonės, kurie vertina laiką
          </h2>
        </div>

        <div className="mt-12 grid gap-3 lg:mt-16 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <figure
              key={r.name}
              className="reveal flex flex-col rounded-panel border border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] bg-ink-700/55 p-6 sm:p-7"
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <div className="flex gap-1" aria-label="Penkios žvaigždutės iš penkių">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={15} className="fill-signal text-signal" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-[16px] leading-[1.68] text-chalk">
                „{r.text}“
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] pt-5">
                <span
                  className="grid h-10 w-10 flex-none place-items-center rounded-full bg-signal/14 font-display text-[15px] font-extrabold text-signal"
                  aria-hidden="true"
                >
                  {r.name.slice(0, 1)}
                </span>
                <span>
                  <span className="block text-[15px] font-bold">{r.name}</span>
                  <span className="label-mono !text-[10px]">{r.city}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
