import React, { useState } from 'react';
import './BookCreate.css';
import { createBook } from '../api';

const BookCreate = ({ onBookCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description) {
      alert('Please enter both title and description');
      return;
    }

    const newBook = {
      title,
      description,
    };

    try {
      const createdBook = await createBook(newBook);
      onBookCreated(createdBook); 
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating book:', error);
      alert('An error occurred while creating the book. Please try again later.');
    }
  };

  return (
    <div className="container_create">
      <div>
        <strong>Add a Book</strong>
      </div>
      <span className="title_mini">Title</span>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={handleChangeTitle} />
        <span className="title_mini">Description</span>
        <input
          className="description_input"
          value={description}
          onChange={handleChangeDescription}
        />
        <button type="submit">Create!</button>
      </form>
    </div>
  );
};

export default BookCreate;
