import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, Check, ImagePlus, Loader2, Phone, Trash2 } from "lucide-react";
import Combobox from "./Combobox";
import { BUSINESS } from "../lib/content";
import { CITY_OPTIONS, FUELS, YEARS } from "../lib/formData";
import { submitLead, type LeadPayload } from "../lib/submitLead";

type Data = Omit<LeadPayload, "photos">;
type FieldKey = keyof Data;

const EMPTY: Data = {
  makeModel: "",
  year: "",
  fuel: "",
  comment: "",
  desiredPrice: "",
  city: "",
  phone: "",
};

/** Laukų eiliškumas – pagal jį šokama prie pirmos klaidos. */
const FIELD_IDS: Record<FieldKey, string> = {
  makeModel: "f-makemodel",
  year: "f-year",
  fuel: "f-fuel",
  comment: "f-comment",
  desiredPrice: "f-price",
  city: "f-city",
  phone: "f-phone",
};
const FIELD_ORDER: FieldKey[] = [
  "makeModel",
  "year",
  "fuel",
  "comment",
  "desiredPrice",
  "city",
  "phone",
];

const MAX_PHOTOS = 8;
const MAX_BYTES = 10 * 1024 * 1024;

export default function ValuationForm() {
  const [data, setData] = useState<Data>(EMPTY);
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [failMsg, setFailMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Peržiūros nuorodos gyvuoja tik tol, kol atviras langas.
  const photosRef = useRef(photos);
  photosRef.current = photos;
  useEffect(
    () => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)),
    [],
  );

  const set = <K extends FieldKey>(k: K, v: Data[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };

  function validate(d: Data): Partial<Record<FieldKey, string>> {
    const e: Partial<Record<FieldKey, string>> = {};
    if (d.makeModel.trim().length < 2) e.makeModel = "Nurodykite markę ir modelį.";
    if (!d.year) e.year = "Pasirinkite metus.";
    if (!d.fuel) e.fuel = "Pasirinkite kuro tipą.";
    if (d.comment.trim().length < 10) e.comment = "Trumpai aprašykite automobilį.";
    if (!d.desiredPrice.trim()) e.desiredPrice = "Nurodykite norimą kainą.";
    else if (!Number.isFinite(Number(d.desiredPrice.replace(/\s/g, ""))))
      e.desiredPrice = "Kaina turi būti skaičius.";
    if (d.city.trim().length < 2) e.city = "Nurodykite miestą.";
    // Ta pati taisyklė kaip api/lead.php – kitaip forma praleistų tai,
    // ką serveris atmestų.
    if (d.phone.replace(/\D/g, "").length < 8 || !/^[0-9+()\s-]{6,20}$/.test(d.phone.trim()))
      e.phone = "Įveskite telefono numerį.";
    return e;
  }

  const addPhotos = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const tooBig = incoming.find((f) => f.size > MAX_BYTES);
    if (tooBig) {
      setPhotoError(`Nuotrauka „${tooBig.name}“ per didelė (iki 10 MB).`);
      return;
    }
    const room = MAX_PHOTOS - photos.length;
    if (room <= 0) {
      setPhotoError(`Daugiausia ${MAX_PHOTOS} nuotraukos.`);
      return;
    }
    setPhotoError(null);
    setPhotos((p) => [
      ...p,
      ...incoming.slice(0, room).map((file) => ({ file, url: URL.createObjectURL(file) })),
    ]);
  };

  const removePhoto = (i: number) => {
    setPhotos((p) => {
      URL.revokeObjectURL(p[i].url);
      return p.filter((_, idx) => idx !== i);
    });
  };

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(data);
    setErrors(e);
    const firstBad = FIELD_ORDER.find((k) => e[k]);
    if (firstBad) {
      // Laukiame, kol React perpieš klaidas, ir tik tada šokame prie pirmos.
      requestAnimationFrame(() => {
        const el = document.getElementById(FIELD_IDS[firstBad]);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      });
      return;
    }
    setStatus("sending");
    setFailMsg("");
    const res = await submitLead({ ...data, photos: photos.map((p) => p.file) });
    if (res.ok) {
      setStatus("done");
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setStatus("failed");
      setFailMsg(res.error);
    }
  }

  return (
    <div ref={rootRef}>
      {status === "done" ? (
        <Success
          onReset={() => {
            setStatus("idle");
            setData(EMPTY);
            setErrors({});
            photos.forEach((p) => URL.revokeObjectURL(p.url));
            setPhotos([]);
          }}
        />
      ) : (
        <form onSubmit={onSubmit} noValidate className="vform">
          <div className="vform-grid grid sm:grid-cols-2">
            <Field n="01" id="f-makemodel" label="Markė ir modelis" error={errors.makeModel} className="sm:col-span-2">
              <input
                id="f-makemodel"
                type="text"
                autoComplete="off"
                enterKeyHint="next"
                placeholder="Pvz. Volkswagen Passat"
                className={`field ${errors.makeModel ? "field-invalid" : ""}`}
                value={data.makeModel}
                onChange={(e) => set("makeModel", e.target.value)}
              />
            </Field>

            <Field n="02" id="f-year" label="Metai" error={errors.year}>
              <select
                id="f-year"
                className={`field ${errors.year ? "field-invalid" : ""}`}
                value={data.year}
                onChange={(e) => set("year", e.target.value)}
              >
                <option value="">Pasirinkite</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
                <option value="1979 ar senesnis">1979 ar senesnis</option>
              </select>
            </Field>

            <Field n="03" id="f-fuel" label="Kuro tipas" error={errors.fuel}>
              <select
                id="f-fuel"
                className={`field ${errors.fuel ? "field-invalid" : ""}`}
                value={data.fuel}
                onChange={(e) => set("fuel", e.target.value)}
              >
                <option value="">Pasirinkite</option>
                {FUELS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              n="04"
              id="f-comment"
              label="Komentaras"
              hint="Būklė, defektai, TA, rida"
              error={errors.comment}
              className="sm:col-span-2"
            >
              <textarea
                id="f-comment"
                rows={2}
                placeholder="Pvz. Rida 248 000 km, TA galioja, nedidelis įbrėžimas gale."
                className={`field min-h-[76px] resize-y py-2.5 leading-relaxed ${
                  errors.comment ? "field-invalid" : ""
                }`}
                value={data.comment}
                onChange={(e) => set("comment", e.target.value)}
              />

              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="vform-photo inline-flex min-h-[44px] items-center gap-2 rounded-full border border-signal/55 bg-signal/12 px-4 text-[13.5px] font-bold text-signal transition-colors hover:border-signal hover:bg-signal/20"
                >
                  <ImagePlus size={16} strokeWidth={2.2} />
                  Pridėti nuotraukas
                  <span className="font-normal text-chalk-faint">neprivaloma</span>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    addPhotos(e.target.files);
                    e.target.value = "";
                  }}
                />
                {photos.length > 0 && (
                  <ul className="mt-2.5 grid grid-cols-5 gap-2 sm:grid-cols-7">
                    {photos.map((p, i) => (
                      <li
                        key={p.url}
                        className="group relative aspect-square overflow-hidden rounded-lg border border-[color-mix(in_oklab,#f4f4f1_11%,transparent)]"
                      >
                        <img src={p.url} alt="" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          aria-label={`Pašalinti ${i + 1} nuotrauką`}
                          className="absolute inset-0 grid place-items-center bg-ink-900/80 text-chalk opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {photoError && <p className="mt-2 text-[13px] text-[#ffb1a0]">{photoError}</p>}
              </div>
            </Field>

            <Field n="05" id="f-price" label="Norima kaina" hint="Orientacinė" error={errors.desiredPrice}>
              <div className="relative">
                <input
                  id="f-price"
                  type="text"
                  inputMode="numeric"
                  enterKeyHint="next"
                  placeholder="Pvz. 4500"
                  className={`field pr-11 ${errors.desiredPrice ? "field-invalid" : ""}`}
                  value={data.desiredPrice}
                  onChange={(e) => set("desiredPrice", e.target.value.replace(/[^\d\s]/g, ""))}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 num text-[15px] text-chalk-faint">
                  €
                </span>
              </div>
            </Field>

            <Field n="06" id="f-city" label="Miestas" error={errors.city}>
              <Combobox
                id="f-city"
                value={data.city}
                onChange={(v) => set("city", v)}
                options={CITY_OPTIONS}
                placeholder="Pvz. Kaunas"
                invalid={!!errors.city}
              />
            </Field>

            <Field n="07" id="f-phone" label="Telefono numeris" error={errors.phone} className="sm:col-span-2">
              <input
                id="f-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                enterKeyHint="send"
                placeholder="+370 6xx xxxxx"
                className={`field ${errors.phone ? "field-invalid" : ""}`}
                value={data.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </Field>
          </div>

          {status === "failed" && (
            <p
              role="alert"
              className="mt-5 flex items-start gap-2 rounded-lg border border-[#ff6b4a]/35 bg-[#ff6b4a]/10 px-3.5 py-3 text-[14px] text-[#ffb1a0]"
            >
              <AlertCircle size={16} className="mt-0.5 flex-none" />
              {failMsg}
            </p>
          )}

          <button type="submit" disabled={status === "sending"} className="btn btn-primary group mt-5 w-full">
            {status === "sending" ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Siunčiama…
              </>
            ) : (
              <>
                Gauti pasiūlymą
                <ArrowRight
                  size={18}
                  strokeWidth={2.4}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </>
            )}
          </button>

          <p className="vform-note mt-2.5 text-center text-[12px] leading-relaxed text-chalk-faint">
            Duomenis naudojame tik automobilio pasiūlymui pateikti.
          </p>
        </form>
      )}
    </div>
  );
}

function Field({
  n,
  id,
  label,
  hint,
  error,
  className = "",
  children,
}: {
  n: string;
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline gap-2.5">
        <span className="label-mono !text-[10px] shrink-0 text-signal/70">{n}</span>
        <span className="shrink-0 whitespace-nowrap font-display text-[14.5px] font-bold tracking-[-0.01em]">
          {label}
        </span>
        {hint && <span className="min-w-0 truncate text-[12.5px] text-chalk-faint">{hint}</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p role="alert" className="mt-1.5 flex items-start gap-1.5 text-[13px] text-[#ffb1a0]">
          <AlertCircle size={14} className="mt-0.5 flex-none" />
          {error}
        </p>
      )}
    </div>
  );
}

function Success({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="py-10 text-center"
      role="status"
    >
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-signal text-ink-900">
        <Check size={30} strokeWidth={3} />
      </div>
      <h2 className="mt-6 text-[clamp(1.5rem,4vw,2rem)]">Ačiū! Jūsų užklausa gauta.</h2>
      <p className="mx-auto mt-3 max-w-[40ch] text-[15.5px] leading-relaxed text-chalk-dim">
        Mūsų komanda susisieks su jumis ir pateiks automobilio pasiūlymą.
      </p>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href={BUSINESS.phoneHref} className="btn btn-primary w-full sm:w-auto">
          <Phone size={17} strokeWidth={2.3} />
          Skambinti MOTIVUS
        </a>
        <button type="button" onClick={onReset} className="btn btn-ghost w-full sm:w-auto">
          Pateikti dar vieną
        </button>
      </div>
    </motion.div>
  );
}
