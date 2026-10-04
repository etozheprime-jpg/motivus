import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

/** Paieška + pasirinkimas viename. Leidžia įvesti ir savo variantą. */
export default function Combobox({
  value,
  onChange,
  options,
  placeholder,
  invalid,
  id,
  allowCustom = true,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  invalid?: boolean;
  id: string;
  allowCustom?: boolean;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrap = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => setQuery(value), [value]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    const hits = options.filter((o) => o.toLowerCase().includes(q));
    // Tikslus sutapimas – rodome visą sąrašą, kad būtų galima persigalvoti.
    return hits.length === 1 && hits[0].toLowerCase() === q ? options : hits;
  }, [query, options]);

  // Aktyvus elementas visada matomas slenkant klaviatūra.
  useEffect(() => {
    if (active < 0 || !listRef.current) return;
    listRef.current.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const pick = (o: string) => {
    onChange(o);
    setQuery(o);
    setOpen(false);
    setActive(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      // Kai sąrašas atidarytas, Esc uždaro tik jį – ne visą dialogą.
      if (open) e.stopPropagation();
      setOpen(false);
      setActive(-1);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (!filtered.length) return;
      const dir = e.key === "ArrowDown" ? 1 : -1;
      setActive((a) => (a + dir + filtered.length) % filtered.length);
      return;
    }
    if (e.key === "Enter" && open && active >= 0 && filtered[active]) {
      e.preventDefault();
      pick(filtered[active]);
    }
  };

  return (
    <div ref={wrap} className="relative">
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-autocomplete="list"
        aria-activedescendant={open && active >= 0 ? `${id}-opt-${active}` : undefined}
        autoComplete="off"
        className={`field pr-12 ${invalid ? "field-invalid" : ""}`}
        placeholder={placeholder}
        value={query}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(-1);
          if (allowCustom) onChange(e.target.value);
        }}
      />
      <ChevronDown
        size={17}
        className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-chalk-dim transition-transform duration-200 ${
          open ? "-rotate-180" : ""
        }`}
      />

      {open && filtered.length > 0 && (
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          className="absolute z-30 mt-2 max-h-[248px] w-full overflow-y-auto rounded-xl border border-[color-mix(in_oklab,#f4f4f1_20%,transparent)] bg-ink-600 p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]"
        >
          {filtered.map((o, i) => (
            <li key={o}>
              <button
                type="button"
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={o === value}
                tabIndex={-1}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(o)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-[15px] font-medium transition-colors ${
                  i === active ? "bg-signal/12 text-signal" : ""
                }`}
              >
                {o}
                {o === value && <Check size={16} className="text-signal" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
