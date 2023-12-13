import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Ensure that your environment variable is correctly set
const URL = import.meta.env.VITE_LOCAL_MONGO || 'default_fallback_value';

const BestBooks = () => {
  const [books, setBooks] = useState([]);
  const [description,setDescription] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetchBooks();
  }, []);

const handleChange = (e) => {
  let name = e.target.name;
  let value = e.target.value;


  if (name === "title"){setTitle(value);}
  if (name === "description"){setDescription(value);}
}

const handleSubmit = async (e) => {
  e.preventDefault();
  let book = {title, description};
  console.log("books sent", book)

  let response = await axios.post(`${URL}/addBooks?title=${title}&description=${description}`)
  console.log("server response", response.data)

  setBooks([...books, response.data])
}

const handleDelete = async (e) => {
  console.log("Delete", e.target.id);
  let response = await axios.delete(`${URL}/books/${e.target.id}`)
  let deletedBookId = e.target.id;  // Renamed the variable for clarity
  let newBooks = books.filter((book) => {
    return book._id !== deletedBookId;  // Updated to use the renamed variable
  });
  setBooks(newBooks);
}

useEffect(() => {

  console.log("done mounting")
  fetchBooks();
  return () => {
    console.log("Peace out! Unmounted")
  }
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
        <Carousel 
          style={{
            width: "60%",
            margin: "auto"
            }}>
          {books.map((book, idx) => (
            <Carousel.Item  key={idx}>
              <img 
                className="d-block w-100"
                src={`https://placehold.co/800x400?text=${book.title}`}
                alt={book.title}
              />
              <Carousel.Caption>
                <h5>{book.title}</h5>
                <p>{book.status}</p>
                <p>{book.description}</p>
                <span id={book._id} onClick={handleDelete} style={{marginLeft: '.5em', color:'red', cursor:'pointer'}}> Delete book </span>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>No books available.</p>
      )}

      <hr />
      <form style={{textAlign:'center'}}onSubmit={handleSubmit}>
        <input name='title' placeholder='Book title' onChange={handleChange} />
        <input name='description' placeholder='Type a description' onChange={handleChange} />
        <button type='submit'>Add Book!</button>
      </form>
      <hr />
    </>
  );
};

export default BestBooks;
