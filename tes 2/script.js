// ===========================
// DARK MODE TOGGLE
// ===========================
const html = document.documentElement;
const darkToggle = document.getElementById('darkToggle');
const darkIcon = document.getElementById('darkIcon');

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
darkIcon.textContent = savedTheme === 'dark' ? 'light_mode' : 'dark_mode';

darkToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  darkIcon.textContent = next === 'dark' ? 'light_mode' : 'dark_mode';
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Update active nav link based on scroll position
  // GANTI
const sections = ['hero', 'fitur',, 'tentang', 'support'];
  const navLinks = document.querySelectorAll('.nav-link');

  sections.forEach((id, i) => {
    const section = document.getElementById(id);
    if (!section) return;
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      if (navLinks[i]) navLinks[i].classList.add('active');
    }
  });
});

// ===========================
// SMOOTH SCROLL NAV LINKS
// ===========================
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close mobile menu if open
      document.getElementById('navLinks').classList.remove('open');
    }
  });
});

// ===========================
// HAMBURGER MENU (MOBILE)
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});

// ===========================
// SLIDER FEATURE CARDS
// ===========================
const track = document.getElementById('cardsTrack');
const btnLeft = document.getElementById('sliderLeft');
const btnRight = document.getElementById('sliderRight');
const dots = document.querySelectorAll('.dot');
const cards = document.querySelectorAll('.feature-card');
const SCROLL_AMOUNT = 320;

btnLeft.addEventListener('click', () => {
  track.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
});

btnRight.addEventListener('click', () => {
  track.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
});

// Update dots on scroll
track.addEventListener('scroll', () => {
  const maxScroll = track.scrollWidth - track.clientWidth;
  const scrollRatio = track.scrollLeft / maxScroll;
  const dotIndex = Math.round(scrollRatio * (dots.length - 1));

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === dotIndex);
  });
});

// Dot click to scroll
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const targetScroll = (i / (dots.length - 1)) * maxScroll;
    track.scrollTo({ left: targetScroll, behavior: 'smooth' });
  });
});

// ===========================
// PROGRESS BAR ANIMATION
// ===========================
const progressFill = document.getElementById('progressFill');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      progressFill.style.width = '75%';
    }
  });
}, { threshold: 0.3 });

if (progressFill) observer.observe(progressFill);

// ===========================
// REFRESH STATS BUTTON
// ===========================
const refreshBtn = document.getElementById('refreshStats');
const statActive = document.getElementById('statActive');
const statDone = document.getElementById('statDone');

refreshBtn.addEventListener('click', () => {
  // Spin animation
  refreshBtn.classList.add('spinning');
  setTimeout(() => refreshBtn.classList.remove('spinning'), 600);

  // Simulate new data
  const newActive = (8000 + Math.floor(Math.random() * 1000)).toLocaleString();
  const newDone = (1000 + Math.floor(Math.random() * 500)).toLocaleString();

  statActive.style.opacity = '0';
  statDone.style.opacity = '0';

  setTimeout(() => {
    statActive.textContent = newActive;
    statDone.textContent = newDone;
    statActive.style.transition = 'opacity 0.3s';
    statDone.style.transition = 'opacity 0.3s';
    statActive.style.opacity = '1';
    statDone.style.opacity = '1';
  }, 300);
});

// ===========================
// MODAL SIGN IN & REGISTER
// ===========================
const modalSignIn = document.getElementById('modalSignIn');
const modalRegister = document.getElementById('modalRegister');

const openModal = (modal) => {
  closeAllModals();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

const closeAllModals = () => {
  [modalSignIn, modalRegister].forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
};

// Open buttons
document.getElementById('btnSignIn').addEventListener('click', () => openModal(modalSignIn));
document.getElementById('btnRegister').addEventListener('click', () => openModal(modalRegister));

// Close buttons
document.getElementById('closeSignIn').addEventListener('click', closeAllModals);
document.getElementById('closeRegister').addEventListener('click', closeAllModals);

// Switch between modals
document.getElementById('switchToRegister').addEventListener('click', () => openModal(modalRegister));
document.getElementById('switchToSignIn').addEventListener('click', () => openModal(modalSignIn));

// Close on overlay click
[modalSignIn, modalRegister].forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAllModals();
  });
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});

// tentang v2
// FAQ TOGGLE
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}