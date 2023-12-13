import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import styles from './footer.module.css';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className={styles.footer}>
          <Navbar.Brand className={styles.footerText}>&copy; Taveras & Yawson Inc. </Navbar.Brand>
        </Navbar>
      </footer>
    )
  }
}

export default Footer;
