import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

function Header(props){
    function getAddr(){
        if (props.accounts === ''){
            return('No Wallet Connected')
        }
        else{
            return(props.accounts[0])
        }
    }
    return(
        <Container fluid>
            <Row style={{backgroundColor:'#98002E', color:'white'}}>
                <Col><h1>DeChat</h1></Col>
                <Col sm={6}/>
                <Col>
                    <Badge bg='light' text='dark'>
                    <h6>{getAddr()}</h6>
                    </Badge>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default Header;