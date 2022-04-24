import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { FaArrowUp } from 'react-icons/fa';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

function Feed(props){
    var data = [
        {content:'this is a post', likes:2},
        {content:'this is another post', likes: 10},
        {content:'what a great app', likes: 69}
    ]
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
      }
    return(
        <Container>
            <Row>
                <Col sm={{offset:5}}>
                    <h3>Welcome to DeChat</h3>
                </Col>
            </Row>
            <ListGroup style={{width: '75%', margin:'auto'}}>
                {data.map(item=>{
                    return(
                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                {item.content}
                                <div style={{display: 'flex', flexDirection:'column'}}>
                                    <Button size='sm' variant='outline-*'>
                                        <FaArrowUp/>
                                    </Button>
                                    <Badge bg='light' text='dark'>{item.likes}</Badge>
                                </div>
                        </ListGroup.Item>
                    )})}
            </ListGroup>
        </Container>
    )
}

export default Feed;