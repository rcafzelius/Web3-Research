import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { useMoralisWeb3Api } from "react-moralis";
import { dherrdABI } from '../utils/abi';
import { useMoralis } from "react-moralis";
import { BigNumber } from 'ethers';
//add listeners to buttons

function Feed(props){
    const Web3Api = useMoralisWeb3Api();
    const [postData, setPostData] = useState({posts: []});
    const [somethingChanged] = useState(false);
    const {
        Moralis
      } = useMoralis();
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

        async function fetchPosts(){
            const dherrdAddr = '0xDa0C7b1d3C105bB4e03f35A0BABc922eEbD8DD94';
            const totalPostOptions = {
                contractAddress: dherrdAddr,
                functionName: "totalPosts",
                abi: dherrdABI,
                params: {
                    _newMessage: "Hello Moralis",
                  },
            }
            const totalPostCount = await Moralis.executeFunction(totalPostOptions).then(
                (tpc)=>{
                    return tpc.toNumber()
                }
            );
            const options = {
                contractAddress: dherrdAddr,
                functionName: "getPost",
                abi: dherrdABI,
                params: {
                    _id: 1,
                  },
            }
            const message = await Moralis.executeFunction(options)
            const messages = [message]
            console.log(message)
            setPostData({
                ...postData,
                posts: messages
            })
        }
        fetchPosts()
    }, [somethingChanged])

    function handleAddPost(){
        
    }
    function handleUpvote(){
        
    }
    function handleDownvote(){
        
    }
    function getNetLikes(upvotes, downvotes){
            //console.log(upvotes.toNumber())
            try{
                const net = upvotes - downvotes
                console.log(net)
                return net
    
            } catch(TypeError){
                return (2)
            }
    }

    return(
        <Container>
            <Row>
                <Col sm={{offset:5}}>
                    <h3>Welcome to DeChat</h3>
                </Col>
            </Row>
            <ListGroup style={{width: '75%', margin:'auto'}}>
                {postData.posts.map((item,i)=>{
                    return(
                        <ListGroup.Item key={i} className="d-flex justify-content-between align-items-start">
                                {item[1]}
                                <div style={{display: 'flex', flexDirection:'column'}}>
                                    <Button size='sm' variant='outline-*' onClick={(e) => handleUpvote()}>
                                        <FaArrowUp/>
                                    </Button>
                                    <Badge bg='light' text='dark'>{getNetLikes(item.likeCount, item.dislikeCount)}</Badge>
                                    <Button size='sm' variant='outline-*' onClick={(e) => handleDownvote()}>
                                        <FaArrowDown/>
                                    </Button>
                                </div>
                        </ListGroup.Item>
                    )})}
                    <Button size='sm' variant='outline-light' style={{color:'black'}} onClick={(e) => handleAddPost()}>
                        Add Post
                    </Button>
            </ListGroup>
        </Container>
    )
}

export default Feed;