import React, {useState} from 'react';
import mintABI from '../utils/abi';
import GoogleLogin from 'react-google-login';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from "react-router-dom";
import { useMoralis } from "react-moralis";

function Login(props){
    const [resultText, setResultText] = useState("");
    const {
        Moralis
      } = useMoralis();
    let navigate = useNavigate();
    const handleFailure = (result) => {
        setResultText("Must use a bc.edu account");
    };

    async function handleLogin(googleData){
        await Moralis.enableWeb3();
        const mintAddr = "0x63352EBE37b7cF82b2c2cEEA8903C049C7B4CD08";
        const options = {
            contractAddress: mintAddr,
            functionName: "mint",
            abi: mintABI,
        }
        const message = await Moralis.executeFunction(options)
        console.log(message, "mint complete")
        setResultText("");
        props.setVerified(true);
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