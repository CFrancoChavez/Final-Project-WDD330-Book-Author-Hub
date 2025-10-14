// import { BookDetailView } from './bookDetailView.js';
// const bookDetailView = new BookDetailView();

// export function renderResults(books) {
//   const container = document.getElementById('results');
//   container.innerHTML = '';

//   if (!books.length) {
//     container.innerHTML = `<p>No results found. Try a different title or author.</p>`;
//     return;
//   }

//   const grid = document.createElement('div');
//   grid.classList.add('results-grid');

//   // Recuperar favoritos previos desde localStorage
//   const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//   books.forEach((book) => {
//     const cover = book.cover_i
//       ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
//       : '/public/placeholder.png';

//     const title = book.title || 'Untitled';
//     const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';

//     const card = document.createElement('div');
//     card.classList.add('book-card');
//     card.innerHTML = `
//       <img src="${cover}" alt="${title}" class="book-cover" />
//       <h3>${title}</h3>
//       <p>${author}</p>
//       <div class="card-actions">
//         <button class="details-btn" data-key="${book.key}">View Details</button>
//         <button class="fav-btn">★ Favorite</button>
//       </div>
//     `;

//     // Mostrar detalle usando la clase BookDetailView
//     card.querySelector('.details-btn').addEventListener('click', () => {
//       bookDetailView.open(book.key, title, author);
//     });

//     // Agregar a favoritos con ISBN y copiar lista completa
//     card.querySelector('.fav-btn').addEventListener('click', async () => {
//       // Evitar duplicados
//       if (favorites.some((f) => f.title === title)) {
//         alert(`"${title}" is already in your favorites.`);
//         return;
//       }

//       // Intentar obtener ISBN desde Open Library
//       let isbn = 'Unavailable';
//       try {
//         const res = await fetch(`https://openlibrary.org${book.key}.json`);
//         if (res.ok) {
//           const data = await res.json();
//           if (data.isbn_13 || data.isbn_10) {
//             isbn = data.isbn_13 ? data.isbn_13[0] : data.isbn_10[0];
//           }
//         }
//       } catch (err) {
//         console.warn('Error fetching ISBN:', err);
//       }

//       // Crear nuevo favorito
//       const newFav = { title, author, isbn };
//       favorites.push(newFav);
//       localStorage.setItem('favorites', JSON.stringify(favorites));

//       // Copiar lista completa al portapapeles
//       const textToCopy = favorites
//         .map((f) => `${f.title} — ${f.author} (ISBN: ${f.isbn})`)
//         .join('\n');
//       await navigator.clipboard.writeText(textToCopy);

//       alert(`"${title}" added to favorites!\nFull list copied to clipboard.`);
//     });

//     grid.appendChild(card);
//   });

//   container.appendChild(grid);
// }
import { BookDetailView } from './bookDetailView.js';
const bookDetailView = new BookDetailView();

export function renderResults(books) {
  const container = document.getElementById('results');
  container.innerHTML = '';

  if (!books.length) {
    container.innerHTML = `<p>No results found. Try a different title or author.</p>`;
    return;
  }

  const grid = document.createElement('div');
  grid.classList.add('results-grid');

  // Recuperar favoritos previos desde localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  books.forEach((book) => {
    const cover = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : '/public/placeholder.png';

    const title = book.title || 'Untitled';
    const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';

    const card = document.createElement('div');
    card.classList.add('book-card');
    card.innerHTML = `
      <img src="${cover}" alt="${title}" class="book-cover" />
      <h3>${title}</h3>
      <p>${author}</p>
      <div class="card-actions">
        <button class="details-btn" data-key="${book.key}">View Details</button>
        <button class="fav-btn">★ Favorite</button>
      </div>
    `;

    // Mostrar detalle
    card.querySelector('.details-btn').addEventListener('click', () => {
      bookDetailView.open(book.key, title, author);
    });

    // Agregar a favoritos con ISBN correcto
    card.querySelector('.fav-btn').addEventListener('click', async () => {
      if (favorites.some((f) => f.title === title)) {
        alert(`"${title}" is already in your favorites.`);
        return;
      }

      let isbn = 'Not available';
      try {
        const editionsRes = await fetch(`https://openlibrary.org${book.key}/editions.json`);
        if (editionsRes.ok) {
          const editionsData = await editionsRes.json();
          const foundEdition = editionsData.entries?.find((e) => e.isbn_10 || e.isbn_13);
          if (foundEdition) {
            isbn = foundEdition.isbn_13?.[0] || foundEdition.isbn_10?.[0] || 'Not available';
          }
        }
      } catch (err) {
        console.warn('Error fetching ISBN for favorite:', err);
      }

      const newFav = { title, author, isbn };
      favorites.push(newFav);
      localStorage.setItem('favorites', JSON.stringify(favorites));

      const textToCopy = favorites
        .map((f) => `${f.title} — ${f.author} (ISBN: ${f.isbn})`)
        .join('\n');
      await navigator.clipboard.writeText(textToCopy);

      alert(`"${title}" added to favorites!\nFull list copied to clipboard.`);
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);
}
