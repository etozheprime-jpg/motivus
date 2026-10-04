import { ArrowRight, Phone } from "lucide-react";
import { BUSINESS } from "../lib/content";
import { useFormModal } from "../lib/formModal";

export default function FinalCta() {
  const { openForm } = useFormModal();
  return (
    <section className="relative grain overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 130% at 50% 118%, color-mix(in oklab, #aeff3f 22%, transparent) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1320px] px-5 py-24 text-center lg:px-8 lg:py-32">
        <div className="reveal">
          <span className="label-mono !text-signal">Paskutinis žingsnis</span>
          <h2
            className="mx-auto mt-6 max-w-[20ch] text-[clamp(2.5rem,9vw,6rem)]"
          >
            Laikas parduoti automobilį?
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-chalk-dim sm:text-[18.5px]">
            Gaukite pasiūlymą iš MOTIVUS ir parduokite automobilį be nereikalingų rūpesčių.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={openForm} className="btn btn-primary group w-full !min-h-[56px] !px-8 !text-[16px] sm:w-auto">
              Gauti pasiūlymą
              <ArrowRight
                size={19}
                strokeWidth={2.4}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
            <a
              href={BUSINESS.phoneHref}
              className="btn btn-ghost w-full !min-h-[56px] !px-7 num !text-[16px] !font-semibold sm:w-auto"
            >
              <Phone size={17} strokeWidth={2.2} />
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
