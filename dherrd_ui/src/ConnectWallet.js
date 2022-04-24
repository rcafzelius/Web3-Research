import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//https://docs.moralis.io/moralis-dapp/web3-sdk/account#getnfts

function ConnectWallet(props){

    async function connectWallet(){
        const act = await window.ethereum.request({ method: 'eth_requestAccounts' })
        props.setAccounts(act);
    }

    function checkMetaMask(){
        if (window.ethereum){
            return(
                <Button onClick={(e) => connectWallet()}>Connect To MetaMask</Button>
            )
        }
        else{
            return('Please install Metamask')
        }
    }


    return(
        <Container fluid>
            <Row>
                <Col sm={{offset:5}}>
                    <h3>Welcome to DeChat</h3>
                </Col>
            </Row>
            <Row>
                <Col sm={{offset:5}}>
                    {checkMetaMask()}
                </Col>
            </Row>
        </Container>
    )
}

export default ConnectWallet;