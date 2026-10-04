import { ArrowRight } from "lucide-react";
import { STEPS } from "../lib/content";
import { useFormModal } from "../lib/formModal";
import { SectionLabel } from "./ui";

export default function Process() {
  const { openForm } = useFormModal();
  return (
    <section
      id="kaip-veikia"
      className="relative scroll-mt-20 py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 lg:grid-cols-[0.78fr_1fr] lg:gap-20 lg:px-8">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <SectionLabel>Procesas</SectionLabel>
          <h2 className="mt-5 text-[clamp(2.1rem,5.6vw,3.4rem)]">
            Kaip vyksta
            <br />
            supirkimas?
          </h2>
          <p className="mt-5 max-w-[40ch] text-[16.5px] leading-[1.65] text-chalk-dim">
            Penki žingsniai nuo užklausos iki pinigų sąskaitoje. Visa sunki dalis — mūsų pusėje.
          </p>
          <button type="button" onClick={openForm} className="btn btn-primary group mt-8">
            Pradėti
            <ArrowRight
              size={17}
              strokeWidth={2.4}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>

        <ol className="relative border-t border-[color-mix(in_oklab,#f4f4f1_11%,transparent)]">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className="reveal group relative border-b border-[color-mix(in_oklab,#f4f4f1_11%,transparent)]"
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <span
                className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-signal transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-y-100"
                aria-hidden="true"
              />
              <div className="flex items-baseline gap-5 py-7 pl-4 transition-[padding] duration-300 group-hover:pl-7 sm:gap-8 sm:py-8">
                <span
                  className="flex-none font-display text-[2.1rem] font-black leading-none text-[color-mix(in_oklab,#f4f4f1_22%,transparent)] transition-colors duration-300 group-hover:text-signal sm:text-[2.7rem]"
                >
                  {s.n}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[clamp(1.25rem,3.2vw,1.6rem)]">{s.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-[15.5px] leading-[1.6] text-chalk-dim">
                    {s.text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
