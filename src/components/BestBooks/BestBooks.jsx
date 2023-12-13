// BestBooks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import BookFormModal from './BookModal';

import styles from './bestbooks.module.css';

const URL = import.meta.env.VITE_LOCAL_MONGO;
// const API = import.meta.env.VITE_BKEND_API;

const BestBooks = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  const handleAddBook = async (bookData) => {
    try {
      const response = await axios.post(`${URL}/addBook`, bookData);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error('Error adding book:', error.message);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await axios.delete(`${URL}/books/${bookId}`);
      const updatedBooks = books.filter((book) => book._id !== bookId);
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error deleting book:', error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <h2 className={styles.booksHeading}>Best Books</h2>
      <Button variant="primary" onClick={handleShowModal}>
        Add Book
      </Button>

      <Carousel style={{ width: '60%', margin: 'auto' }}>
        {books.map((book, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={`https://placehold.co/800x400?text=${book.title}`}
              alt={book.title}
            />
            <Carousel.Caption>
              <h5>{book.title}</h5>
              <p>{book.status}</p>
              <p>{book.description}</p>
              <Button variant="danger" onClick={() => handleDeleteBook(book._id)}>
                Delete
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <BookFormModal
        show={showModal}
        handleClose={handleCloseModal}
        handleAddBook={handleAddBook}
      />
    </>
  );
};

export default BestBooks;
