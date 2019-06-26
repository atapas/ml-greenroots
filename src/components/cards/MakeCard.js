import React from "react"
import Card from 'react-bootstrap/Card';

import '../../styles/bootstrap.min.css';

const MakeCard = (props) => (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
            {props.body}
        </Card.Text>  
      </Card.Body>
      <Card.Footer>
        {props.footer}
      </Card.Footer>
    </Card>
);

export default MakeCard