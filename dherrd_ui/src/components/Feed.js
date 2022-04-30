import React, {useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { FaArrowUp } from 'react-icons/fa';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { useMoralisWeb3Api } from "react-moralis";

function Feed(props){
    const Web3Api = useMoralisWeb3Api();
    var data = [
        {content:'this is a post', likes:2},
        {content:'this is another post', likes: 10},
        {content:'what a great app', likes: 69}
    ]
    //var oldaddr = "0xB22F31b14092fe1639EBb33c62C3320Fb71Bd9c3"
    //const addr = "0x63352EBE37b7cF82b2c2cEEA8903C049C7B4CD08";
    useEffect(()=>{
        async function fetchNFTs(){
            const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
                chain: "rinkeby",
              });
              console.log(testnetNFTs)
            }
        fetchNFTs()
    }
    
    )
    return(
        <Container>
            <Row>
                <Col sm={{offset:5}}>
                    <h3>Welcome to DeChat</h3>
                </Col>
            </Row>
            <ListGroup style={{width: '75%', margin:'auto'}}>
                {data.map((item,i)=>{
                    return(
                        <ListGroup.Item key={i} className="d-flex justify-content-between align-items-start">
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