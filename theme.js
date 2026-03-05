(function () {
  // --- Apply theme immediately (in <head>) to prevent FOUC ---
  var stored = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  // --- Wire button after DOM is ready ---
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    updateAriaLabel(theme);
    updateThemeColor(theme);
    updateFavicon(theme);

    // On iOS Safari a tap fires touchend → then a synthetic ghost click ~300 ms
    // later. Without a guard the toggle fires twice and appears to do nothing.
    var lastTouchEnd = 0;

    function applyThemeToggle() {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateAriaLabel(next);
      updateThemeColor(next);
      updateFavicon(next);
    }

    // Handle touch: preventDefault stops the ghost click iOS generates.
    btn.addEventListener('touchend', function (e) {
      e.preventDefault();
      lastTouchEnd = Date.now();
      applyThemeToggle();
    });

    // Handle mouse/keyboard click; skip if a touch just handled this.
    btn.addEventListener('click', function () {
      if (Date.now() - lastTouchEnd < 500) return;
      applyThemeToggle();
    });
  });

  function updateAriaLabel(theme) {
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function updateThemeColor(theme) {
    var meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#1e1e1e' : '#dcdcdc');
  }

  function updateFavicon(theme) {
    var favicon = document.getElementById('favicon-default');
    if (!favicon) return;
    favicon.setAttribute('href',
      theme === 'dark'
        ? 'assets/images/rl_favicon_dark.png'
        : 'assets/images/rl_favicon_light.png'
    );
  }
})();
