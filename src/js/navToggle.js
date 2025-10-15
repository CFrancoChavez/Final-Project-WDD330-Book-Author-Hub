// --- Global menu toggle logic for all pages ---
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!menuToggle || !navMenu) return;

  // Toggle menu visibility
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // Close menu when clicking a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
});
