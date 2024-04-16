import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const fetchData = async (url, method = 'GET', data = null) => {
  try {
    const response = await axios({
      method,
      url: `${apiUrl}${url}`,
      data,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getBooks = async () => {
  return await fetchData('/books');
};
export const getBook = async (bookId) => {
  return await fetchData(`/books/${bookId}`);
};

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${apiUrl}/books`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBook = async (newBook) => {
  try {
    const response = await axios.post(`${apiUrl}/books`, newBook);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBook = async (bookId, updateStateFunction) => {
  try {
    const response = await axios.delete(`${apiUrl}/books/${bookId}`);

    if (response.status === 200) { 
      updateStateFunction({ type: 'DELETE_BOOK', bookId }); 
    } else {
      throw new Error(`Error deleting book: ${response.statusText}`); 
    }
  } catch (error) {
    console.error('Error deleting book:', error); 
  }
};

export const updateBook = async (bookId, updatedBook, updateStateFunction) => {
  try {
    const response = await axios.put(`${apiUrl}/books/${bookId}`, updatedBook);

    if (response.status === 200) { 
      updateStateFunction({ type: 'UPDATE_BOOK', bookId, updatedBook });
    } else {
      throw new Error(`Error updating book: ${response.statusText}`); 
    }
  } catch (error) {
    console.error('Error updating book:', error); 
  }
};
