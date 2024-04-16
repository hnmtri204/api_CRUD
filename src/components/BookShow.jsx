import React, { useState, useEffect } from "react";
import axios from "axios";


const BookShow = ({ id }) => {
  const [book, setBook] = useState({});
  const [setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}/books/${id}`);
        const fetchedBook = response.data;
        const randomImageUrl = `https://picsum.photos/seed/200/300=${fetchedBook.title}`;
        setBook({ ...fetchedBook, imageUrl: randomImageUrl });
      } catch (error) {
        console.error("Error fetching book:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { title, description, imageUrl } = book;

  return (
    <div className="book-show">
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} />
      <p>{description}</p>
    </div>
  );
};

export default BookShow;

