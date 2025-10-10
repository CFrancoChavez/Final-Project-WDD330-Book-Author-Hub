export function setupSearchForm(onSearch) {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if (!query) {
      document.getElementById('results').innerHTML = `<p>Please enter a search term.</p>`;
      return;
    }

    onSearch(query);
  });
}
