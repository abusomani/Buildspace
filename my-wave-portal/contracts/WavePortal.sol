//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    // Emit a new wave event when a wave happens
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave{
        address waver; // address of the user who waved.
        string message; // message sent by the user who waved.
        uint256 timestamp; //timestamp when the user waved.        
    }

    // Array of waves. Holds all the waves anyone ever sent to us.
    Wave[] waves;

    constructor() payable {
        console.log("Wave Portal smart contract");
    }

    function wave(string memory _msg) public {
        totalWaves += 1;
        // Its like built in-authentication. We know exactly who called the function because in order to even call a smart contract funciton,
        // you need to be connected with a valid wallet.
        console.log("%s has waved!", msg.sender);

        // current block timestamp in seconds
        waves.push(Wave(msg.sender, _msg, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _msg);

        // Send prize amount to whoever waves at you.
        uint256 prizeAmount = 0.0001 ether;
        // address(this).balance lets retrieve the balance of the contract itself.
        require(prizeAmount <= address(this).balance, "Trying to withdraw more money than the contract has");
        // Send the value to the sender
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract");
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns(uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}