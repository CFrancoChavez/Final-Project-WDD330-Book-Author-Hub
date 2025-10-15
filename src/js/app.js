
import { searchBooks } from './services/openLibrary.js';
import { renderResults } from './resultsView.js';

// ---------- SEARCH FORM ----------
// Handles the main search form submission and updates the UI dynamically
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  const resultsContainer = document.getElementById('results'); 

// If user submits empty input, show a warning message
  if (!query) {
    resultsContainer.innerHTML = `<p>Please enter a title or author.</p>`;
    return;
  }

     // Show spinner while fetching data
  resultsContainer.innerHTML = `<p class="loading">Searching <span class="spinner"></span></p>`;


  try {
    // Slight delay for a smoother visual transition (spinner visible)
    const books = await searchBooks(query);
    await new Promise((resolve) => setTimeout(resolve, 400)); // 🔹 0.4s visual buffer
    renderResults(books);
  } catch (err) {
    console.error(err);
    resultsContainer.innerHTML = `<p class="error">Failed to load results. Please try again.</p>`;
  }
});

// ---------- RESPONSIVE NAV MENU ----------
// Toggles the hamburger navigation menu on small screens
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close menu when a nav link is clicked (mobile UX)
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ---------- MODAL CLOSE HANDLER ----------
// Close modal when clicking outside of it or pressing ESC
document.addEventListener('click', (event) => {
  const modal = document.querySelector('.modal');
  if (modal && event.target === modal) {
    modal.remove(); // click outside modal-content closes it
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
  }
});
