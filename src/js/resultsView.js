
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
//   let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

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

//     // Mostrar detalle
//     card.querySelector('.details-btn').addEventListener('click', () => {
//       bookDetailView.open(book.key, title, author);
//     });

//     // Agregar a favoritos con ISBN correcto
//     card.querySelector('.fav-btn').addEventListener('click', async () => {
//       if (favorites.some((f) => f.title === title)) {
//         alert(`"${title}" is already in your favorites.`);
//         return;
//       }

//       let isbn = 'Not available';
//       try {
//         const editionsRes = await fetch(`https://openlibrary.org${book.key}/editions.json`);
//         if (editionsRes.ok) {
//           const editionsData = await editionsRes.json();
//           const foundEdition = editionsData.entries?.find((e) => e.isbn_10 || e.isbn_13);
//           if (foundEdition) {
//             isbn = foundEdition.isbn_13?.[0] || foundEdition.isbn_10?.[0] || 'Not available';
//           }
//         }
//       } catch (err) {
//         console.warn('Error fetching ISBN for favorite:', err);
//       }

//       const newFav = { title, author, isbn };
//       favorites.push(newFav);
//       localStorage.setItem('favorites', JSON.stringify(favorites));

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
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  books.forEach((book, index) => {
    const cover = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : '/public/placeholder.png';

    const title = book.title || 'Untitled';
    const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';

    // Crear tarjeta con animación + flip
  //   const card = document.createElement('div');
  //   card.classList.add('book-card');
  //   card.style.animationDelay = `${index * 0.08}s`; // Animación escalonada

  //   card.innerHTML = `
  //     <div class="flip-card-inner">
  //       <div class="flip-card-front">
  //         <img src="${cover}" alt="${title}" class="book-cover" />
  //         <h3>${title}</h3>
  //         <p>${author}</p>
  //       </div>
  //       <div class="flip-card-back">
  //         <h3>${title}</h3>
  //         <p><strong>Author:</strong> ${author}</p>
  //         <div class="card-actions">
  //           <button class="details-btn" data-key="${book.key}">View Details</button>
  //           <button class="fav-btn">★ Favorite</button>
  //         </div>
  //       </div>
  //     </div>
  //   `;

  //   // Mostrar detalle con Google Books API
  //   card.querySelector('.details-btn').addEventListener('click', () => {
  //     bookDetailView.open(book.key, title, author);
  //   });

  //   // Agregar a favoritos con ISBN
  //   card.querySelector('.fav-btn').addEventListener('click', async () => {
  //     if (favorites.some((f) => f.title === title)) {
  //       alert(`"${title}" is already in your favorites.`);
  //       return;
  //     }

  //     let isbn = 'Unavailable';
  //     try {
  //       const res = await fetch(`https://openlibrary.org${book.key}.json`);
  //       if (res.ok) {
  //         const data = await res.json();
  //         if (data.isbn_13 || data.isbn_10) {
  //           isbn = data.isbn_13 ? data.isbn_13[0] : data.isbn_10[0];
  //         }
  //       }
  //     } catch (err) {
  //       console.warn('Error fetching ISBN:', err);
  //     }

  //     const newFav = { title, author, isbn };
  //     favorites.push(newFav);
  //     localStorage.setItem('favorites', JSON.stringify(favorites));

  //     const textToCopy = favorites
  //       .map((f) => `${f.title} — ${f.author} (ISBN: ${f.isbn})`)
  //       .join('\n');
  //     await navigator.clipboard.writeText(textToCopy);

  //     alert(`"${title}" added to favorites!\nFull list copied to clipboard.`);
  //   });

  //   grid.appendChild(card);
  // });
  // ... dentro de books.forEach
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


  // Acciones
  card.querySelector('.details-btn').addEventListener('click', () => {
    bookDetailView.open(book.key, title, author);
  });

  card.querySelector('.fav-btn').addEventListener('click', async () => {
    if (favorites.some((f) => f.title === title)) {
      alert(`"${title}" is already in your favorites.`);
      return;
    }

    let isbn = 'Unavailable';
     // *** LÓGICA REFORZADA PARA OBTENER EL ISBN ***
    try {
        // 1. Intentar obtener el objeto principal de la obra (Work) para ver si tiene ISBN
        const workRes = await fetch(`https://openlibrary.org${book.key}.json`);
        const workData = workRes.ok ? await workRes.json() : null;

        // Comprobar si el ISBN está en los datos del Work
        if (workData && (workData.isbn_13 || workData.isbn_10)) {
            // Priorizar ISBN-13, si no existe, usar ISBN-10
            isbn = workData.isbn_13?.[0] || workData.isbn_10?.[0];
            
        } else if (workData) {
            // 2. Si no está en el Work, buscar en la lista de Ediciones
            const editionsRes = await fetch(`https://openlibrary.org${book.key}/editions.json`);
            
            if (editionsRes.ok) {
                const editionsData = await editionsRes.json();
                
                // Buscar la primera edición que tenga ISBN-10 o ISBN-13
                const foundEdition = editionsData.entries?.find(e => e.isbn_10 || e.isbn_13);
                
                if (foundEdition) {
                    // Priorizar ISBN-13, si no existe, usar ISBN-10
                    isbn = foundEdition.isbn_13?.[0] || foundEdition.isbn_10?.[0] || 'Unavailable';
                }
            }
        }
    } catch (err) {
      console.error('Error fetching ISBN for favorite:', err);
      // Mantener isbn = 'Unavailable' si la petición falla completamente
    }
    // *** FIN LÓGICA REFORZADA ***
    // try {
    //   const res = await fetch(`https://openlibrary.org${book.key}.json`);
    //   if (res.ok) {
    //     const data = await res.json();
    //     if (data.isbn_13 || data.isbn_10) {
    //       isbn = data.isbn_13 ? data.isbn_13[0] : data.isbn_10[0];
    //     }
    //   }
    // } catch (err) {
    //   console.warn('Error fetching ISBN:', err);
    // }

    // // Actualizar reverso del flip con ISBN
    // card.querySelector('.flip-card-back p strong + text')?.remove;
    // card.querySelector('.flip-card-back p:nth-of-type(2)').innerHTML = `<strong>ISBN:</strong> ${isbn}`;

    // Guardar en favoritos
    const newFav = { title, author, isbn };
    favorites.push(newFav);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    const textToCopy = favorites.map((f) => `${f.title} — ${f.author} (ISBN: ${f.isbn})`).join('\n');
    await navigator.clipboard.writeText(textToCopy);

    alert(`"${title}" added to favorites!\nFull list copied to clipboard.`);
  });

  grid.appendChild(card);
});

  container.appendChild(grid);
}
