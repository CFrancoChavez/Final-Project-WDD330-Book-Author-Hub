import { setupSearchForm } from './searchView.js';
import { renderResults } from './resultsView.js';
import { searchBooks } from './services/openLibrary.js';

// Inicializa la vista de búsqueda
setupSearchForm(async (query) => {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = `<p class="loading">Searching...</p>`;

  try {
    const books = await searchBooks(query);
    renderResults(books);
  } catch (error) {
    resultsContainer.innerHTML = `<p class="error">Error fetching results. Please try again.</p>`;
    console.error(error);
  }
});
