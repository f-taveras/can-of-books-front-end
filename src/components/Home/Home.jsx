import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './home.module.css';

function Home(props) {
    return (
        <>
            <section className={styles.overview}>
                <Container fluid>
                    <Row>
                        <Col></Col>

                        <Col xs={12}>
                            <Card>
                                <Card.Body>
                                    Welcome to <span className={styles.nameEmphasis}>Cosmic Library</span>, a curated collection of top-notch books spanning various genres. This application allows users to explore a carefully selected list of books. Each book is presented in a dynamic carousel, showcasing its title, status, and a brief description. Whether you&apos;re an avid reader searching for your next literary adventure or simply curious about must-reads, this app has you covered.
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col></Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Home;