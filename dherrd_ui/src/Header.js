import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

function Header(props){
    const wallet_addr = '0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B'
    return(
        <Container fluid>
            <Row style={{backgroundColor:'#98002E', color:'white'}}>
                <Col><h1>DeChat</h1></Col>
                <Col sm={6}/>
                <Col>
                    <Badge bg='light' text='dark'>
                    <h6>{wallet_addr}</h6>
                    </Badge>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default Header;