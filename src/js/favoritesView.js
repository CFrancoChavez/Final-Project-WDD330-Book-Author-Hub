
const listContainer = document.getElementById('favorites-list');
const downloadTxt = document.getElementById('download-txt');
const downloadJson = document.getElementById('download-json');

// Load favorites from localStorage
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

/** Render all favorites as cards inside the list container */
function renderFavorites() {
  if (!listContainer) return; 

  if (!favorites.length) {
    listContainer.innerHTML = `
      <p class="no-results">No favorites yet. Go back and add some!</p>
    `;
    if (downloadTxt) downloadTxt.style.display = 'none';
    if (downloadJson) downloadJson.style.display = 'none';
    return;
  }

  
  listContainer.innerHTML = ''; 

  favorites.forEach((f) => {
    const card = document.createElement('div');
    
    
    card.classList.add('favorite-card'); 
    
    card.innerHTML = `
      <h3 class="fav-title">${f.title}</h3>
      <p class="fav-author">${f.author || 'Unknown Author'}</p>
      ${f.isbn ? `<small class="fav-isbn">ISBN: ${f.isbn}</small>` : ''}
    `;
    
    
    listContainer.appendChild(card);
  });
}

// --- Download favorites as TXT file
if (downloadTxt) {
  downloadTxt.addEventListener('click', () => {
    const content = favorites
      .map((f) => `${f.title} — ${f.author || 'Unknown'}${f.isbn ? ` (ISBN: ${f.isbn})` : ''}`)
      .join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favorites.txt';
    a.click();
    URL.revokeObjectURL(url);
  });
}

// --- Download favorites as JSON file ---
if (downloadJson) {
  downloadJson.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(favorites, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favorites.json';
    a.click();
    URL.revokeObjectURL(url);
  });
}

// --- Clear Favorites Button ---
const clearBtn = document.createElement('button');
clearBtn.textContent = '🗑️ Clear Favorites';
clearBtn.classList.add('clear-favs-btn');
clearBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all favorites?')) {
    localStorage.removeItem('favorites');
    listContainer.innerHTML = '<p>All favorites cleared.</p>';
    
    favorites.length = 0; 
    downloadTxt.style.display = 'none';
    downloadJson.style.display = 'none';
    clearBtn.style.display = 'none';
  }
});

// Add clear button to the top of the main section
document.querySelector('main').prepend(clearBtn);

// Initial Render 
renderFavorites();