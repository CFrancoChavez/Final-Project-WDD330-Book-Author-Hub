// const listContainer = document.getElementById('favorites-list');
// const downloadTxt = document.getElementById('download-txt');
// const downloadJson = document.getElementById('download-json');

// // Cargar favoritos desde localStorage o inicializar vacío
// const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// // Renderiza la lista de favoritos
// function renderFavorites() {
//   if (!listContainer) return; // seguridad

//   if (!favorites.length) {
//     listContainer.innerHTML = `
//       <p class="no-results">No favorites yet. Go back and add some!</p>
//     `;
//     if (downloadTxt) downloadTxt.style.display = 'none';
//     if (downloadJson) downloadJson.style.display = 'none';
//     return;
//   }

//   const grid = document.createElement('div');
//   grid.classList.add('results-grid');

//   favorites.forEach((f) => {
//     const card = document.createElement('div');
//     card.classList.add('book-card');
//     card.innerHTML = `
//       <h3>${f.title}</h3>
//       <p>${f.author || 'Unknown Author'}</p>
//       ${f.isbn ? `<small class="small-muted">ISBN: ${f.isbn}</small>` : ''}
//     `;
//     grid.appendChild(card);
//   });

//   listContainer.innerHTML = '';
//   listContainer.appendChild(grid);
// }

// // Descarga TXT
// if (downloadTxt) {
//   downloadTxt.addEventListener('click', () => {
//     const content = favorites
//       .map((f) => `${f.title} — ${f.author || 'Unknown'}${f.isbn ? ` (ISBN: ${f.isbn})` : ''}`)
//       .join('\n');

//     const blob = new Blob([content], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'favorites.txt';
//     a.click();
//     URL.revokeObjectURL(url);
//   });
// }

// // Descarga JSON
// if (downloadJson) {
//   downloadJson.addEventListener('click', () => {
//     const blob = new Blob([JSON.stringify(favorites, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'favorites.json';
//     a.click();
//     URL.revokeObjectURL(url);
//   });
// }
// // Botón para limpiar favoritos
// const clearBtn = document.createElement('button');
// clearBtn.textContent = '🗑️ Clear Favorites';
// clearBtn.classList.add('clear-favs-btn');
// clearBtn.addEventListener('click', () => {
//   if (confirm('Are you sure you want to delete all favorites?')) {
//     localStorage.removeItem('favorites');
//     listContainer.innerHTML = '<p>All favorites cleared.</p>';
//     downloadTxt.style.display = 'none';
//     downloadJson.style.display = 'none';
//     clearBtn.style.display = 'none';
//   }
// });
// document.querySelector('main').prepend(clearBtn);

// // Render inicial
// renderFavorites();
const listContainer = document.getElementById('favorites-list');
const downloadTxt = document.getElementById('download-txt');
const downloadJson = document.getElementById('download-json');

// Cargar favoritos desde localStorage o inicializar vacío
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Renderiza la lista de favoritos
function renderFavorites() {
  if (!listContainer) return; // seguridad

  if (!favorites.length) {
    listContainer.innerHTML = `
      <p class="no-results">No favorites yet. Go back and add some!</p>
    `;
    if (downloadTxt) downloadTxt.style.display = 'none';
    if (downloadJson) downloadJson.style.display = 'none';
    return;
  }

  // No necesitamos crear un div 'grid' extra, usamos el 'favorites-container' del HTML
  listContainer.innerHTML = ''; // Limpiar el contenedor principal

  favorites.forEach((f) => {
    const card = document.createElement('div');
    
    // *** CAMBIO CLAVE: Usar la nueva clase CSS 'favorite-card' ***
    card.classList.add('favorite-card'); 
    
    card.innerHTML = `
      <h3 class="fav-title">${f.title}</h3>
      <p class="fav-author">${f.author || 'Unknown Author'}</p>
      ${f.isbn ? `<small class="fav-isbn">ISBN: ${f.isbn}</small>` : ''}
    `;
    
    // Agregar la tarjeta directamente al contenedor de la lista
    listContainer.appendChild(card);
  });
}

// Descarga TXT
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

// Descarga JSON
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

// Botón para limpiar favoritos
const clearBtn = document.createElement('button');
clearBtn.textContent = '🗑️ Clear Favorites';
clearBtn.classList.add('clear-favs-btn');
clearBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all favorites?')) {
    localStorage.removeItem('favorites');
    listContainer.innerHTML = '<p>All favorites cleared.</p>';
    // También debes limpiar el array 'favorites' en memoria para que no intente renderizar
    favorites.length = 0; 
    downloadTxt.style.display = 'none';
    downloadJson.style.display = 'none';
    clearBtn.style.display = 'none';
  }
});

// Añadir el botón de limpiar al inicio del main
document.querySelector('main').prepend(clearBtn);

// Render inicial
renderFavorites();