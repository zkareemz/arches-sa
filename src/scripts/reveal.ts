// Scroll-reveal: adds [data-revealed] to [data-reveal] elements as they enter view.
// CSS in global.css handles the transition; prefers-reduced-motion reveals instantly.
function initReveal(): void {
  const els = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]"),
  );
  if (els.length === 0) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.setAttribute("data-revealed", ""));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
  );

  els.forEach((el) => {
    // Above-the-fold content stays visible; only enhance offscreen elements.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.setAttribute("data-revealed", "");
    } else {
      observer.observe(el);
      el.setAttribute("data-reveal-pending", "");
    }
  });
}

if (document.readyState !== "loading") {
  initReveal();
} else {
  document.addEventListener("DOMContentLoaded", initReveal);
}
