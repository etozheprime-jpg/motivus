import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Phone, Play, Volume2, VolumeX } from "lucide-react";
import { BUSINESS } from "../lib/content";
import Messengers from "./Messengers";
import { useFormModal } from "../lib/formModal";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { openForm } = useFormModal();

  /**
   * Taupymo režimu ar lėtu ryšiu 8,5 MB vaizdo įrašo neatsisiunčiame —
   * rodome tik pirmą kadrą (poster), o paleisti galima mygtuku.
   */
  const [lowData] = useState(() => {
    if (typeof navigator === "undefined") return false;
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    return Boolean(c?.saveData) || /^(slow-)?2g$/.test(c?.effectiveType ?? "");
  });

  useEffect(() => {
    const v = videoRef.current;
    if (!v || lowData) return;
    // Autoplay leidžiamas tik be garso – todėl garsą įjungia pats lankytojas.
    v.muted = true;
    const start = () => {
      if (!document.hidden) v.play().catch(() => undefined);
    };
    start();
    // iOS kartais sustabdo įrašą grįžus į skirtuką
    document.addEventListener("visibilitychange", start);
    return () => document.removeEventListener("visibilitychange", start);
  }, [lowData]);

  const onVideoButton = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!playing) {
      // Pirmas paspaudimas taupymo režimu – tiesiog paleidžia įrašą (be garso).
      v.muted = true;
      setMuted(true);
      v.play().catch(() => undefined);
      return;
    }
    const next = !muted;
    v.muted = next;
    if (!next) v.play().catch(() => undefined);
    setMuted(next);
  };

  return (
    <section
      id="pagrindinis"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-7 pt-[96px] sm:pb-9 lg:pb-10 lg:pt-[112px]"
    >
      <video
        ref={videoRef}
        className={`absolute inset-0 -z-20 h-full w-full bg-ink-900 object-cover object-[58%_center] saturate-[0.9] transition-opacity duration-500 ${
          ready || lowData ? "opacity-100" : "opacity-70"
        }`}
        src={`${import.meta.env.BASE_URL}hero.mp4`}
        poster={`${import.meta.env.BASE_URL}images/hero-poster.jpg`}
        autoPlay={!lowData}
        loop
        muted
        playsInline
        preload={lowData ? "none" : "metadata"}
        onCanPlay={() => setReady(true)}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        tabIndex={-1}
      />

      {/* Tamsinimas, kad tekstas liktų skaitomas bet kuriame kadre */}
      <div className="absolute inset-0 -z-10 bg-ink-900/58" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(100deg, var(--color-ink-900) 0%, color-mix(in oklab, #0a0b0d 80%, transparent) 42%, color-mix(in oklab, #0a0b0d 35%, transparent) 78%, color-mix(in oklab, #0a0b0d 25%, transparent) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Perėjimas į puslapio foną – be matomos siūlės */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-48"
        style={{ background: "linear-gradient(to top, var(--color-ink-800), transparent)" }}
        aria-hidden="true"
      />

      {/* Tekstas – centre ekrano */}
      <div className="relative flex flex-1 items-center justify-center px-5 lg:px-8">
        <div className="mx-auto w-full max-w-[1320px]">
          <h1 className="reveal max-w-[18ch] text-[clamp(2.1rem,6vw,4.2rem)] drop-shadow-[0_2px_28px_rgba(0,0,0,0.7)]">
            Parduokite automobilį greitai.
            <br />
            <span className="text-signal">Gaukite sąžiningą kainą.</span>
          </h1>

          <p
            className="reveal mt-6 max-w-[52ch] text-[16.5px] leading-[1.6] text-chalk-dim sm:text-[18px]"
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
          >
            Įvertiname automobilį per kelias minutes, sutvarkome visus formalumus ir pasirūpiname
            išgabenimu. Superkame tvarkingus, su defektais, daužtus ir nevažiuojančius.
          </p>
        </div>
      </div>

      {/* Veiksmai – apatinėje ekrano dalyje, centre */}
      <div className="relative flex flex-none flex-col items-center gap-4 px-5 lg:px-8">
        <div
          className="reveal flex w-full max-w-[460px] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
          style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
        >
          <button type="button" onClick={openForm} className="btn btn-ghost group !bg-ink-900/55 backdrop-blur-md">
            Pildyti užklausą
            <ArrowRight
              size={18}
              strokeWidth={2.4}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
          <a href={BUSINESS.phoneHref} className="btn btn-primary">
            <Phone size={18} strokeWidth={2.4} />
            Skambinti dabar
          </a>
        </div>

        <Messengers
          className="reveal justify-center"
          style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
        />

        <a
          href="#kodel-motivus"
          aria-label="Slinkti žemyn"
          className="mt-1 hidden text-chalk-faint transition-colors hover:text-signal [@media(min-height:760px)]:block"
        >
          <ChevronDown size={22} strokeWidth={2.2} className="animate-bounce" />
        </a>
      </div>

      {/* Garso jungiklis */}
      <button
        type="button"
        onClick={onVideoButton}
        aria-pressed={playing ? !muted : undefined}
        aria-label={
          !playing
            ? "Paleisti vaizdo įrašą"
            : muted
              ? "Įjungti vaizdo įrašo garsą"
              : "Išjungti vaizdo įrašo garsą"
        }
        className="absolute bottom-5 left-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-[color-mix(in_oklab,#f4f4f1_22%,transparent)] bg-ink-900/60 text-chalk-dim backdrop-blur-md transition-colors hover:border-signal hover:text-signal lg:bottom-8 lg:left-8 lg:h-12 lg:w-12"
      >
        {!playing ? (
          <Play size={18} strokeWidth={2.2} />
        ) : muted ? (
          <VolumeX size={18} strokeWidth={2.2} />
        ) : (
          <Volume2 size={18} strokeWidth={2.2} />
        )}
      </button>
    </section>
  );
}
