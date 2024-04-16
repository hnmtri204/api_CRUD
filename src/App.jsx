import React, { useState } from "react";
import axios from "axios";
import { fetchBooks } from './api';
import BookList from "./components/BookList";

const App = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  // const [createdBook, setCreatedBook] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const
   handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`${apiUrl}/books/${bookId}`);
      const updatedBooks = books.filter((book) => book.id !== bookId);
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error deleting book:", error);
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <BookList books={books} onDeleteBook={handleDeleteBook} fetchBooks={fetchBooks} />
    </div>
  );
};

export default App;
