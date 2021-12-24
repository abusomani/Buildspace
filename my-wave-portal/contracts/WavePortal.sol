//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    constructor(){
        console.log("Wave Portal smart contract");
    }

    function wave() public {
        totalWaves += 1;
        // Its like built in-authentication. We know exactly who called the function because in order to even call a smart contract funciton,
        // you need to be connected with a valid wallet.
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns(uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}