pragma solidity ^0.8.10;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract content {
    using SafeMath for *;

    address isOwner;

    //Events
    event logPostCreated(address author, uint postId);
    event logLiske(address from, uint post);
    event logUnLike(address from, uint post);
    event logDislike(address from, uint post);
    event logUnDislike(address from, uint post);
    event logComment(address author, uint postId, totalComments);

    //Post Structure
    struct Post{
        uint postId;
        address author;
        string content;
        uint timestamp;
        uint likeCount;
        uint dislikeCount;
        uint totalComments;
    }

    //Comment Structure
    struct Comment{
        uint postId;
        uint commentId;
        address author;
        string content;
        uint likeCount;
        uint dislikeCount;
        uint timestamp;
    }

    uint public totalPosts;
    address payable public owner;

    mapping(uint=>Post) private posts; //Mapping from Post ID to Post
    mapping(uint=>mapping(uint=>Comment)) comments; //Mapping from CommentID to comments
    mapping(uint=>mapping(address=>bool)) likes; //Mapping from post to address to wether or not post has been liked
    mapping (uint=>mapping(address=>bool)) dislikes; //Mapping from post to address to wether or not the post has been dislked

    modifier onlyOwner() {
        require(isOwner == msg.sender, "not owner");
        _;
    }

    constructor() {
        isOwner = msg.sender;
    }

    //Check on the validity of calling multiple transactions
    function createPost(string memory _content) public {
        totalPosts=totalPosts.add(1);
        uint id=totalPosts;
        posts[id]=Post(id,msg.sender,_content,block.timestamp,0,0,0);
        emit logPostCreated(msg.sender, totalPosts);
    }

    function createComment(uint _postId, string memory _content) public {
        posts[_id].totalComments = posts[_id].totalComments.add(1);
        comments[_postId][posts[_id].totalComments] = Comment(_postId, msg.sender, _content, 0, 0, block.timestamp);
        emit logComment(msg.sender, _postId, _totalComments);
    }

    function getPost(uint _id) public view returns (
        uint postId, address author, string memory content, uint timestamp, uint likeCount, uint dislikeCount, uint totalComments ){
        return (posts[_id].postId, posts[_id].author, posts[_id].content, posts[_id].timestamp, posts[_id].likeCount, posts[_id].dislikeCount, posts[_id].totalComments);
    }

    function getComment(_postId, _commentId) public view returns (uint postId, uint commentId, address author, string content, uint likeCount, uint dislikeCount, uint timestamp){
        comment = comments[_postId][_commentId];
        return (comment.postId, comment.commentId, comment.author, comment.content, comment.likeCount, comment.dislikeCount, comment.timestamp);
    }

    function Like(uint _id) public {
        if  (likes[_id][msg.sender] = true) {
            likes[_id][msg.sender] = false;
            emit logUnLike(msg.sender, _id);
        } else {
            likes[_id][msg.sender] = true;
            emit logUnLike(msg.sender, _id);
        }
    }

    function Dislike(uint _id) public {
        if  (dislikes[_id][msg.sender] = true) {
            dislikes[_id][msg.sender] = false;
            emit logUnDislike(msg.sender, _id);
        } else {
            dislikes[_id][msg.sender] = true;
            emit logDislike(msg.sender, _id);
        }
    }


}