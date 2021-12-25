// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// This import/require is not required because when we execute `npx hardhat run <script>` then the `hre` object is built on the fly using the
// hardhat.config.js specified in our code. Hence we would never have to import it in the files.
// Refer: https://hardhat.org/advanced/hardhat-runtime-environment.html
// const hre = require("hardhat");

const main = async () => {
    // Retrieve wallet address. 
    const [owner, randomPerson] = await hre.ethers.getSigners();
    // This will actuall compile the contract and generate the necessary files in the `artifacts` directory.
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    // This will create a local Ethereum network for this contract. Once the script completes it also destorys the local network.
    // Every time you run the contract, it will be a fresh blockchain. Basically like a local server refreshing everytime to start from clean slate
    // which makes it easy to debug errors
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'), // Fund the contract with 0.1ETH at the begining.
    });
    // This waits until the contract is officially deployed to the local blockahin. Constructor of contract gets executed when we actually deploy.
    await waveContract.deployed();
    // Prints the address of the deployed contract. Helps to find the contract on the blockchain. 
    console.log('Contract has been deployed to : ', waveContract.address);
    // Prints the address of the entity who is deploying the contract.
    console.log('Contract deployed by: ', owner.address);
    // Prints the balance of the contract.
    let balance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract balance : ', hre.ethers.utils.formatEther(balance));

    //Test the sample function exposed like a Public API endpoint by the contract
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    // Me waving at myself.
    let waveTxn = await waveContract.wave('Test message!');
    await waveTxn.wait();
    waveCount = await waveContract.getTotalWaves();

    // Random person waving at us simulation. Connect their wallet address and try to wave
    waveTxn = await waveContract.connect(randomPerson).wave('Another message!');
    await waveTxn.wait();
    
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount);

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
    // After waving once the balance should reduce
    balance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract balance : ', hre.ethers.utils.formatEther(balance));
};

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();