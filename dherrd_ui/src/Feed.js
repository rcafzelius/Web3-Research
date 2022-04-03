import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import { FaArrowUp } from 'react-icons/fa';

function Feed(props){
    var data = [{content:'this is a post', likes:2},
    {content:'this is another post', likes: 10},
    {content:'what a great app', likes: 69}
    ]
    return(
        <Container>
            <Row><h1>Welcome to DeChat</h1></Row>
            {data.map(item=>{
                return(
                    <Row>
                        {item.content}
                        {item.likes}
                        <Button size='sm' variant='outline-*'>
                            <FaArrowUp/>
                        </Button>
                    </Row>
                )
            })}
        </Container>
    )
}

export default Feed;