import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FAQ } from "../lib/content";
import { SectionLabel } from "./ui";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="duk" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 lg:grid-cols-[0.72fr_1fr] lg:gap-20 lg:px-8">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <SectionLabel>DUK</SectionLabel>
          <h2 className="mt-5 text-[clamp(2.1rem,5.6vw,3.3rem)]">
            Dažniausiai
            <br />
            užduodami klausimai
          </h2>
          <p className="mt-5 max-w-[38ch] text-[16.5px] leading-[1.65] text-chalk-dim">
            Neradote atsakymo? Parašykite arba paskambinkite — atsakysime per kelias minutes.
          </p>
        </div>

        <div className="reveal border-t border-[color-mix(in_oklab,#f4f4f1_11%,transparent)]">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-[color-mix(in_oklab,#f4f4f1_11%,transparent)]">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={`font-display text-[clamp(1.05rem,2.6vw,1.3rem)] font-bold leading-snug tracking-[-0.02em] transition-colors duration-200 ${
                        isOpen ? "text-signal" : "text-chalk group-hover:text-signal"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`mt-0.5 grid h-9 w-9 flex-none place-items-center rounded-full border transition-colors duration-200 ${
                        isOpen
                          ? "border-signal bg-signal text-ink-900"
                          : "border-[color-mix(in_oklab,#f4f4f1_20%,transparent)] text-chalk-dim group-hover:border-signal group-hover:text-signal"
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? <Minus size={16} strokeWidth={2.6} /> : <Plus size={16} strokeWidth={2.6} />}
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  hidden={!isOpen}
                  className="grid transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
                >
                  <p className="max-w-[62ch] pb-6 pr-10 text-[15.5px] leading-[1.68] text-chalk-dim">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
