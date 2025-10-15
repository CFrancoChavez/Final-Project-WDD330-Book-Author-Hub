
import { getBookDetails } from './services/googleBooks.js';

/**
 * Handles creation, rendering, and closing of the book detail modal.
 * Integrates data from Open Library and Google Books APIs.
 */
export class BookDetailView {
  constructor() {
    this.modal = null;
  }

  async open(workKey, title, author) {
    // Close any existing modal
    this.close();

    // --- Build the modal structure dynamically ---
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

    // --- Modal elements references ---
    const closeBtn = this.modal.querySelector('.close-btn');
    const desc = this.modal.querySelector('#description');
    const published = this.modal.querySelector('#published');
    const detailCover = this.modal.querySelector('#detail-cover');
    const isbnField = this.modal.querySelector('#isbn');

    // --- Close modal listeners ---
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

  /** Closes and removes the modal from the DOM */
  close() {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }
  }
}
