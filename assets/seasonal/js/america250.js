// /assets/seasonal/js/america250.js
//
// America 250 / Fourth of July fireworks for jameshoward.us.
// Uses fireworks-js as the renderer, but this file controls the launch
// schedule so the effect behaves predictably inside the homepage hero.

(function () {
  "use strict";

  function reducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  if (reducedMotion()) return;

  const FireworksConstructor =
    window.Fireworks && (window.Fireworks.default || window.Fireworks.Fireworks);

  if (!FireworksConstructor) {
    console.warn("america250.js: fireworks-js is not loaded");
    return;
  }

  const host =
    document.querySelector(".section-header .parallax") ||
    document.querySelector(".section-header");

  if (!host) {
    console.warn("america250.js: hero host not found");
    return;
  }

  document.body.classList.add("america250-mode");

  let container = document.getElementById("america250-fireworks");

  if (!container) {
    container = document.createElement("div");
    container.id = "america250-fireworks";
    container.setAttribute("aria-hidden", "true");
    host.appendChild(container);
  }

  let launchBox = document.getElementById("america250-launch-box");

    if (!launchBox) {
        launchBox = document.createElement("div");
        launchBox.id = "america250-launch-box";
        launchBox.setAttribute("aria-hidden", "true");
        host.appendChild(launchBox);
    }

  function randInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  /*
    Important:

    intensity is set to 0 because we do not want fireworks-js running
    its own launcher. We only want it to render fireworks when this file
    explicitly calls launch().

    This avoids weird tab-refocus behavior and gives us full control over
    the homepage rhythm.
  */
  const fireworks = new FireworksConstructor(container, {
    autoresize: true,

    opacity: 0.72,

    acceleration: 1.035,
    friction: 0.965,
    gravity: 1.35,

    particles: 85,
    traceLength: 3,
    traceSpeed: 8,
    explosion: 6,

    intensity: 0,

    flickering: 45,
    lineStyle: "round",

    hue: {
      min: 0,
      max: 235
    },

    brightness: {
      min: 55,
      max: 88
    },

    decay: {
      min: 0.018,
      max: 0.033
    },

    delay: {
      min: 45,
      max: 85
    },

    /*
      Horizontal launch point as a percentage of the container width.
      This aims the rockets from the lower-left launch box area.
    */
    rocketsPoint: {
      min: 8,
      max: 22
    },

    lineWidth: {
      explosion: {
        min: 1,
        max: 3
      },
      trace: {
        min: 1,
        max: 2
      }
    },

    mouse: {
      click: false,
      move: false,
      max: 1
    },

    sound: {
      enabled: false
    }
  });

  let stopped = false;
  let paused = false;
  let nextTimer = null;
  let started = false;

  function clearNextLaunch() {
    if (nextTimer) {
      window.clearTimeout(nextTimer);
      nextTimer = null;
    }
  }

  function launch(count) {
    if (stopped || paused || !started) return;
    fireworks.launch(count);
  }

  function scheduleNextLaunch() {
    if (stopped || paused) return;

    clearNextLaunch();

    /*
      Homepage-friendly rhythm. Increase these numbers if it feels too busy.
      Decrease them if it feels too sleepy.
    */
    const delay = randInt(1400, 2800);

    nextTimer = window.setTimeout(function () {
      nextTimer = null;

      if (stopped || paused) return;

      launch(randInt(1, 2));
      scheduleNextLaunch();
    }, delay);
  }

  function startFireworks() {
    if (started || stopped) return;

    started = true;
    paused = false;

    fireworks.start();

    // Opening salute, then a gentle repeating schedule.
    window.setTimeout(function () {
      launch(3);
    }, 350);

    window.setTimeout(function () {
      launch(2);
    }, 1600);

    window.setTimeout(function () {
      scheduleNextLaunch();
    }, 2400);
  }

  function pauseFireworks() {
    if (stopped || paused) return;

    paused = true;
    clearNextLaunch();

    if (typeof fireworks.pause === "function") {
      fireworks.pause();
    } else {
      fireworks.stop();
    }
  }

  function resumeFireworks() {
    if (stopped || !paused) return;

    paused = false;

    fireworks.start();

    /*
      Do not replay the opening salute on refocus.
      Give the browser a beat, launch one shell, then resume the schedule.
    */
    window.setTimeout(function () {
      if (stopped || paused) return;

      launch(1);
      scheduleNextLaunch();
    }, 600);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      pauseFireworks();
    } else {
      resumeFireworks();
    }
  });

  window.addEventListener("blur", pauseFireworks);
  window.addEventListener("focus", resumeFireworks);

  /*
    Wait two animation frames so the hero has dimensions before the
    library measures the container.
  */
  requestAnimationFrame(function () {
    requestAnimationFrame(startFireworks);
  });

  window.addEventListener("pagehide", function () {
    stopped = true;
    paused = true;

    clearNextLaunch();
    fireworks.stop();
  });
})();
