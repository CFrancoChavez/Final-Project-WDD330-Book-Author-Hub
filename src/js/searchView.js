/**
 * Initializes and manages the main search form interaction.
 * Delegates the query handling to a callback function (onSearch)
 * which allows flexible integration with other modules.
*/
export function setupSearchForm(onSearch) {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();

    // --- Prevent empty searches ---
    if (!query) {
      document.getElementById('results').innerHTML = `<p>Please enter a search term.</p>`;
      return;
    }

    // --- Execute callback function provided by app.js ---
    onSearch(query);
  });
}
