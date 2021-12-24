# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

To get hardhat do the following:
- Install Npm with [these](https://hardhat.org/tutorial/setting-up-the-environment.html) instructions
- If you do not have a repository setup then do 
    - `mkdir sample-repo`
    -  `cd sample-repo`
    - `npm init -y`
    - `npm install --save-dev hardhat`

You should be all set! Try running `npx hardhat` and select **"Create a basic sample project"** from the list of options. This would setup a new hardhat project.

- There are other dependencies that would be required later in the project. Install them using:
`npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers`


Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

- When you run `npx hardhat accounts`, this would print out a bunch of strings that are Ethereum wallet addresses that Hardhat generates for us to simulate real users on the blockchain.

- When you run `npx hardhat compile`, it would compile the sample `Greeter.sol` solidity program and generate the artifacts which are in `.json` format. These can be utilized for client side interactions

- When you run `npx hardhat test`, it would run the unit tests that would test your solidity contract.

- When you run `npx hardhat run scripts/<name>.js`, it would run that script with HRE (hardhat runtime environment) object on the fly present. Hence requires no imports of it explicitly in the script.

- When you run `npx hardhat node` it spins up a local server that is a local Ethereum network. This is required to work on client side and test things out without having to run script repeatedly.

- For deploying the contract on the local network. Run `npx hardhat run scripts/deploy.js --network localhost`. Make sure that the node server is up and running with the `npx hardhat node` command.
