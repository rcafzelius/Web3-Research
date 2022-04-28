import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from "react-router-dom";

//https://docs.moralis.io/moralis-dapp/web3-sdk/account#getnfts

function Login(props){
    const [resultText, setResultText] = useState("");
    let navigate = useNavigate();
    const handleFailure = (result) => {
        setResultText("Must use a bc.edu account");
    };

    function handleLogin(googleData){
        console.log(googleData);
        setResultText("");
        props.setVerified(true);
        //mint token here
        navigate("/");
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
                    <GoogleLogin
                    clientId='849236676250-hr5lnqfpond071mpsa8vfn3f80gom5h6.apps.googleusercontent.com'
                    buttonText='Login with Google'
                    onSuccess={handleLogin}
                    onFailure={handleFailure}
                    />
                </Col>
            </Row>
            <Row>
            <Col sm={{offset:5}} style={{color:"red"}}>
                    {resultText}
                </Col>
            </Row>
        </Container>
    )
}

export default Login;