import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

function ConnectWallet(props){
    let navigate = useNavigate();
    const {
        user,
        authenticate,
        isAuthenticated,
        Moralis
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
        await Moralis.enableWeb3();
        props.setAccounts(user.attributes.ethAddress);
        const hasToken = await fetchNFTs();
        if (hasToken){
            //user is verified, go to feed
            console.log("found token")
            props.setVerified(true);
            navigate("/");
        }else{
            //send user to login, mint token
            console.log("rerouting")
            navigate('/login');
        }
    };

    async function fetchNFTs(){
        // get rinkeby NFTs for user
        const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
          chain: "rinkeby",
        });
        const mintAddr = "0x63352EBE37b7cF82b2c2cEEA8903C049C7B4CD08".toLowerCase();
        const foundToken = testnetNFTs.result.find(nft => nft.token_address === mintAddr)
        if (foundToken){
            return true
        }else{
            return false
        }
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