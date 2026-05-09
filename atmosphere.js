/* Ambient atmosphere + custom cursor + time-of-night detection.
   Plain JS, no React. Sets data-mood, data-night, data-cursor on <body>. */

(function() {
  'use strict';

  // ─── Atmosphere mood orbs follow mouse parallax (lerped) ───
  const orbs = document.querySelectorAll('.atm-orb');
  let tx = 0, ty = 0, lx = 0, ly = 0;
  window.addEventListener('mousemove', (e) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  function parallax() {
    lx += (tx - lx) * 0.04;
    ly += (ty - ly) * 0.04;
    orbs.forEach((o, i) => {
      const k = (i + 1) * 6;
      o.style.transform = `translate(${lx * k}px, ${ly * k}px)`;
    });
    requestAnimationFrame(parallax);
  }
  parallax();

  // ─── Time-of-night detection ───
  function checkNight() {
    const h = new Date().getHours();
    const isNight = (h >= 21 || h < 6);
    document.body.dataset.night = isNight ? 'true' : 'false';
  }
  checkNight();
  setInterval(checkNight, 60_000);

  // ─── Toast helper ───
  window.NV = window.NV || {};
  let toastTimer = null;
  window.NV.whisper = function(line, ms) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = line;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), ms || 2400);
  };

  window.NV.setMood = function(mood) {
    document.body.dataset.mood = mood || 'home';
  };
  document.body.dataset.mood = 'home';

  // ─── Site config (edit here or override from a CMS/admin layer) ───
  window.NV_CONFIG = window.NV_CONFIG || {};
  window.NV_CONFIG.drop        = window.NV_CONFIG.drop        || 'NOCTIS VEIL';
  window.NV_CONFIG.isAdmin     = window.NV_CONFIG.isAdmin     || false;
  window.NV_CONFIG.memberCount = window.NV_CONFIG.memberCount || 284;
})();
