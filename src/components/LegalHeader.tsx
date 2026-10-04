import { ArrowLeft, Phone } from "lucide-react";
import { BUSINESS } from "../lib/content";
import { useFormModal } from "../lib/formModal";
import { url } from "../lib/url";
import Wordmark from "./Wordmark";

/** Supaprastinta antraštė teisiniams puslapiams – be sekcijų navigacijos. */
export default function LegalHeader() {
  const { openForm } = useFormModal();
  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] bg-ink-900/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-5 px-5 lg:px-8">
        <a href={url("/")} className="group flex items-center gap-4" aria-label="MOTIVUS — pagrindinis">
          <Wordmark className="text-[21px] text-chalk [&_svg]:text-signal transition-opacity duration-200 group-hover:opacity-85" />
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={url("/")}
            className="hidden items-center gap-2 text-[14px] font-semibold text-chalk-dim transition-colors hover:text-signal sm:inline-flex"
          >
            <ArrowLeft size={15} strokeWidth={2.4} /> Į pradžią
          </a>
          {/* Siaurame ekrane telefonas – tik ikona, kad antraštė tilptų. */}
          <a
            href={BUSINESS.phoneHref}
            aria-label={`Skambinti ${BUSINESS.phone}`}
            className="grid h-[46px] w-[46px] flex-none place-items-center rounded-full border border-[color-mix(in_oklab,#f4f4f1_20%,transparent)] text-chalk transition-colors hover:border-signal hover:text-signal sm:hidden"
          >
            <Phone size={18} strokeWidth={2.2} />
          </a>
          <a
            href={BUSINESS.phoneHref}
            className="btn btn-ghost hidden !min-h-[46px] !px-5 !text-[14px] sm:inline-flex"
          >
            Skambinti
          </a>
          <button
            type="button"
            onClick={openForm}
            className="btn btn-primary !min-h-[46px] whitespace-nowrap !px-4 !text-[13.5px] sm:!px-5 sm:!text-[14px]"
          >
            Gauti pasiūlymą
          </button>
        </div>
      </div>
    </header>
  );
}
