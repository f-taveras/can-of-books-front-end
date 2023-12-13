import { Component } from "react";
import Card from 'react-bootstrap/Card';

class Profile extends Component {

  render() {
    
    return (

<>
<h1 style={{ textAlign: 'center' }}>Meet our Team</h1>

<div 
  style={{
    display:"flex",
    justifyContent:"center",
    gap: "1em"
}}>
<Card border="secondary" style={{ width: '18rem', marginBottom: '10px' }}>
      <Card.Body>
        <Card.Title>Ekow Yawson</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Back-End</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="https://github.com/ekowyawson">GitHub</Card.Link>
        <Card.Link href="https://www.linkedin.com/in/ekowyawson71/">LinkedIn</Card.Link>
      </Card.Body>
    </Card>
    <Card border="danger" style={{ width: '18rem', marginBottom: '10px' }}>
      <Card.Body>
        <Card.Title>Felix A. Taveras</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Front-End</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="https://github.com/f-taveras">GitHub</Card.Link>
        <Card.Link href="https://www.linkedin.com/in/f-taveras">LinkedIn</Card.Link>
      </Card.Body>
    </Card>
    </div>
    </>

    )
  }
}

export default Profile;
