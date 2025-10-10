// API secundaria para obtener detalles de autor y portada de alta resolución

export async function getBookDetails(isbn) {
  const endpoint = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    return data.items?.[0]?.volumeInfo || null;
  } catch (error) {
    console.error('Error fetching Google Books data:', error);
    return null;
  }
}
