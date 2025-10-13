const listContainer = document.getElementById('favorites-list');
const downloadTxt = document.getElementById('download-txt');
const downloadJson = document.getElementById('download-json');

const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function renderFavorites() {
  if (!favorites.length) {
    listContainer.innerHTML = '<p>No favorites yet. Go back and add some!</p>';
    downloadTxt.style.display = 'none';
    downloadJson.style.display = 'none';
    return;
  }

  listContainer.innerHTML = `
    <ul class="favorites-ul">
      ${favorites
        .map(
          (f) => `
        <li>
          <strong>${f.title}</strong><br>
          <em>${f.author}</em><br>
          <small>ISBN: ${f.isbn}</small>
        </li>
      `
        )
        .join('')}
    </ul>
  `;
}

// Descarga TXT
downloadTxt.addEventListener('click', () => {
  const blob = new Blob(
    [favorites.map(f => `${f.title} — ${f.author} (ISBN: ${f.isbn})`).join('\n')],
    { type: 'text/plain' }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'favorites.txt';
  a.click();
  URL.revokeObjectURL(url);
});

// Descarga JSON
downloadJson.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(favorites, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'favorites.json';
  a.click();
  URL.revokeObjectURL(url);
});

renderFavorites();
