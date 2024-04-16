import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookList.css";
import { fetchBooks } from '../api';
import BookEdit from "./BookEdit";
import BookCreate from "./BookCreate";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editedBookId, setEditedBookId] = useState(null);
  const [error] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getBooks = async () => {
      try {
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    getBooks();
  }, []);

  const handleBookCreated = (createdBook) => {
    setBooks([...books, createdBook]);
  };

  const handleDeleteBook = async (bookId) => { 
    try {
      await axios.delete(`${apiUrl}/books/${bookId}`);
      const updatedBooks = books.filter((book) => book.id !== bookId);
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEditBook = (bookId) => {
    setEditedBookId(bookId);
  };

  const handleEditSubmit = async (updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === editedBookId ? updatedBook : book
    );

    try {
      await axios.put(`${apiUrl}/books/${editedBookId}`, updatedBook);
      setBooks(updatedBooks);
      setEditedBookId(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleEditCancel = () => {
    setEditedBookId(null);
  };

  return (
    <div className="book-list">
      <h1>Reading List</h1>
      {error && <div>Error: {error.message}</div>}
      <ul className="book-cards">
        {books.map((book) => (
          <li key={book.id} className="book-card">
            <div className="book-image">
              <img
                src={`https://picsum.photos/seed/${book.id}/200/300/`}
                alt="Book cover"
              />
              {editedBookId !== book.id && ( 
                <>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                </>
              )}
            </div>
            <div className="book-actions">
              <button onClick={() => handleEditBook(book.id)}>
                <EditOutlined />
              </button>
              <button onClick={() => handleDeleteBook(book.id)}>
                <DeleteOutlined />
              </button>
            </div>
            {editedBookId === book.id && (
              <BookEdit
                key={book.id}
                book={book}
                onEditSubmit={handleEditSubmit}
                onCancel={handleEditCancel}
              />
            )}
          </li>
        ))}
      </ul>
      <BookCreate onBookCreated={handleBookCreated} />
    </div>
  );
};

export default BookList;
