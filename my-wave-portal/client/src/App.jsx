import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Contract from "./contract/WavePortal.json";
import "./App.css";

const App = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [numberOfWaves, setNumberOfWaves] = useState("");
  const contractAddress = "0x6b9D2F9622eb26E6b0b05be5d09954110c2a2431";
  const contractABI = Contract.abi;

  const getWaves = async () => {
    try {
      // Make sure that we have access to window.ethereum
      const { ethereum } = window;
      if (!ethereum) {
        alert("Make sure you have a wallet connected like Metamask!");
        return;
      }

      // Ethers is a library that lets frontend talk to the contract. Provider is what talks to the Ethereum nodes.
      const provider = new ethers.providers.Web3Provider(ethereum);
      // Signer is an abstraction of an Ethereum account which can be used to sign messages and transactions and send signed transactions to the Ethereum network to execute state change operations.
      const signer = provider.getSigner();
      // ABI is a compiled file generated when you compile the smart contract. Application Binary Interface is the full form of ABI/
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      let count = await wavePortalContract.getTotalWaves();
      setNumberOfWaves(count.toString());
    } catch(error) {
      console.error(error);
    }
  }
  const wave = async () => {
    try {
      // Make sure that we have access to window.ethereum
      const { ethereum } = window;
      if (!ethereum) {
        alert("Make sure you have a wallet connected like Metamask!");
        return;
      }

      // Ethers is a library that lets frontend talk to the contract. Provider is what talks to the Ethereum nodes.
      const provider = new ethers.providers.Web3Provider(ethereum);
      // Signer is an abstraction of an Ethereum account which can be used to sign messages and transactions and send signed transactions to the Ethereum network to execute state change operations.
      const signer = provider.getSigner();
      // ABI is a compiled file generated when you compile the smart contract. Application Binary Interface is the full form of ABI/
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Actual wave from your smart contract
      const waveTxn = await wavePortalContract.wave();
      console.log("Mining....", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      let count = await wavePortalContract.getTotalWaves();
      setNumberOfWaves(count.toString());
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      // Make sure that we have access to window.ethereum
      const { ethereum } = window;
      if (!ethereum) {
        alert("Make sure you have a wallet connected like Metamask!");
        return;
      }

      //Checks if we're authorized to access the user's wallet.
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length === 0) {
        alert("No authorized account found");
      }
      // User can have multiple accounts in the wallet. We simply grab the first one.
      setCurrentAccount(accounts[0]);
      setShouldLoad(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Connect wallet method
  const connectWallet = async () => {
    try {
      // Make sure that we have access to window.ethereum
      const { ethereum } = window;
      if (!ethereum) {
        alert("Make sure you have a wallet connected like Metamask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // Runs the function when the page loads.
  useEffect(() => {
    checkIfWalletIsConnected();
    getWaves();
  }, [getWaves]);

  if (!shouldLoad) return <></>;
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <h1 className="bio">
          I am Somani working on this super cool project! 
          Connect your Ethereum wallet and wave at me!
        </h1>

        <button className="waveButton" onClick={wave}>
        👋 Wave at Me
        </button>

        {numberOfWaves && <div className="totalWaves">Total number of waves made to me are : {numberOfWaves}</div>}
        {!currentAccount && (
        <button className="waveButton" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
      </div>
    </div>
  );
};

export default App;
