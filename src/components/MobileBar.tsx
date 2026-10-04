import { useEffect, useState } from "react";
import { Car, Phone } from "lucide-react";
import { BUSINESS } from "../lib/content";
import { useFormModal } from "../lib/formModal";

/** Apatinė fiksuota juosta – mobilus greitasis veiksmas. */
export default function MobileBar() {
  const [show, setShow] = useState(false);
  const { openForm } = useFormModal();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] bg-ink-900/92 backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-3 p-3">
        <a href={BUSINESS.phoneHref} className="btn btn-ghost !min-h-[50px] !px-3 !text-[14.5px]">
          <Phone size={17} strokeWidth={2.2} /> Skambinti
        </a>
        <button
          type="button"
          onClick={openForm}
          className="btn btn-primary !min-h-[50px] !px-3 !text-[14.5px]"
        >
          <Car size={17} strokeWidth={2.2} /> Gauti pasiūlymą
        </button>
      </div>
    </div>
  );
}
