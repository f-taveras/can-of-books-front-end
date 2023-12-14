// BookFormModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const BookFormModal = ({ show, handleClose, handleAddBook }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddBook({ title, description });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name='title'
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name='description'
              placeholder="Enter book description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              name='status'
              type="text"
              value='Available'
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Book
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookFormModal;
