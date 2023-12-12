
import React, { Component } from 'react';
import axios from 'axios';


const URL = import.meta.env.VITE_URL;

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
      console.log(reponse.data);
      this.setState({ books: response.data });
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  }

  render() {
    const { books } = this.state;

    return (
      <div>
        <h2>Best Books</h2>
        {books.lenght > 0 ? (
          

          <ul>
            {books.map((book,idx) => (
              <li key={idx}>{book.title}</li>
            ))}
          </ul>
        ) : (
          <p>Out of luck, nothing in the library!</p>
        )}
      </div>
    );
  }
}

export default App;