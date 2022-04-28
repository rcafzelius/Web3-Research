pragma solidity ^0.8.10;
    library SafeMath {
    
        function add(uint256 a, uint256 b) internal pure returns (uint256) {
            uint256 c = a + b;
            require(c >= a, "SafeMath: addition overflow");
            return c;
        }
    
        function sub(uint256 a, uint256 b) internal pure returns (uint256) {
            return sub(a, b, "SafeMath: subtraction overflow");
        }
    
        function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
            require(b <= a, errorMessage);
            uint256 c = a - b;
            return c;
        }
    
        function mul(uint256 a, uint256 b) internal pure returns (uint256) {
            if (a == 0) {
                return 0;
            }
    
            uint256 c = a * b;
            require(c / a == b, "SafeMath: multiplication overflow");
            return c;
        }
    
        function div(uint256 a, uint256 b) internal pure returns (uint256) {
            return div(a, b, "SafeMath: division by zero");
        }
    
        function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
            require(b > 0, errorMessage);
            uint256 c = a / b;
            return c;
        }
    
    }

contract content {
    using SafeMath for *;

    address isOwner;

    //Events
    event logPostCreated(address author, uint postId);
    event logLike(address from, uint post);
    event logUnLike(address from, uint post);
    event logDislike(address from, uint post);
    event logUnDislike(address from, uint post);
    event logComment(address author, uint postId);

    //Post Structure
    struct Post{
        uint postId;
        address author;
        string content;
        uint timestamp;
        uint likeCount;
        uint dislikeCount;
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
        posts[id]=Post(id,msg.sender,_content,block.timestamp,0,0);
        emit logPostCreated(msg.sender, totalPosts);
    }

    function getPost(uint _id) public view returns (
        address author, string memory content, uint timestamp, uint likeCount, uint dislikeCount ){
        return (posts[_id].author, posts[_id].content, posts[_id].timestamp, posts[_id].likeCount, posts[_id].dislikeCount);
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