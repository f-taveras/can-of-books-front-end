import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import BestBooks from './components/BestBooks/BestBooks';
import About from './components/About';
import Home from './components/Home/Home';
import Container from 'react-bootstrap/Container';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        {/* GLOBAL HEADER */}
        <Header />
        {/* ROUTES */}
        <Container fluid className='main'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/books" element={<BestBooks />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </Container>
        {/* GLOBAL FOOTER */}
        <Footer style={{marginTop:'auto'}} />
      </Router>
    </>
  );
}

export default App;
