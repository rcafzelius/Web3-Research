//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleMintContract is ERC721, Ownable { //inherited from openzeppelin
    uint256 public mintPrice = 0 ether;
    uint256 public totalSupply; 
    uint256 public maxSupply;
    bool public allowTransfer; //initially set to false
    mapping(address=>uint256) public mintedWallets; //make sure one wallet can't mint many NFTS

    constructor () payable ERC721('Simple Mint', 'SIMPLEMINT') { //convention from ERC721
        maxSupply=1000000000;
    }

    function setMaxsupply(uint256 maxSupply_) external onlyOwner {
        
        maxSupply=maxSupply_;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) //code to make contract non transferrable 
        internal
        virtual
        override(ERC721) //from the ERC721 Docs
    {
        require(from == address(0) || to == address(0), "token is non transferrable "); //unless the "from" and "to" addresses are 0 (which they would never be), the message will be printed
        super._beforeTokenTransfer(from, to, tokenId);
    }


    function mint() external payable {
        require (mintedWallets[msg.sender]<1, 'exceeds max per wallet'); //each address can only mint 1 nft
        require (msg.value== mintPrice, 'wrong value '); //ensures correct price for mint
        require (maxSupply>totalSupply, 'NFTS sold out');

        mintedWallets[msg.sender]++; //increase number of mints for the wallet that just minted
        totalSupply++; //incrase total supply because just minted new one
        uint tokenID=totalSupply; //saves global variable into temporary local variable to save gas fees
        _safeMint(msg.sender, tokenID); //safeMint comes from ERC721 contract

    }
}

