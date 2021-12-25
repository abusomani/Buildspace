//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;

    // Emit a new wave event when a wave happens
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave{
        address waver; // address of the user who waved.
        string message; // message sent by the user who waved.
        uint256 timestamp; //timestamp when the user waved.        
    }

    // Array of waves. Holds all the waves anyone ever sent to us.
    Wave[] waves;

    // Address to timestamp mapping for implementing cooldown.
    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("Wave Portal smart contract");

        // Generates a new seed for the next user that sends a wave to us
        seed = (block.timestamp * block.difficulty + seed) % 100;
    }

    function wave(string memory _msg) public {
        // Assert that the sender is not bombarding the contract. Cooldown for avoiding spam-waving.
        require(lastWavedAt[msg.sender] + 15 minutes < block.timestamp, "Wait for 15 minutes before waving again");

        // Update the current timestamp for the sender of the wave.
        lastWavedAt[msg.sender] = block.timestamp;
        totalWaves += 1;
        // Its like built in-authentication. We know exactly who called the function because in order to even call a smart contract funciton,
        // you need to be connected with a valid wallet.
        console.log("%s has waved!", msg.sender);

        // current block timestamp in seconds
        waves.push(Wave(msg.sender, _msg, block.timestamp));

        // Everytime generate a new seed
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated : %d", seed);
        if(seed <= 50) {
            // Send prize amount to whoever waves at you.
            uint256 prizeAmount = 0.0001 ether;
            // address(this).balance lets retrieve the balance of the contract itself.
            require(prizeAmount <= address(this).balance, "Trying to withdraw more money than the contract has");
            // Send the value to the sender
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract");
            console.log("%s won the prize!", msg.sender);
        }
        emit NewWave(msg.sender, block.timestamp, _msg);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns(uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}