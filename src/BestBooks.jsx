import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Ensure that your environment variable is correctly set
const URL = import.meta.env.VITE_LOCAL_MONGO || 'default_fallback_value';

const BestBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  return (
    <>
      <h2>Best Books</h2>
      {books.length > 0 ? (
        <Carousel>
          {books.map((book, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                src="https://placehold.co/800x400?text=Hello"
                alt={book.title}
              />
              <Carousel.Caption>
                <h5>{book.title}</h5>
                <p>{book.status}</p>
                <p>{book.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>No books available.</p>
      )}
    </>
  );
};

export default BestBooks;
