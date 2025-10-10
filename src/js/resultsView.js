export function renderResults(books) {
  const container = document.getElementById('results');
  container.innerHTML = '';

  if (!books.length) {
    container.innerHTML = `<p>No results found. Try a different title or author.</p>`;
    return;
  }

  const grid = document.createElement('div');
  grid.classList.add('results-grid');

  books.forEach((book) => {
    const cover = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : '/public/placeholder.png';

    const card = document.createElement('div');
    card.classList.add('book-card');
    card.innerHTML = `
      <img src="${cover}" alt="${book.title}" class="book-cover">
      <h3>${book.title}</h3>
      <p>${book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
      <button class="details-btn" data-key="${book.key}">View Details</button>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);
}
