function initVideoGallery(): void {
  const modal = document.getElementById("video-gallery-modal");
  if (!(modal instanceof HTMLDialogElement)) return;

  const backdrop = modal.querySelector<HTMLElement>("[data-video-backdrop]");
  const player = modal.querySelector<HTMLElement>("[data-video-player]");
  const title = modal.querySelector<HTMLElement>("#video-gallery-title");
  const closeButton =
    modal.querySelector<HTMLButtonElement>("[data-video-close]");
  const triggers = document.querySelectorAll<HTMLButtonElement>(
    "[data-video-trigger]",
  );

  if (!backdrop || !player || !title || !closeButton || !triggers.length)
    return;

  let trigger: HTMLButtonElement | null = null;

  const close = () => {
    if (!modal.open) return;

    player.replaceChildren();
    modal.close();
    document.body.style.overflow = "";
    trigger?.focus();
    trigger = null;
  };

  const open = (button: HTMLButtonElement) => {
    const { videoId, videoTitle } = button.dataset;
    if (!videoId || !videoTitle) return;

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
    iframe.title = videoTitle;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.className = "h-full w-full border-0";

    trigger = button;
    title.textContent = videoTitle;
    player.replaceChildren(iframe);
    modal.showModal();
    document.body.style.overflow = "hidden";
    closeButton.focus();
  };

  for (const button of triggers) {
    button.addEventListener("click", () => open(button));
  }

  closeButton.addEventListener("click", close);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });
  modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
}

if (document.readyState !== "loading") {
  initVideoGallery();
} else {
  document.addEventListener("DOMContentLoaded", initVideoGallery);
}
