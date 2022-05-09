pragma solidity ^0.8.10;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract content {
    using SafeMath for *;

    address isOwner;

    //Events
    event logPostCreated(address author, uint postId);
    event logLike(address from, uint post);
    event logUnLike(address from, uint post);
    event logDislike(address from, uint post);
    event logUnDislike(address from, uint post);
    event logComment(address author, uint postId, uint totalComments);

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
    mapping(uint=>mapping(address=>bool)) likes; //Mapping from post to address to wether or not post has been liked by a specific user
    mapping (uint=>mapping(address=>bool)) dislikes; //Mapping from post to address to wether or not the post has been dislked by a specific user

    modifier onlyOwner() {
        require(isOwner == msg.sender, "not owner");
        _;
    }

    constructor() {
        isOwner = msg.sender;
    }

    //Create a post and store it in the posts mapping
    function createPost(string memory _content) public {
        totalPosts=totalPosts.add(1);
        uint id=totalPosts;
        posts[id]=Post(id,msg.sender,_content,block.timestamp,0,0,0);
        emit logPostCreated(msg.sender, totalPosts);
    }

    //Create a comment and store it in the comments mapping.
    function createComment(uint _postId, string memory _content) public {
        posts[_postId].totalComments = posts[_postId].totalComments.add(1);
        comments[_postId][posts[_postId].totalComments] = Comment(_postId, posts[_postId].totalComments, msg.sender, _content, 0, 0, block.timestamp);
        emit logComment(msg.sender, _postId, posts[_postId].totalComments);
    }

    //Function for getting a post from an id. This is used for grabbing post information for front end
    function getPost(uint _id) public view returns (
        uint postId, address author, string memory content, uint timestamp, uint likeCount, uint dislikeCount, uint totalComments ){
        return (posts[_id].postId, posts[_id].author, posts[_id].content, posts[_id].timestamp, posts[_id].likeCount, posts[_id].dislikeCount, posts[_id].totalComments);
    }

    //Function for getting all of a comments information. This is used for front-end interactions.
    function getComment(uint _postId, uint _commentId) public view returns (uint postId, uint commentId, address author, string memory content, uint likeCount, uint dislikeCount, uint timestamp){
        Comment memory comment = comments[_postId][_commentId];
        return (comment.postId, comment.commentId, comment.author, comment.content, comment.likeCount, comment.dislikeCount, comment.timestamp);
    }

    //For liking a post. Takes in post id and updates the like count
    function Like(uint _id) public {
            likes[_id][msg.sender] = true;
            posts[_id].likeCount = posts[_id].likeCount.add(1);
            emit logLike(msg.sender, _id);
    }

    //For disliking a post. Takes in post id and updates the dislike count
    function Dislike(uint _id) public {
            dislikes[_id][msg.sender] = true;
            posts[_id].dislikeCount = posts[_id].dislikeCount.add(1);
            emit logDislike(msg.sender, _id);
    }
}