import { useEffect, useRef, useState, type ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-signal" />
      <span className="label-mono text-signal/90">{children}</span>
    </div>
  );
}

/**
 * Nuotraukos vieta. Kol realios nuotraukos nėra (public/images/…),
 * rodomas brėžinio stiliaus placeholder'is — jį pakeis bet kuris įkeltas failas.
 */
export function PhotoSlot({
  src,
  alt,
  label,
  className = "",
  children,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  children?: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-ink-700 ${className}`}>
      <div className="absolute inset-0 sheen" aria-hidden="true" />
      {children}
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="relative z-[2] h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.06]"
        />
      )}
      {failed && (
        <div className="relative z-[2] flex h-full w-full items-end p-5">
          <span className="label-mono text-chalk-faint">{label}</span>
        </div>
      )}
    </div>
  );
}

/** Skaičiaus animacija nuo 0 iki galutinės reikšmės, kai blokas pasirodo ekrane. */
export function CountUp({
  to,
  suffix = "",
  duration = 1400,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVal(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {val}
      {suffix}
    </span>
  );
}
