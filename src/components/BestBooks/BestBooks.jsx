// BestBooks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import BookFormModal from './BookModal';
import EditBookModal from './EditBookModal';
import Alert from 'react-bootstrap/Alert';

import styles from './bestbooks.module.css';

const URL = import.meta.env.VITE_MONGO;
// const API = import.meta.env.VITE_BKEND_API;

// TRUNCATE LONG TEXT
const text_truncate = (str, length, ending) => {
  if (length == null) {
      length = 100;
  }
  if (ending == null) {
      ending = '...';
  }
  if (str && str.length > length) {
      return str.substring(0, length - ending.length) + ending;
  } else {
      return str;
  }
};

const BestBooks = () => {
  const [books, setBooks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // New state to track active index
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedBook, setSelectedBook] = useState('');

  // GET ALL BOOKS IN LIBRARY
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  // ADD BOOK TO LIBRARY
  const handleAddBook = async (bookData) => {
    try {
      const response = await axios.post(`${URL}/addBook`, bookData);
      
      if (response.data) {
        setBooks([...books, response.data]);
      } else {
        setShowAlert(`ERROR: Something went wrong while attempting to add your book`);
      }
    } catch (error) {
      setShowAlert(`ERROR: ${error.message}. Book most likely exists in database.`);
      console.error('Error adding book:', error.message);
    }
  };

  // EDIT BOOK
  const handleEditBook = async (id, bookData) => {
    try {
      const response = await axios.put(`${URL}/books/${id}`, bookData);
      
      if (response.data) {
        console.log(response.data);
        // Find the index of the edited book in the array
        const editedBookIndex = books.findIndex(book => book._id === id);

        // Create a copy of the books array
        const updatedBooks = [...books];

        // Update the book at the found index with the edited data
        updatedBooks[editedBookIndex] = response.data;

        // Set the state with the updated array
        setBooks(updatedBooks);
      } else {
        setShowAlert(`ERROR: Something went wrong while attempting to update your book`);
      }
    } catch (error) {
      setShowAlert(`ERROR: ${error.message}. Book most likely exists in database.`);
      console.error('Error adding book:', error.message);
    }
  };

  // DELETE BOOK FROM LIBRARY
  const handleDeleteBook = async (bookId, currentIndex) => {
    try {
      const response = await axios.delete(`${URL}/books/${bookId}`);
      // Error handling if any status other than a 200 is returned
      if (response.status === 200) {
        const updatedBooks = books.filter((book) => book._id !== bookId);
        setBooks(updatedBooks);

        // Update active index to 0 if the last book is deleted
        if (currentIndex === books.length - 1) {
          setActiveIndex(0);
        }
      } else {
        console.log(response.status, response.statusText);
        setShowAlert(`ERROR ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      setShowAlert(`Error deleting book: ${error.message}`);
      console.error('Error deleting book:', error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // HANDLE MODAL
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowEditModal = (book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setSelectedBook('');
    setShowEditModal(false);
  };

  return (
    <>
      <h2 className={styles.booksHeading}>Best Books</h2>
      <Button variant="primary" onClick={handleShowModal}>
        Add Book
      </Button>

      {/* SHOW ERROR MESSAGE IF DELETE RAISES ERROR */}
      {showAlert
          ? 
            <Alert className={styles.alertP} variant='danger'>
              {showAlert}
              <br/>
              {/* CLOSE ALERT BOX */}
              <Button variant="dark"
                onClick={() => setShowAlert(false)}>
                Close
              </Button>
            </Alert>
          : null}

      {books.length > 0 && (  // Check if there are books to display
        <Carousel
          style={{ width: '80%', margin: 'auto' }}
          activeIndex={activeIndex}  // Set active index
          onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
        >
          {books.map((book, idx) => (
            <Carousel.Item key={idx} className={styles.carouselItem}>
              <img
                className="d-block libImg"
                src={'../../assets/img/library_bg.jpg'}
                alt={book.title}
              />
              <Carousel.Caption className={styles.carouselText}>
                <h5>{book.title}</h5>
                <i className='status'>Status: {book.status}</i>
                <p>{text_truncate(book.description, 150)}</p>
                <div className={styles.modalButtons}>
                  <Button variant="danger" onClick={() => handleDeleteBook(book._id, idx)}>
                    Delete
                  </Button>
                  <Button variant="info" onClick={() => handleShowEditModal(book)}>
                    Update
                  </Button>
                </div>
              </Carousel.Caption>

            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <BookFormModal
        show={showModal}
        handleClose={handleCloseModal}
        handleAddBook={handleAddBook}
      />

{showEditModal
          ?<EditBookModal
        show={showEditModal}
        handleCloseEditModal={handleCloseEditModal}
        handleEditBook={handleEditBook}
        id={selectedBook._id}
        bookTitle={selectedBook.title}
        bookDescription={selectedBook.description}
        bookStatus={selectedBook.status}
      /> : null}
    </>
  );
};

export default BestBooks;
