document.addEventListener('DOMContentLoaded', () => {
  // Set exact path lengths for stroke-draw animation
  document.querySelectorAll('.draw-in').forEach(el => {
    const path = el.querySelector('path');
    if (path) el.style.setProperty('--path-length', path.getTotalLength());
  });

  const els = document.querySelectorAll('.animate-on-scroll');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
});
