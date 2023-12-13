import { Component } from "react";
import Card from 'react-bootstrap/Card';

class Profile extends Component {

  render() {
    
    return (

<>
<h1 style={{ textAlign: 'center' }}>Meet our Team</h1>
<Card border="secondary" style={{ width: '18rem', marginBottom: '10px' }}>
      <Card.Body>
        <Card.Title>Ekow Yawson</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Back-End</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">GitHub</Card.Link>
        <Card.Link href="#">LinkedIn</Card.Link>
      </Card.Body>
    </Card>
    <Card border="danger" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
    </>

    )
  }
}

export default Profile;
