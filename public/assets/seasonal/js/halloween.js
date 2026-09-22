// Halloween effects for jameshoward.us.
// The seasonal driver controls the date window and ?season=halloween override.
// Cobweb decoration is site-wide; the themed arms, lightning, and thunder are homepage-only.

(function () {
  "use strict";

  const ASSETS = {
    arms: "/assets/img/halloween/jameshoward-arms.svg",
    bolt: "/assets/img/halloween/lightning.svg",
    thunder: "/assets/audio/thunder.mp3"
  };

  const reducedMotion = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rand = (min, max) => min + Math.random() * (max - min);
  const randInt = (min, max) => Math.floor(rand(min, max));

  function init() {
    if (!document.body) return;

    document.body.classList.add("halloween-mode");

    if (!document.querySelector(".halloween-cobweb")) {
      const cobweb = document.createElement("div");
      cobweb.className = "halloween-cobweb";
      cobweb.setAttribute("aria-hidden", "true");
      document.body.appendChild(cobweb);
    }

    const homeHero = document.querySelector(".home-hero");
    if (!homeHero) return;

    const arms = homeHero.querySelector(".home-grid > img");
    if (arms) {
      arms.dataset.defaultSrc = arms.getAttribute("src") || "";
      arms.setAttribute("src", ASSETS.arms);
    }

    if (reducedMotion()) return;

    const bolt = document.createElement("img");
    bolt.className = "halloween-lightning";
    bolt.alt = "";
    bolt.decoding = "async";
    bolt.loading = "eager";
    bolt.src = ASSETS.bolt;
    homeHero.appendChild(bolt);

    const audio = new Audio(ASSETS.thunder);
    audio.preload = "auto";
    audio.volume = 0.15;
    let thunderPlayed = false;

    function playThunderOnce() {
      if (thunderPlayed) return;
      thunderPlayed = true;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }

    function runSequence(withThunder) {
      const angleDeg = -(35 + Math.random() * 20);
      const leftVW = Math.max(0, Math.min(6, Math.random() * 6));
      const totalDropVh = rand(10, 25);
      const flashes = randInt(2, 8);
      const steps = [];

      bolt.style.left = leftVW + "vw";

      for (let i = 0; i < flashes; i += 1) {
        steps.push({ type: "on", dur: rand(50, 120) });
        if (i < flashes - 1) steps.push({ type: "off", dur: rand(80, 220) });
      }

      const maxDuration = 1800;
      const totalPlanned = steps.reduce((sum, step) => sum + step.dur, 0);
      const scale = Math.min(1, maxDuration / totalPlanned);
      steps.forEach((step) => { step.dur = Math.max(30, step.dur * scale); });

      const start = performance.now();
      let index = 0;
      let firstFlash = true;

      function step() {
        if (index >= steps.length) {
          bolt.classList.remove("glow");
          bolt.style.opacity = "0";
          bolt.style.transform = "translateY(0) rotate(" + angleDeg + "deg)";
          return;
        }

        const elapsed = performance.now() - start;
        const progress = Math.min(1, elapsed / maxDuration);
        const dropPx = (totalDropVh * progress) * (window.innerHeight / 100);
        bolt.style.transform = "translateY(" + dropPx + "px) rotate(" + angleDeg + "deg)";

        const current = steps[index++];
        if (current.type === "on") {
          bolt.classList.add("glow");
          bolt.style.opacity = "1";
          if (withThunder && firstFlash) playThunderOnce();
          firstFlash = false;
        } else {
          bolt.classList.remove("glow");
          bolt.style.opacity = "0";
        }

        window.setTimeout(step, current.dur);
      }

      step();
    }

    function scheduleSequences() {
      window.setTimeout(() => {
        runSequence(false);
        scheduleSequences();
      }, rand(15000, 25000));
    }

    function firstInteraction() {
      runSequence(true);
      scheduleSequences();
      ["pointerdown", "keydown", "wheel", "touchstart", "mousedown"].forEach((eventName) => {
        window.removeEventListener(eventName, firstInteraction);
      });
    }

    ["pointerdown", "keydown", "wheel", "touchstart", "mousedown"].forEach((eventName) => {
      window.addEventListener(eventName, firstInteraction, { once: true, passive: true });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
