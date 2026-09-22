(function () {
  "use strict";

  const DISPLAY_PERIOD = 10000;
  const FADE_DURATION = 1000;

  function init() {
    if (!document.body || document.querySelector(".ukb")) return;

    if (!document.querySelector('link[data-ukraine-banner]')) {
      const styleSheet = document.createElement("link");
      styleSheet.rel = "stylesheet";
      styleSheet.href = "/assets/css/ukraine.css";
      styleSheet.dataset.ukraineBanner = "true";
      document.head.appendChild(styleSheet);
    }

    const message = "We stand with Ukraine against Russian aggression. 🇺🇦";
    const banner = document.createElement("a");
    banner.className = "ukb ukb-dark ukb-bottom-right ukb-small";
    banner.href = "https://u24.gov.ua/";
    banner.textContent = message;
    banner.setAttribute("aria-label", message + " Visit United24, the official Ukrainian fundraising platform.");
    document.body.appendChild(banner);

    let fadeTimer;
    let removalTimer;

    function cancelFade() {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removalTimer);
      banner.classList.remove("ukb-fade-out");
    }

    function scheduleFade() {
      cancelFade();
      fadeTimer = window.setTimeout(() => {
        banner.classList.add("ukb-fade-out");
        removalTimer = window.setTimeout(() => banner.remove(), FADE_DURATION);
      }, DISPLAY_PERIOD);
    }

    banner.addEventListener("mouseenter", cancelFade);
    banner.addEventListener("mouseleave", scheduleFade);
    banner.addEventListener("focus", cancelFade);
    banner.addEventListener("blur", scheduleFade);
    scheduleFade();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
