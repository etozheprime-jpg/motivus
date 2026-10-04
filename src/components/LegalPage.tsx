import { useEffect, useState } from "react";
import { LEGAL } from "../lib/content";
import type { LegalBlock, LegalDoc } from "../lib/legal";
import { FormModalProvider } from "../lib/formModal";
import { url } from "../lib/url";
import FormModal from "./FormModal";
import LegalHeader from "./LegalHeader";
import Footer from "./Footer";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    return <p className="mt-4 text-[16px] leading-[1.7] text-chalk-dim">{block.text}</p>;
  }
  if (block.type === "ul") {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.items.map((it) => (
          <li key={it} className="flex gap-3 text-[16px] leading-[1.7] text-chalk-dim">
            <span aria-hidden="true" className="mt-[11px] h-px w-3 flex-none bg-signal/70" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <address className="mt-4 not-italic">
      {block.lines.map((l) => (
        <span key={l} className="block text-[16px] leading-[1.8] text-chalk-dim">
          {l}
        </span>
      ))}
    </address>
  );
}

/** Aktyvi turinio eilutė seka matomą skyrių. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const onScroll = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

function Article({ doc }: { doc: LegalDoc }) {
  const ids = doc.sections.map((s) => slugify(s.title));
  const active = useActiveSection(ids);

  return (
    <main className="mx-auto max-w-[1320px] px-5 pb-20 pt-14 lg:px-8 lg:pb-28 lg:pt-20">
      <div className="max-w-[760px]">
        <p className="label-mono text-signal/90">Teisinė informacija</p>
        <h1 className="mt-4 text-[clamp(2.1rem,6vw,3.4rem)] leading-[1.03] tracking-[-0.035em]">
          {doc.title}
        </h1>
        <p className="mt-5 num text-[13px] text-chalk-faint">
          Paskutinį kartą atnaujinta: {doc.updated}
        </p>
        <p className="mt-6 max-w-[68ch] text-[17px] leading-[1.68] text-chalk-dim">{doc.intro}</p>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_250px] lg:gap-16">
        <div className="min-w-0 max-w-[760px] lg:order-1">
          {doc.sections.map((section, i) => {
            const id = ids[i];
            return (
              <section
                key={id}
                id={id}
                className="scroll-mt-24 border-t border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] py-10 first:border-t-0 first:pt-0"
              >
                <div className="flex gap-5 sm:gap-7">
                  <span
                    aria-hidden="true"
                    className="num mt-[7px] w-7 flex-none text-[13px] font-extrabold text-signal/80"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[clamp(1.25rem,3vw,1.6rem)] leading-[1.2] tracking-[-0.02em]">
                      {section.title}
                    </h2>
                    {section.blocks.map((b, bi) => (
                      <Block key={bi} block={b} />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[color-mix(in_oklab,#f4f4f1_11%,transparent)] pt-8">
            {LEGAL.filter((l) => !l.href.includes(doc.slug)).map((l) => (
              <a
                key={l.href}
                href={url(l.href)}
                className="text-[15px] font-semibold text-chalk-dim underline-offset-4 transition-colors hover:text-signal hover:underline"
              >
                {l.label} →
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Dokumento turinys" className="hidden lg:order-2 lg:block">
          <div className="lg:sticky lg:top-24">
            <h2 className="label-mono text-chalk-faint">Turinys</h2>
            <ul className="mt-4 space-y-0.5">
              {doc.sections.map((s, i) => {
                const id = ids[i];
                const on = active === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-current={on ? "true" : undefined}
                      className={`flex gap-3 border-l py-1.5 pl-3 text-[14px] leading-[1.45] transition-colors ${
                        on
                          ? "border-signal text-chalk"
                          : "border-[color-mix(in_oklab,#f4f4f1_14%,transparent)] text-chalk-faint hover:border-signal/60 hover:text-chalk-dim"
                      }`}
                    >
                      <span className="num flex-none text-[11.5px] font-bold opacity-70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </main>
  );
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <FormModalProvider>
      <LegalHeader />
      <Article doc={doc} />
      <Footer />
      <FormModal />
    </FormModalProvider>
  );
}
