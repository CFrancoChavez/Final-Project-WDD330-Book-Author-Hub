/**
 * Fetches detailed book information from the Google Books API.
 * This includes richer metadata such as high-resolution cover images,
 * full descriptions, and publication dates.
 *
*/
export async function getBookDetails(title, author) {
  const query = encodeURIComponent(`${title} ${author}`);
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();

    if (!data.items || !data.items.length) return null;

    const book = data.items[0].volumeInfo;

    return {
      title: book.title,
      author: book.authors?.join(', '),
      description: book.description,
      image: book.imageLinks?.thumbnail || '/public/placeholder.png',
      publishedDate: book.publishedDate
    };
  } catch (err) {
    console.error('Error fetching Google Books data:', err);
    return null;
  }
}
