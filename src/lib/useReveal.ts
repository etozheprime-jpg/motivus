import { useEffect } from "react";

/**
 * Vienas IntersectionObserver visai svetainei.
 *
 * Svarbu: viskas, kas jau matoma ekrane, parodoma iš karto, o ne laukia
 * stebėtojo. Kai kuriose aplinkose (fone atidarytas skirtukas, taupymo režimas)
 * IntersectionObserver iškvietimai droselinami – be šios apsaugos turinys
 * liktų nematomas.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    const show = (el: Element) => el.classList.add("is-in");
    const inView = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    if (!("IntersectionObserver" in window)) {
      els.forEach(show);
      return;
    }

    const pending = els.filter((el) => {
      if (inView(el)) {
        show(el);
        return false;
      }
      return true;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -72px 0px", threshold: 0 },
    );
    pending.forEach((el) => io.observe(el));

    // Atsarginis variantas, jei stebėtojas niekada nesuveikia.
    // Sustoja, kai nebelieka ko rodyti – kitaip intervalas suktųsi visą laiką.
    let left = pending.slice();
    const failsafe = window.setInterval(() => {
      left = left.filter((el) => {
        if (el.classList.contains("is-in")) return false;
        if (inView(el)) {
          show(el);
          return false;
        }
        return true;
      });
      if (!left.length) window.clearInterval(failsafe);
    }, 600);

    return () => {
      io.disconnect();
      window.clearInterval(failsafe);
    };
  }, []);
}
