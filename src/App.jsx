
import React, { Component } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const URL = import.meta.env.VITE_LOCAL_MONGO;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  async fetchBooks() {
    try {
      const response = await axios.get(`${URL}/books`);
      
      this.setState({ books: response.data });
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  }

  render() {
    const { books } = this.state;

    return (
      <>
        <h2>Best Books</h2>
        {books.length > 0 ? (
          <Carousel data-bs-theme="dark">
            {books.map((book, idx) => (
              <Carousel.Item key={idx}>
                <img
                className="d-block w-100"
                src= "https://placehold.co/800x400?text=Hello"
                alt={book.title}/>
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
  }
}

export default App;