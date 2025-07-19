// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WalletCreator {
    event WalletCreated(address indexed owner, address indexed walletAddress);
    
    // Create a new wallet for the sender
    function createWallet() external returns (address) {
        bytes memory bytecode = type(Wallet).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(msg.sender, block.timestamp));
        
        address walletAddress;
        assembly {
            walletAddress := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        
        emit WalletCreated(msg.sender, walletAddress);
        return walletAddress;
    }
}

contract Wallet {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    receive() external payable {}
    
    function withdraw(uint256 amount) external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(amount);
    }
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}