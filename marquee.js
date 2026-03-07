(function () {
  var WAVELENGTH = 750;
  var AMPLITUDE = 30;
  var SPEED = 0.53;
  var TEXT = 'REACH OUT / ';

  var container = document.querySelector('.marquee-wave');
  if (!container) return;

  var svg, textPath, pathEl, offset, repeatWidth, animId;

  function buildSinePath(width, wavelength, amplitude) {
    var cy = amplitude;
    var half = wavelength / 2;
    var cp = half * 0.5523;
    var d = 'M' + (-wavelength) + ',' + cy;
    var x = -wavelength;
    while (x < width + wavelength) {
      d += ' C' + (x + cp) + ',' + (cy + amplitude) +
           ' ' + (x + half - cp) + ',' + (cy + amplitude) +
           ' ' + (x + half) + ',' + cy;
      d += ' C' + (x + half + cp) + ',' + (cy - amplitude) +
           ' ' + (x + wavelength - cp) + ',' + (cy - amplitude) +
           ' ' + (x + wavelength) + ',' + cy;
      x += wavelength;
    }
    return d;
  }

  function getFontSize() {
    return window.innerWidth <= 768 ? 48 : 80;
  }

  function init() {
    if (animId) cancelAnimationFrame(animId);
    container.innerHTML = '';
    offset = 0;

    var vw = window.innerWidth;
    var pathWidth = vw * 4;
    var fontSize = getFontSize();
    var svgHeight = AMPLITUDE * 2 + fontSize * 1.1;

    var pathD = buildSinePath(pathWidth, WAVELENGTH, AMPLITUDE);
    var pathId = 'marquee-wave-path';

    var estRepeatWidth = fontSize * 6;
    var repeats = Math.ceil(pathWidth / estRepeatWidth) + 4;
    var textContent = '';
    for (var i = 0; i < repeats; i++) {
      textContent += TEXT;
    }

    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', 'marquee-svg');
    svg.setAttribute('height', svgHeight);

    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('id', pathId);
    pathEl.setAttribute('d', pathD);
    pathEl.setAttribute('fill', 'none');
    defs.appendChild(pathEl);
    svg.appendChild(defs);

    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('class', 'marquee-text');
    text.setAttribute('font-family', 'Syne, sans-serif');
    text.setAttribute('font-weight', '800');
    text.setAttribute('font-size', fontSize);
    text.setAttribute('fill', 'currentColor');

    textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
    textPath.setAttribute('href', '#' + pathId);
    textPath.textContent = textContent;
    text.appendChild(textPath);
    svg.appendChild(text);

    container.appendChild(svg);
    requestAnimationFrame(function () {
      repeatWidth = textPath.getComputedTextLength() / repeats;
      animate();
    });
  }

  function animate() {
    offset -= SPEED;
    // True modular wrap: keeps offset cleanly in [-repeatWidth, 0)
    // Prevents floating-point drift from causing a visible gap at the loop point
    if (offset <= -repeatWidth) {
      offset = (offset % repeatWidth);
      // % can return -0 or very small negative; normalize to ensure it's in range
      if (offset === 0) offset = -0.001;
    }
    textPath.setAttribute('startOffset', offset);
    animId = requestAnimationFrame(animate);
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 200);
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(init);
  } else {
    window.addEventListener('load', init);
  }
})();
