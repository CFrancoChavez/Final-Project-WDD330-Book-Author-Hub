// import { getBookDetails } from './services/googleBooks.js';

// /**
//  * Clase que maneja la creación, renderizado y cierre del modal de detalle de libro.
//  * Encapsula toda la lógica dentro de una instancia segura y reutilizable.
//  */
// export class BookDetailView {
//   constructor() {
//     this.modal = null;
//   }

//   /**
//    * Abre el modal con la información del libro.
//    * @param {string} bookKey - Clave del libro en Open Library.
//    * @param {string} title - Título del libro.
//    * @param {string} author - Autor del libro.
//    */
//   async open(bookKey, title, author) {
//     // Cerrar cualquier modal abierto
//     this.close();

//     // Crear modal
//     this.modal = document.createElement('div');
//     this.modal.classList.add('modal');
//     this.modal.innerHTML = `
//       <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="book-title">
//         <button class="close-btn" aria-label="Close details">&times;</button>
//         <img src="" alt="Book cover" class="detail-cover" id="detail-cover" />
//         <div class="book-info">
//           <h2 id="book-title">${title}</h2>
//           <p class="meta"><strong>Author:</strong> ${author}</p>
//           <p class="meta" id="published"></p>
//           <p class="desc" id="description">Loading details...</p>
//         </div>
//       </div>
//     `;
//     document.body.appendChild(this.modal);

//     // Referencias internas
//     const closeBtn = this.modal.querySelector('.close-btn');
//     const desc = this.modal.querySelector('#description');
//     const published = this.modal.querySelector('#published');
//     const detailCover = this.modal.querySelector('#detail-cover');

//     // Listeners
//     closeBtn.addEventListener('click', () => this.close());
//     this.modal.addEventListener('click', (e) => {
//       if (e.target === this.modal) this.close();
//     });

//     document.addEventListener('keydown', (e) => {
//       if (e.key === 'Escape') this.close();
//     });

//     // Fetch de detalles desde Google Books
//     try {
//       const info = await getBookDetails(title, author);
//       if (!info) {
//         desc.textContent = 'No extra details found for this book.';
//         detailCover.src = '/public/placeholder.png';
//         return;
//       }

//       // Renderizar datos
//       detailCover.src = info.image || '/public/placeholder.png';
//       detailCover.alt = `${title} cover`;
//       published.textContent = info.publishedDate
//         ? `Published: ${info.publishedDate}`
//         : '';
//       desc.textContent = info.description || 'No description available.';
//     } catch (error) {
//       console.error('Error loading book details:', error);
//       desc.textContent = 'Failed to load details.';
//     }
//   }

//   /** Cierra el modal si existe. */
//   close() {
//     if (this.modal) {
//       this.modal.remove();
//       this.modal = null;
//     }
//   }
// }
import { getBookDetails } from './services/googleBooks.js';

/**
 * Clase que maneja la creación, renderizado y cierre del modal de detalle de libro.
 * Integra datos de Open Library y Google Books.
 */
export class BookDetailView {
  constructor() {
    this.modal = null;
  }

  async open(workKey, title, author) {
    // Cierra cualquier modal previo
    this.close();

    // Crear estructura básica del modal
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.innerHTML = `
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="book-title">
        <button class="close-btn" aria-label="Close details">&times;</button>
        <img src="" alt="Book cover" class="detail-cover" id="detail-cover" />
        <div class="book-info">
          <h2 id="book-title">${title}</h2>
          <p class="meta"><strong>Author:</strong> ${author}</p>
          <p class="meta" id="isbn"></p>
          <p class="meta" id="published"></p>
          <p class="desc" id="description">Loading details...</p>
        </div>
      </div>
    `;
    document.body.appendChild(this.modal);

    const closeBtn = this.modal.querySelector('.close-btn');
    const desc = this.modal.querySelector('#description');
    const published = this.modal.querySelector('#published');
    const detailCover = this.modal.querySelector('#detail-cover');
    const isbnField = this.modal.querySelector('#isbn');

    closeBtn.addEventListener('click', () => this.close());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });

    // ---- Fetch Google Books details ----
    let googleInfo = null;
    try {
      googleInfo = await getBookDetails(title, author);
    } catch (err) {
      console.warn('Google Books API failed:', err);
    }

    // ---- Fetch ISBN from Open Library ----
    let isbn = 'Not available';
    try {
      const editionsRes = await fetch(`https://openlibrary.org${workKey}/editions.json`);
      if (editionsRes.ok) {
        const editionsData = await editionsRes.json();
        const foundEdition = editionsData.entries?.find((e) => e.isbn_10 || e.isbn_13);
        if (foundEdition) {
          isbn = foundEdition.isbn_13?.[0] || foundEdition.isbn_10?.[0] || 'Not available';
        }
      }
    } catch (err) {
      console.warn('Error fetching ISBN:', err);
    }

    // ---- Render final data ----
    detailCover.src = googleInfo?.image || '/public/placeholder.png';
    detailCover.alt = `${title} cover`;
    desc.textContent = googleInfo?.description || 'No description available.';
    published.textContent = googleInfo?.publishedDate ? `Published: ${googleInfo.publishedDate}` : '';
    isbnField.textContent = `ISBN: ${isbn}`;
  }

  close() {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }
  }
}
