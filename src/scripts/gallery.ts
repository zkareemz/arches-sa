// Projects gallery: randomises each category card's cover photo on every load,
// and drives the full-screen lightbox (open/close, prev/next looping within a
// single category, dots, thumbnail strip, counter, swipe, keyboard, fullscreen,
// neighbour preloading). Reads the model emitted as #gallery-data by
// ProjectsCarousel.astro.
//
// The viewer is a plain fixed <div> overlay (not a modal <dialog>): Chromium /
// Brave close a top-layer modal dialog when any element enters fullscreen, so a
// modal dialog and the Fullscreen API cannot coexist. A normal overlay lets us
// fullscreen it directly while it stays open. CSS lives in global.css; mirrors
// the reveal.ts pattern.

interface Photo {
  full: string;
  thumb: string;
  width: number;
  height: number;
  alt: string;
}

interface Category {
  slug: string;
  title: string;
  photos: Photo[];
}

interface FsElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void> | void;
}
interface FsDocument extends Document {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
}

const SWIPE_THRESHOLD = 40; // px

function initGallery(): void {
  const dataEl = document.getElementById("gallery-data");
  if (!dataEl?.textContent) return;

  let categories: Category[];
  try {
    categories = JSON.parse(dataEl.textContent);
  } catch {
    return;
  }
  if (!categories.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const cards = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-cat-index]"),
  );

  // --- 1. Randomise each card's cover photo (client-side → changes each load) ---
  for (const card of cards) {
    const cat = categories[Number(card.dataset.catIndex)];
    const img = card.querySelector<HTMLImageElement>("img[data-random]");
    if (!cat?.photos.length || !img) continue;

    const pick = Math.floor(Math.random() * cat.photos.length);
    const photo = cat.photos[pick];
    img.src = photo.thumb;
    img.srcset = `${photo.thumb} 480w, ${photo.full} 1920w`;
    img.alt = photo.alt;
    // Open the lightbox on the same photo the card is showing.
    card.dataset.coverIndex = String(pick);
  }

  // --- 2. Lightbox ----------------------------------------------------------
  const overlay = document.getElementById("gallery-lightbox");
  if (!overlay) return;

  const stage = overlay.querySelector<HTMLImageElement>("[data-stage]");
  const counter = overlay.querySelector<HTMLElement>("[data-counter]");
  const titleEl = overlay.querySelector<HTMLElement>("[data-title]");
  const dotsWrap = overlay.querySelector<HTMLElement>("[data-dots]");
  const thumbsWrap = overlay.querySelector<HTMLElement>("[data-thumbs]");
  const btnPrev = overlay.querySelector<HTMLButtonElement>("[data-prev]");
  const btnNext = overlay.querySelector<HTMLButtonElement>("[data-next]");
  const btnClose = overlay.querySelector<HTMLButtonElement>("[data-close]");
  const stageArea = overlay.querySelector<HTMLElement>("[data-close-area]");

  if (
    !stage ||
    !counter ||
    !titleEl ||
    !dotsWrap ||
    !thumbsWrap ||
    !btnPrev ||
    !btnNext ||
    !btnClose ||
    !stageArea
  ) {
    return;
  }

  let current: Category | null = null;
  let index = 0;
  let trigger: HTMLElement | null = null;
  let isOpen = false;

  const preload = (src: string) => {
    const img = new Image();
    img.src = src;
  };

  const render = () => {
    if (!current) return;
    const n = current.photos.length;
    const photo = current.photos[index];

    stage.src = photo.full;
    stage.alt = photo.alt;
    stage.width = photo.width;
    stage.height = photo.height;
    counter.textContent = `${index + 1} / ${n}`;

    dotsWrap
      .querySelectorAll<HTMLElement>("[data-dot]")
      .forEach((dot, i) =>
        dot.setAttribute("aria-current", i === index ? "true" : "false"),
      );

    thumbsWrap
      .querySelectorAll<HTMLElement>("[data-thumb]")
      .forEach((thumb, i) => {
        const active = i === index;
        thumb.setAttribute("aria-current", active ? "true" : "false");
        if (active) {
          thumb.scrollIntoView({
            inline: "center",
            block: "nearest",
            behavior: reduceMotion ? "auto" : "smooth",
          });
        }
      });

    // Prefetch neighbours so prev/next feel instant.
    preload(current.photos[(index + 1) % n].full);
    preload(current.photos[(index - 1 + n) % n].full);
  };

  const buildChrome = () => {
    if (!current) return;
    dotsWrap.innerHTML = current.photos
      .map(
        (_, i) =>
          `<button type="button" data-dot data-i="${i}" aria-label="Go to photo ${i + 1}" class="gallery-dot"></button>`,
      )
      .join("");

    thumbsWrap.innerHTML = current.photos
      .map(
        (photo, i) =>
          `<button type="button" data-thumb data-i="${i}" aria-label="Photo ${i + 1}" class="gallery-thumb"><img src="${photo.thumb}" alt="" loading="lazy" decoding="async" /></button>`,
      )
      .join("");
  };

  // --- Fullscreen helpers (applied to the overlay itself) ---
  const fsDoc = document as FsDocument;
  const fsTarget = overlay as FsElement;
  const swallow = (res: Promise<void> | void) => {
    if (res && typeof (res as Promise<void>).catch === "function") {
      (res as Promise<void>).catch((err) =>
        console.warn("[gallery] fullscreen toggle failed:", err),
      );
    }
  };
  const fsElement = () =>
    document.fullscreenElement ?? fsDoc.webkitFullscreenElement ?? null;
  const fsSupported = !!(
    fsTarget.requestFullscreen || fsTarget.webkitRequestFullscreen
  );
  const enterFs = () =>
    swallow(
      (fsTarget.requestFullscreen ?? fsTarget.webkitRequestFullscreen)?.call(
        fsTarget,
      ),
    );
  const exitFs = () =>
    swallow(
      (document.exitFullscreen ?? fsDoc.webkitExitFullscreen)?.call(document),
    );

  const open = (catIndex: number, startIndex: number) => {
    const cat = categories[catIndex];
    if (!cat?.photos.length) return;

    current = cat;
    index = Math.min(Math.max(startIndex, 0), cat.photos.length - 1);
    titleEl.textContent = cat.title;
    buildChrome();
    render();

    trigger = document.activeElement as HTMLElement;
    overlay.setAttribute("data-open", "");
    document.body.style.overflow = "hidden";
    isOpen = true;
    btnClose.focus();
  };

  const close = () => {
    if (!isOpen) return;
    if (fsElement()) exitFs();
    overlay.removeAttribute("data-open");
    document.body.style.overflow = "";
    stage.removeAttribute("src"); // release the full-res image
    current = null;
    isOpen = false;
    if (trigger && typeof trigger.focus === "function") trigger.focus();
    trigger = null;
  };

  const go = (delta: number) => {
    if (!current) return;
    const n = current.photos.length;
    index = (index + delta + n) % n;
    render();
  };

  // --- wiring ---
  for (const card of cards) {
    card.addEventListener("click", () =>
      open(
        Number(card.dataset.catIndex),
        Number(card.dataset.coverIndex ?? 0) || 0,
      ),
    );
  }

  btnPrev.addEventListener("click", () => go(-1));
  btnNext.addEventListener("click", () => go(1));
  btnClose.addEventListener("click", () => close());

  // Fullscreen toggle (hidden when the API is unavailable, e.g. iOS Safari).
  const btnFull = overlay.querySelector<HTMLButtonElement>("[data-fullscreen]");
  const fsEnterIcon = overlay.querySelector<HTMLElement>("[data-fs-enter]");
  const fsExitIcon = overlay.querySelector<HTMLElement>("[data-fs-exit]");
  if (btnFull) {
    if (!fsSupported) {
      btnFull.hidden = true;
    } else {
      const syncFsUi = () => {
        const active = !!fsElement();
        btnFull.setAttribute(
          "aria-label",
          active ? "Exit full screen" : "Full screen",
        );
        if (fsEnterIcon) fsEnterIcon.hidden = active;
        if (fsExitIcon) fsExitIcon.hidden = !active;
      };
      btnFull.addEventListener("click", () =>
        fsElement() ? exitFs() : enterFs(),
      );
      document.addEventListener("fullscreenchange", syncFsUi);
      document.addEventListener("webkitfullscreenchange", syncFsUi);
      syncFsUi();
    }
  }

  dotsWrap.addEventListener("click", (e) => {
    const dot = (e.target as HTMLElement).closest<HTMLElement>("[data-dot]");
    if (!dot) return;
    index = Number(dot.dataset.i);
    render();
  });

  thumbsWrap.addEventListener("click", (e) => {
    const thumb = (e.target as HTMLElement).closest<HTMLElement>(
      "[data-thumb]",
    );
    if (!thumb) return;
    index = Number(thumb.dataset.i);
    render();
  });

  // Keyboard — gated by open state (the overlay is not a modal, so listen on
  // document): Esc closes, arrows navigate (RTL-aware), Tab is trapped inside.
  document.addEventListener("keydown", (e) => {
    if (!isOpen) return;

    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }

    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      // Match the visual thumbnail flow: in RTL, ArrowLeft advances (next), so
      // arrow direction always tracks the on-screen order in both directions.
      const rtl = getComputedStyle(overlay).direction === "rtl";
      const forward = rtl ? e.key === "ArrowLeft" : e.key === "ArrowRight";
      go(forward ? 1 : -1);
      return;
    }

    if (e.key === "Tab") {
      const focusable = Array.from(
        overlay.querySelectorAll<HTMLElement>(
          "button:not([hidden]):not([disabled])",
        ),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Click on empty backdrop area (not the image or controls) closes.
  overlay.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target === overlay || target === stageArea) close();
  });

  // Swipe navigation on touch devices.
  let startX = 0;
  let startY = 0;
  let tracking = false;
  stageArea.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    },
    { passive: true },
  );
  stageArea.addEventListener(
    "touchend",
    (e) => {
      if (!tracking) return;
      tracking = false;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        go(dx < 0 ? 1 : -1);
      }
    },
    { passive: true },
  );
}

if (document.readyState !== "loading") {
  initGallery();
} else {
  document.addEventListener("DOMContentLoaded", initGallery);
}
