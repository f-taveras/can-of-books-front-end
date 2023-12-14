import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const URL = import.meta.env.VITE_LOCAL_MONGO || 'default_fallback_value';

const BestBooks = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBookData, setEditBookData] = useState({});
  const [newBookData, setNewBookData] = useState({
    title: '',
    status: '',
    description: '',
  });

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
      handleCloseModal();
    } catch (error) {
      console.error('Error adding book:', error.message);
    }
  };

  const handleEditBook = async () => {
    try {
      const response = await axios.put(`${URL}/books/${editBookData._id}`, newBookData);
      const updatedBooks = books.map((book) =>
        book._id === editBookData._id ? response.data : book
      );
      setBooks(updatedBooks);
      handleCloseEditModal();
    } catch (error) {
      console.error('Error editing book:', error.message);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`${URL}/books/${bookId}`);
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
  const handleCloseModal = () => {
    setShowModal(false);
    setNewBookData({
      title: '',
      status: '',
      description: '',
    });
  };

  const handleShowEditModal = (book) => {
    
    setShowEditModal(true);
    setEditBookData(book);
    setNewBookData({
      title:book.title,
      status:book.status,
      description:book.description
    })

  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditBookData({});
    setNewBookData({
      title: '',
      status: '',
      description: '',
    });
  };

  return (
    <>
      <h2>Best Books</h2>
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
              <Button variant="info" onClick={() => handleShowEditModal(book)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDeleteBook(book._id)}>
                Delete
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form>
           </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleAddBook(newBookData)}>
            Add Book
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Book</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="editTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={newBookData.title}
          onChange={(e) =>
            setNewBookData({
              ...newBookData,
              title: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group controlId="editStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter status"
          value={newBookData.status}
          onChange={(e) =>
            setNewBookData({
              ...newBookData,
              status: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group controlId="editDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter description"
          value={newBookData.description}
          onChange={(e) =>
            setNewBookData({
              ...newBookData,
              description: e.target.value,
            })
          }
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseEditModal}>
      Close
    </Button>
    <Button variant="primary" onClick={handleEditBook}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>;
    </>
  );
};

export default BestBooks;
