import React, { useEffect, useState } from 'react';
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
//add listeners to buttons

function Feed(props) {
    const dherrdAddr = '0xB1aFCe26F1b78d98c55cd40F91af56048ef09140';
    const Web3Api = useMoralisWeb3Api();
    const [postData, setPostData] = useState({ posts: [] });
    const [commentData, setCommentData] = useState({ comments: {} })
    const [toggleAddPost, setToggleAddPost] = useState(false);
    const [newPost, setNewPost] = useState('');
    const [toggleAddComment, setToggleAddComment] = useState({ state: false, row: '' });
    const [newComment, setNewComment] = useState({ row: '', comment: '' });
    const [somethingChanged, setSomethingChanged] = useState(false);
    const {
        Moralis
    } = useMoralis();
    //const oldaddr = "0xB22F31b14092fe1639EBb33c62C3320Fb71Bd9c3"
    //const addr = "0x63352EBE37b7cF82b2c2cEEA8903C049C7B4CD08";
    useEffect(() => {
        async function fetchNFTs() {
            const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
                chain: "rinkeby",
            });
            console.log(testnetNFTs)
        }
        fetchNFTs()

        async function fetchPosts() {
            //fetch posts
            const totalPostOptions = {
                contractAddress: dherrdAddr,
                functionName: "totalPosts",
                abi: dherrdABI,
            }
            const totalPostCount = await Moralis.executeFunction(totalPostOptions).then(
                (tpc) => {
                    return tpc.toNumber()
                }
            );
            const messages = []
            const allComments = {}
            for (let i = totalPostCount; i > 0; i--) {
                const postOptions = {
                    contractAddress: dherrdAddr,
                    functionName: "getPost",
                    abi: dherrdABI,
                    params: {
                        _id: i,
                    },
                }
                const message = await Moralis.executeFunction(postOptions)
                const totalComments = message.totalComments
                const comments = []
                for (let j = totalComments; j > 0; j--) {
                    const commentOptions = {
                        contractAddress: dherrdAddr,
                        functionName: "getComment",
                        abi: dherrdABI,
                        params: {
                            _postId: i,
                            _commentId: j,
                        },
                    }
                    const comment = await Moralis.executeFunction(commentOptions)
                    comments.push(comment)
                }
                allComments[i] = comments
                messages.push(message)
            }


            console.log(messages)
            console.log(allComments)
            setCommentData({
                ...commentData,
                comments: allComments
            })
            setPostData({
                ...postData,
                posts: messages
            })
        }
        fetchPosts()
        //setSomethingChanged(false)
    }, [somethingChanged])

    function handleNewPostChange(e) {
        setNewPost(e.target.value)
    }
    async function handleAddPost() {
        const createPostOptions = {
            contractAddress: dherrdAddr,
            functionName: "createPost",
            abi: dherrdABI,
            params: {
                _content: newPost,
            },
        }
        await Moralis.executeFunction(createPostOptions);
        setToggleAddPost(false)
        //setSomethingChanged(true)
    }
    function handleToggleAddComment(e, i) {
        console.log(i)
        setToggleAddComment({ state: true, row: i });
    }
    function handleNewCommentChange(e, i) {
        setNewComment({ row: i, comment: e.target.value })
    }
    async function handleAddComment(e, i) {
        console.log(newComment.comment)
        const createCommentOptions = {
            contractAddress: dherrdAddr,
            functionName: "createComment",
            abi: dherrdABI,
            params: {
                _postId: i,
                _content: newComment.comment,
            },
        }
        await Moralis.executeFunction(createCommentOptions);
        setToggleAddComment(false)
        //setSomethingChanged(true)
    }
    async function handlePostLike(id) {
        const likeOptions = {
            contractAddress: dherrdAddr,
            functionName: "Like",
            abi: dherrdABI,
            params: {
                _id: id,
            },
        }
        await Moralis.executeFunction(likeOptions)
    }

    async function handlePostDislike(id) {
        const dislikeOptions = {
            contractAddress: dherrdAddr,
            functionName: "Dislike",
            abi: dherrdABI,
            params: {
                _id: id,
            },
        }
        await Moralis.executeFunction(dislikeOptions)
    }

    function getNetLikes(upvotes, downvotes) {
        //console.log(upvotes.toNumber())
        try {
            const net = upvotes - downvotes
            return net

        } catch (TypeError) {
            return (0)
        }
    }

    return (
        <Container>
            <Row>
                <Col sm={{ offset: 5 }}>
                    <h3>Welcome to DeChat</h3>
                </Col>
            </Row>
            <ListGroup style={{ width: '75%', margin: 'auto' }}>
                {postData.posts.map((item, i) => {
                    return (
                        <ListGroup.Item key={i} className="d-flex justify-content-between align-items-start">
                            <div>
                                <h4>{item.content}</h4>
                                <ListGroup style={{ width: '100%', margin: 'auto' }}>
                                    {commentData.comments[item.postId].map((comment, j) => {
                                        return (
                                            <ListGroup.Item key={j}>
                                                {comment.content}
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                                <div>
                                    {toggleAddComment.state && toggleAddComment.row === item.postId ?
                                        <form onSubmit={(e) => handleAddComment(e, item.postId)}>
                                            <input type="text" name="post" value={newComment.comment} onChange={(e) => handleNewCommentChange(e, item.postId)} />
                                            <Button size='sm' variant='outline-light' style={{ color: 'black' }} onClick={(e) => handleAddComment(e, item.postId)}>
                                                Add Comment
                                            </Button>
                                        </form> :
                                        <Button size='sm' variant='outline-light' style={{ color: 'black' }} onClick={(e) => handleToggleAddComment(e, item.postId)}>
                                            Add Comment
                                        </Button>
                                    }
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Button size='sm' variant='outline-*' onClick={(e) => handlePostLike(item.postId)}>
                                    <FaArrowUp />
                                </Button>
                                <Badge bg='light' text='dark'>{getNetLikes(item.likeCount, item.dislikeCount)}</Badge>
                                <Button size='sm' variant='outline-*' onClick={(e) => handlePostDislike(item.postId)}>
                                    <FaArrowDown />
                                </Button>
                            </div>
                        </ListGroup.Item>
                    )
                })}
                {toggleAddPost ?
                    <form onSubmit={handleAddPost}>
                        <input type="text" name="post" value={newPost} onChange={handleNewPostChange} />
                        <Button size='sm' variant='outline-light' style={{ color: 'black' }} onClick={handleAddPost}>
                            Add Post
                        </Button>
                    </form> :
                    <Button size='sm' variant='outline-light' style={{ color: 'black' }} onClick={setToggleAddPost}>
                        Add Post
                    </Button>
                }
            </ListGroup>
        </Container>
    )
}

export default Feed;