import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

//https://docs.moralis.io/moralis-dapp/web3-sdk/account#getnfts

function ConnectWallet(props){
    let navigate = useNavigate();
    const {
        authenticate,
        isAuthenticated,
        isAuthenticating,
        user,
        account,
        logout
      } = useMoralis();
      const Web3Api = useMoralisWeb3Api();

      async function login(){
        if (!isAuthenticated) {
          await authenticate({ signingMessage: "Log in using Moralis" })
            .then(function (user) {
              console.log("logged in user:", user);
              console.log(user.get("ethAddress"));
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        else{
            fetchNFTs();
        }
      };
    async function connectWallet(){
        const act = await window.ethereum.request({ method: 'eth_requestAccounts' })
        props.setAccounts(act);
        navigate('/login');      //add token check here and redirect accordingly
    }

    async function fetchNFTs(){
        // get rinkeby NFTs for user
        const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
          chain: "rinkeby",
        });
        console.log(testnetNFTs.result[0]);
      };

    function checkMetaMask(){
        if (window.ethereum){
            return(
                <Button onClick={(e) => login()}>Connect To MetaMask</Button>
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