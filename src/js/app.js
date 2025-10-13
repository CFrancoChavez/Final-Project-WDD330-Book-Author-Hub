// import { setupSearchForm } from './searchView.js';
// import { renderResults } from './resultsView.js';
// import { searchBooks } from './services/openLibrary.js';

// // Inicializa la vista de búsqueda
// setupSearchForm(async (query) => {
//   const resultsContainer = document.getElementById('results');
//   resultsContainer.innerHTML = `<p class="loading">Searching...</p>`;

//   try {
//     const books = await searchBooks(query);
//     renderResults(books);
//   } catch (error) {
//     resultsContainer.innerHTML = `<p class="error">Error fetching results. Please try again.</p>`;
//     console.error(error);
//   }
// });
// // Menú responsive
// const menuToggle = document.getElementById('menu-toggle');
// const navMenu = document.getElementById('nav-menu');

// menuToggle.addEventListener('click', () => {
//   navMenu.classList.toggle('open');
// });
import { searchBooks } from './services/openLibrary.js';
import { renderResults } from './resultsView.js';

// ---------- SEARCH FORM ----------
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  const resultsContainer = document.getElementById('results');

  if (!query) {
    resultsContainer.innerHTML = `<p>Please enter a title or author.</p>`;
    return;
  }

  resultsContainer.innerHTML = `<p class="loading">Searching...</p>`;

  try {
    const books = await searchBooks(query);
    renderResults(books);
  } catch (err) {
    console.error(err);
    resultsContainer.innerHTML = `<p class="error">Failed to load results. Please try again.</p>`;
  }
});

// ---------- RESPONSIVE MENU ----------
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
