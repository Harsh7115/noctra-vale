/* Ambient atmosphere + custom cursor + time-of-night detection.
   Plain JS, no React. Sets data-mood, data-night, data-cursor on <body>. */

(function() {
  'use strict';

  // ─── Atmosphere mood orbs follow mouse parallax ───
  const orbs = document.querySelectorAll('.atm-orb');
  let mx = 0, my = 0;
  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  function parallax() {
    orbs.forEach((o, i) => {
      const k = (i + 1) * 8;
      o.style.transform = `translate(${mx * k}px, ${my * k}px)`;
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
})();
