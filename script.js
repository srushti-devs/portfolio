/**
 * Srushti Paswan - Personal Portfolio
 * Interactive Script for Multi-Page Navigation and UI Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavLink();
  initContactForm();
});

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu on resize to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Highlights the active link based on current page URL
 */
function initActiveNavLink() {
  const rawPath = window.location.pathname;
  let filename = rawPath.substring(rawPath.lastIndexOf('/') + 1);
  if (!filename || filename === '') {
    filename = 'index.html';
  }

  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Contact form submit handler
 */
function initContactForm() {
  const form = document.querySelector('.contact-form-card form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg style="animation: spin 1s linear infinite; width: 16px; height: 16px; stroke: currentColor; fill: none; display: inline-block; vertical-align: middle; margin-right: 6px;" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke-width="4" stroke="currentColor" stroke-dasharray="32" stroke-linecap="round"></circle>
      </svg>
      Sending...
    `;

    setTimeout(() => {
      submitBtn.innerHTML = `Message Sent Successfully`;
      submitBtn.style.backgroundColor = '#543D2B';
      submitBtn.style.color = '#FAF7F2';

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.style.color = '';
      }, 3000);
    }, 900);
  });
}
