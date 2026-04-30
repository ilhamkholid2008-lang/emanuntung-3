// ══════════════════════════
//  CUSTOM CURSOR
// ══════════════════════════
const cur  = document.getElementById('cur');
const ring = document.getElementById('curRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function tick() {
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';

  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';

  requestAnimationFrame(tick);
})();

// Scale cursor on interactive elements
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width  = '14px';
    cur.style.height = '14px';
    ring.style.width  = '52px';
    ring.style.height = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width  = '8px';
    cur.style.height = '8px';
    ring.style.width  = '36px';
    ring.style.height = '36px';
  });
});


// ══════════════════════════
//  NAVBAR — scroll solid
// ══════════════════════════
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('solid', scrollY > 60);
});


// ══════════════════════════
//  SMOOTH SCROLL
// ══════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});


// ══════════════════════════
//  SCROLL REVEAL
// ══════════════════════════
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.sr').forEach(el => revealObs.observe(el));


// ══════════════════════════
//  FEATURE RAIL — drag scroll
// ══════════════════════════
const rail = document.getElementById('featRail');
let isDragging = false, startX, scrollLeft;

rail.addEventListener('mousedown', e => {
  isDragging = true;
  startX     = e.pageX - rail.offsetLeft;
  scrollLeft = rail.scrollLeft;
  rail.classList.add('grab');
});

rail.addEventListener('mouseleave', () => {
  isDragging = false;
  rail.classList.remove('grab');
});

rail.addEventListener('mouseup', () => {
  isDragging = false;
  rail.classList.remove('grab');
});

rail.addEventListener('mousemove', e => {
  if (!isDragging) return;
  e.preventDefault();
  rail.scrollLeft = scrollLeft - (e.pageX - rail.offsetLeft - startX) * 1.5;
});