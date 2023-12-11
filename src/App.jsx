import axios from 'axios';
import React, {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

let SERVER = import.meta.env.MONGO_URI;


function App(){
  
  const [books, setBooks] = useState([]);

    async function getBooks(){
      try {
        let response = await axios.get(`${SERVER}/books`)
        setBooks(response.data);
      }catch(error) {console.error(error.message)};
    }




    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks />}
            >
            </Route>
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
          </Routes>
          <Footer />
        </Router>
      </>
    )
  
}

export default App;
