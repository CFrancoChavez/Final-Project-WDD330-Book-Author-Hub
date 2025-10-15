

import { BookDetailView } from './bookDetailView.js';
const bookDetailView = new BookDetailView();

/**
 * Dynamically renders the book search results returned from the Open Library API.
 * Handles UI interactions for viewing details and adding books to favorites.
 */
export function renderResults(books) {
  const container = document.getElementById('results');
  container.innerHTML = '';
  
  // --- Handle empty results ---
  if (!books.length) {
    container.innerHTML = `<p>No results found. Try a different title or author.</p>`;
    return;
  }
  // --- Create grid container for results ---
  const grid = document.createElement('div');
  grid.classList.add('results-grid');

  // --- Retrieve previously saved favorites ---
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  // --- Iterate through search results ---
  books.forEach((book, index) => {
    // Default cover image if no cover is available
    const cover = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : '/public/placeholder.png';

    const title = book.title || 'Untitled';
    const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';

// --- Create book card with flip effect ---   
const card = document.createElement('div');
card.classList.add('book-card');
card.innerHTML = `
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <img src="${cover}" alt="${title}" class="book-cover" />
      <h3>${title}</h3>
      <p>${author}</p>
      </div>
    <div class="flip-card-back">
      <h3>${title}</h3>
      <p><strong>Author:</strong> ${author}</p>
      
      <p class="small-muted">Click “View Details” for more info</p>
      
      <div class="card-actions">
        <button class="details-btn" data-key="${book.key}">View Details</button>
        <button class="fav-btn">★ Favorite</button>
      </div>
      
    </div>
  </div>
`;


  // --- "View Details" button opens modal with extended info ---
  card.querySelector('.details-btn').addEventListener('click', () => {
    bookDetailView.open(book.key, title, author);
  });
  // --- "Favorite" button adds the book to LocalStorage ---
  card.querySelector('.fav-btn').addEventListener('click', async () => {
    if (favorites.some((f) => f.title === title)) {
      alert(`"${title}" is already in your favorites.`);
      return;
    }

    let isbn = 'Unavailable';
     
    try {
        // 1. Check if the main Work contains ISBN info
        const workRes = await fetch(`https://openlibrary.org${book.key}.json`);
        const workData = workRes.ok ? await workRes.json() : null;

        
        if (workData && (workData.isbn_13 || workData.isbn_10)) {
            
            isbn = workData.isbn_13?.[0] || workData.isbn_10?.[0];
            
        } else if (workData) {
            // 2. If not, check the Editions endpoint for ISBN
            const editionsRes = await fetch(`https://openlibrary.org${book.key}/editions.json`);
            
            if (editionsRes.ok) {
                const editionsData = await editionsRes.json();
                
                
                const foundEdition = editionsData.entries?.find(e => e.isbn_10 || e.isbn_13);
                
                if (foundEdition) {
                    
                    isbn = foundEdition.isbn_13?.[0] || foundEdition.isbn_10?.[0] || 'Unavailable';
                }
            }
        }
    } catch (err) {
      console.error('Error fetching ISBN for favorite:', err);
      
    }
    
    // --- Save new favorite ---
    const newFav = { title, author, isbn };
    favorites.push(newFav);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // --- Copy full list to clipboard (for UX convenience) ---
    const textToCopy = favorites.map((f) => `${f.title} — ${f.author} (ISBN: ${f.isbn})`).join('\n');
    await navigator.clipboard.writeText(textToCopy);

    alert(`"${title}" added to favorites!\nFull list copied to clipboard.`);
  });

  grid.appendChild(card);
});

  container.appendChild(grid);
}
