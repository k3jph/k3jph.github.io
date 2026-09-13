// Seasonal effects driver.
// Install this directory as /assets/seasonal and include:
// <script defer src="/assets/seasonal/js/seasonal.js"></script>
//
// Test URLs:
//   /?season=america250
//   /?season=fourth
//   /?season=july4
//   /?season=halloween
//   /?season=christmas
//   /?season=all

(function () {
  "use strict";

  const aliases = {
    fourth: "america250",
    july4: "america250",
    julyfourth: "america250",
    independence: "america250",
    america: "america250",
    usa250: "america250",
    xmas: "christmas",
    spooky: "halloween"
  };

  const q = new URLSearchParams(window.location.search);
  const rawSeason = q.get("season");
  const forcedSeason = rawSeason ? (aliases[rawSeason.toLowerCase()] || rawSeason.toLowerCase()) : null;
  const forcedAll = forcedSeason === "all";

  const reducedMotion = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const today = new Date();

  function inRange(windowDef) {
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = today.getDate();

    if (windowDef.year && y !== windowDef.year) return false;
    return m === windowDef.month && d >= windowDef.startDay && d <= windowDef.endDay;
  }

  function isActive(season) {
    if (forcedAll) return true;
    if (forcedSeason === season.name) return true;
    return season.windows.some(inRange);
  }

  function loadScript(src, cb) {
    const s = document.createElement("script");
    s.defer = true;
    s.src = src;
    if (cb) s.onload = cb;
    document.head.appendChild(s);
  }

  function loadStylesheet(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  window.Seasonal = {
    forced: forcedSeason,
    forcedAll,
    reducedMotion,
    loadScript,
    loadStylesheet
  };

  const seasons = [
    {
      name: "america250",
      script: "/assets/seasonal/js/america250.js",
      stylesheet: "/assets/seasonal/css/america250.css",
      motionHeavy: true,
      dependencies: [
        "https://cdn.jsdelivr.net/npm/fireworks-js@2.x/dist/index.umd.js"
      ],
      windows: [
        { month: 7, startDay: 1, endDay: 7 },
        { year: 2026, month: 7, startDay: 1, endDay: 12 }
      ]
    }
  ];

  function loadSeason(season) {
    if (season.stylesheet) loadStylesheet(season.stylesheet);

    if (!season.dependencies || season.dependencies.length === 0) {
      if (season.script) loadScript(season.script);
      return;
    }

    let i = 0;
    function next() {
      if (i >= season.dependencies.length) {
        if (season.script) loadScript(season.script);
        return;
      }
      loadScript(season.dependencies[i++], next);
    }
    next();
  }

  for (const season of seasons) {
    if (!isActive(season)) continue;
    if (season.motionHeavy && reducedMotion()) continue;
    loadSeason(season);
  }
})();
