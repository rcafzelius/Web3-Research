pragma solidity ^0.8.10;

contract content {
    //Events
    event logPostCreated(address author, uint postId);
    event logLike(address from, address to, string value);
    event logDislike(address from, address to);
    event logComment(address author, uint postId);

    //Post Structure
    struct Post{
        uint postId;
        address author;
        string content;
        uint timestamp;
        uint likeCount;
        uint dislikeCount;
        mapping(address=>bool) likes; //Mapping from address to wether or not post has been liked
        mapping (address=>bool) dislikes; //Mapping fro, address to wether or not the post has been dislked
    }

    //Comment Structure
    struct Comment{
        uint commentId;
        address author;
        uint postId;
        string content;
        uint likeCount;
        uint dislikeCount;
        uint timestamp;
    }

    uint public totalPosts;
    uint public totalComments;
    address payable public owner;

    mapping(uint=>Post) private posts; //Mapping from Post ID to Post
    mapping(uint=>Comment) private comments; //Mapping from CommentID to comments

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    //Check on the validity of calling multiple transactions
    function createPost(string memory _content) public {
        totalPosts=totalPosts.add(1);
        uint id=totalPosts;
        posts[id]=Post(id, msg.sender, _content, block.timestamp, 0, 0);
        userPosts[msg.sender].push(totalPosts);
        emit logPostCreated(msg.sender, users[msg.sender].id, totalPosts);
    }

    function getPost(uint _id) public view returns ( address author, string memory content, uint timestamp, uint likeCount, uint dislikeCount ){
        return (posts[_id].author, posts[_id].content, posts[_id].timestamp, posts[_id].likeCount, posts[_id].dislikeCount);
    }

    function Like(uint _id) public {

        emit Like(msg.sender,msg.value);
    }


    function Dislike(uint _id) public {
        emit Dislike(msg.sender, msg.value);
    }


}