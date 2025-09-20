// Halloween effects: logo swap + cobweb + left-edge lightning bolt + thunder on first interaction.
// Window: Oct 25–Nov 1 (set TEST_ALWAYS_ON = true to force-on for testing).
// Respects prefers-reduced-motion (skips bolt+sound if enabled).

(function () {
  // ----- Config -----
  const TEST_ALWAYS_ON = false; // set true for local testing

  const DATE_WINDOW = (date = new Date()) => {
    if (TEST_ALWAYS_ON) return true;
    const m = date.getMonth() + 1, d = date.getDate();
    return (m === 10 && d >= 25) || (m === 11 && d <= 1);
  };

  const REDUCED_MOTION = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ASSETS = {
    cobweb: "/assets/img/halloween/spiderweb.svg",
    bolt:   "/assets/img/halloween/lightning.svg",
    thunder: "/assets/audio/thunder.mp3"
  };

  const THUNDER_VOL = 0.15;

  // Strike timing for follow-ons (after first interaction strike)
  const BETWEEN_SEQUENCES_RANGE  = [15000, 25000]; // ms between sequences
  const MAX_SEQUENCE_DURATION_MS = 1800;           // cap a flicker run

  // ----- Utils -----
  const rand    = (min, max) => min + Math.random() * (max - min);
  const randInt = (min, max) => Math.floor(rand(min, max));

  // ----- Logo handling (two <img> with data-src; only chosen downloads) -----
  function showCorrectLogo(isHalloween) {
    const id = isHalloween ? "logo-halloween" : "logo-default";
    const logo = document.getElementById(id);
    if (!logo) return;
    const src = logo.dataset.src;
    if (src) logo.src = src;
    logo.style.display = "block";
  }

  function hideOtherLogo(isHalloween) {
    const otherId = isHalloween ? "logo-default" : "logo-halloween";
    const other = document.getElementById(otherId);
    if (other) other.style.display = "none";
  }

  // ----- Decorations -----
  function createCobweb() {
    const web = document.createElement("div");
    web.className = "cobweb";
    web.style.backgroundImage = `url("${ASSETS.cobweb}")`;
    document.body.appendChild(web);
  }

  function createBoltImg() {
    const img = document.createElement("img");
    img.className = "lightning-bolt";
    img.alt = "";
    img.decoding = "async";
    img.loading = "eager";
    img.src = ASSETS.bolt;
    document.body.appendChild(img);
    return img;
  }

  // ----- Audio (no UI; play once on first interaction) -----
  function setupThunder() {
    if (!ASSETS.thunder) return { playOnce: () => {} };
    const audio = new Audio(ASSETS.thunder);
    audio.preload = "auto";
    audio.volume = THUNDER_VOL;
    let played = false;

    function playOnce() {
      if (played) return;
      played = true;
      // tiny random offset so sound ≈ first flash
      setTimeout(() => {
        audio.currentTime = 0;
        audio.play().catch(() => {}); // user gesture guarantees, but ignore just in case
      }, Math.random() * 120);
    }

    return { playOnce };
  }

  // ----- Lightning sequence -----
  function scheduleSequences(runSequence) {
    // Loop (no initial here; first strike is on interaction)
    (function loop() {
      setTimeout(() => {
        runSequence();
        loop();
      }, rand(...BETWEEN_SEQUENCES_RANGE));
    })();
  }

  // Natural flicker: 2–4 flashes, random off-gaps, slight vertical drop, all <~2s.
  function runBoltSequence(boltImg, onFirstFlash) {
    if (!boltImg) return;

    // NEW: pick a natural bendwise angle and a small horizontal offset for this run
    const angleDeg = -(35 + Math.random() * 20);           // -35° … -55°
    const leftVW   = Math.max(0, Math.min(6, Math.random() * 6)); // 0 … 6vw
    boltImg.style.left = leftVW + "vw";

    const totalDropVh = rand(10, 25);
    const start = performance.now();

    // keep your existing steps/flashes logic…
    const flashes = randInt(2, 8);
    const steps = [];
    for (let i = 0; i < flashes; i++) {
      const onDur  = rand(50, 120);
      const offDur = rand(80, 220);
      steps.push({ type: "on",  dur: onDur });
      if (i < flashes - 1) steps.push({ type: "off", dur: offDur });
    }
    const totalPlanned = steps.reduce((a, s) => a + s.dur, 0);
    const scale = Math.min(1, MAX_SEQUENCE_DURATION_MS / totalPlanned);
    steps.forEach(s => s.dur = Math.max(30, s.dur * scale));

    let idx = 0, firstOnPlayed = false;

    function step() {
      if (idx >= steps.length) {
        boltImg.style.opacity = "0";
        // include the rotation when resetting transform
        boltImg.style.transform = `translateY(0) rotate(${angleDeg}deg)`;
        return;
      }

      const elapsed  = performance.now() - start;
      const progress = Math.min(1, elapsed / MAX_SEQUENCE_DURATION_MS);
      const dropPx   = (totalDropVh * progress) * (window.innerHeight / 100);

      // IMPORTANT: always include the rotation together with translateY
      boltImg.style.transform = `translateY(${dropPx}px) rotate(${angleDeg}deg)`;

      const s = steps[idx++];
      if (s.type === "on") {
        boltImg.classList.add("glow");
        boltImg.style.opacity = "1";
        boltImg.style.opacity = "1";
        if (!firstOnPlayed && typeof onFirstFlash === "function") {
          firstOnPlayed = true;
          onFirstFlash();
        }
      } else {
        boltImg.classList.remove("glow");
        boltImg.style.opacity = "0";
      }
      setTimeout(step, s.dur);
    }

    step();
  }


  // ----- First-interaction orchestrator -----
  function onFirstInteraction(cb) {
    const opts = { once: true, passive: true };
    const run = () => {
      remove();
      cb();
    };
    function remove() {
      window.removeEventListener("pointerdown", run, opts);
      window.removeEventListener("keydown",     run, opts);
      window.removeEventListener("wheel",       run, opts);
      window.removeEventListener("touchstart",  run, opts);
      window.removeEventListener("mousedown",   run, opts);
    }
    window.addEventListener("pointerdown", run, opts);
    window.addEventListener("keydown",     run, opts);
    window.addEventListener("wheel",       run, opts);
    window.addEventListener("touchstart",  run, opts);
    window.addEventListener("mousedown",   run, opts);
  }

  // ----- Init -----
  document.addEventListener("DOMContentLoaded", () => {
    const isHalloween = DATE_WINDOW();

    // Logo: pick exactly one; only that one downloads
    showCorrectLogo(isHalloween);
    hideOtherLogo(isHalloween);

    if (!isHalloween) return; // no decorations out of season

    document.body.classList.add("halloween-mode");

    // Always place cobweb (it is quiet/decorative)
    createCobweb();

    // Respect reduced motion for the animated/sound parts
    if (REDUCED_MOTION()) return;

    const bolt    = createBoltImg();
    const thunder = setupThunder();

    // Defer both the first lightning sequence AND the thunder to the first user interaction.
    onFirstInteraction(() => {
      runBoltSequence(bolt, () => thunder.playOnce && thunder.playOnce());
      scheduleSequences(() => runBoltSequence(bolt)); // follow-on sequences (silent)
    });
  });
})();
