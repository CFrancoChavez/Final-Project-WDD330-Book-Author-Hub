// Fetches book data from the Open Library API
// Uses query parameter to search by title, author, or keyword
export async function searchBooks(query) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    return data.docs.slice(0, 20);
  } catch (error) {
    console.error('Error fetching Open Library data:', error);
    throw error;
  }
}
