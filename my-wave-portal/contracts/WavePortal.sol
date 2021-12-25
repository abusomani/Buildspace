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

    constructor(){
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
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns(uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}