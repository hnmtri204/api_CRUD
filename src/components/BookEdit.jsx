import React, { useState } from "react";

const BookEdit = ({ book, onEditSubmit, onCancel }) => {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description) {
      alert("Please enter both title and description");
      return;
    }

    const updatedBook = {
      ...book,
      title,
      description,
    };

    onEditSubmit(updatedBook);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel(); 
    } else {
      setTitle(book.title);
      setDescription(book.description);
    }
  };

  return (
    <div className="book-edit">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleChangeTitle}
        />
        <input
          id="description"
          value={description}
          onChange={handleChangeDescription}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default BookEdit;
