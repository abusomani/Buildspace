# Basic Sample Hardhat Project

#### Project hosted on: https://somani-wave-portal.vercel.app/

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

### Alchemy

Alchemy essentially helps us broadcast our contract creation transaction so that it can be picked up by miners as quickly as possible. Once the transaction is mined, it is then broadcasted to the blockchain as a legit transaction. From there, everyone updates their copy of the blockchain.

I will deploy the app to Ethereum Rinkeby Testnet for playing around and not the mainnet as it costs real money. I will test the application in a real-world scenario and do the following:
- Broadcast my transaction
- Wait for it to be picked up by the actual miners
- Wait for it to be mined
- Wait for it to be broadcasted back to the blockchain to signal all the other miners to update their copies.

### Fake $

To get fake money on the `Rinkeby` testnet we can choose any of the faucet. Metamask wallet should be set to "Rinkeby Test Network" for the faucet to work.


| Name             | Link                                  | Amount          | Time         |
| ---------------- | ------------------------------------- | --------------- | ------------ |
| MyCrypto         | https://app.mycrypto.com/faucet       | 0.01            | None         |
| Buildspace       | https://buildspace-faucet.vercel.app/ | 0.025           | 1d           |
| Ethily           | https://ethily.io/rinkeby-faucet/     | 0.2             | 1w           |
| Official Rinkeby | https://faucet.rinkeby.io/            | 3 / 7.5 / 18.75 | 8h / 1d / 3d |


## Keep in Mind

We will place the Alchemy Api url in the `.env` file and place it in `.gitignore`. This is really important because it has our private key. 
**The private key is the same as your mainnet private key.**

- For Api Url from copy it from the created app from Alchemy
- For the private key, copy it from Metamask by changing the network to `Rinkeby Test Network`. Clicking on `Account Details` > `Export Private Key`

### Why do I need to use private key?
Because in order to perform a transaction like even deploying the contract, we need to "login" on the blockchain. Username would be our public address and password would be the private key.


## Deployed contract

[Without Waves](https://rinkeby.etherscan.io/address/0x6b9D2F9622eb26E6b0b05be5d09954110c2a2431)
[With all the Waves information](https://rinkeby.etherscan.io/address/0x318d5F0772Bd820a7d3958C76C2017D27AFF6031)
[With initial Eth to prize the waver](https://rinkeby.etherscan.io/address/0xe5fE35812531b9b278E76739760Da73CECbF50Af)
[With cooldown mechanism](https://rinkeby.etherscan.io/address/0xC0d4E4AaEF35621fdAfE32521F30cf637eDCEd8E)


## Steps to perform when making changes to Contract
- Deploy the contract again `npx hardhat run scripts/deploy.js --network rinkeby`
- Update the contract address on the frontend
- Update the Abi file in the frontend


#### Error: non-payable constructor cannot override value
This means that our contract isn't allowed to pay people. The fix is to add a keyword `payable` to our constructor.