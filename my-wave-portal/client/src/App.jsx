import React, { useEffect, useState, useCallback } from "react";
import ReactLoading from "react-loading";
import { ethers } from "ethers";
import Contract from "./contract/WavePortal.json";
import "./App.css";
import { CONTRACT_ADDRESS } from './constants/constants';

const App = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [waves, setWaves] = useState([]);
  const contractAddress = CONTRACT_ADDRESS;
  const contractABI = Contract.abi;

  const getAllWaves = useCallback(async () => {
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

      const w = await wavePortalContract.getAllWaves();

      // Only pick the information that is required to be shown in the UI

      let wvs = [];
      w.forEach((element) => {
        wvs.push({
          address: element.waver,
          timestamp: new Date(element.timestamp * 1000),
          message: element.message,
        });
      });

      setWaves(wvs);
    } catch (error) {
      console.error(error);
    }
  }, [contractABI, contractAddress]);

  const wave = async (event) => {
    event.preventDefault();
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

      setLoading(true);

      // Actual wave from your smart contract
      const waveTxn = await wavePortalContract.wave(message);
      console.log("Mining....", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
      setLoading(false);
      setMessage('');
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
    getAllWaves();
  });

  if (!shouldLoad) return <></>;
  return (
    <div className="mainContainer">
      <h1 className="bio">
        I am Somani working on this super cool project! Connect your Ethereum
        wallet and wave at me!
      </h1>

      {!currentAccount && (
        <button className="connectButton" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}

      {loading ? (
        <ReactLoading type={"bars"} className="loader" />
      ) : (
        <form onSubmit={wave} className="wave-form">
          <textarea
            required
            placeholder="Enter any message that you want me to read when you wave at me!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="wave-message-input"
            contentEditable
          />
          <input
            type={"submit"}
            value={"👋 Wave at Me"}
            className="wave-button"
          />
        </form>
      )}

      {waves && (
        <div className="waves">
          <div className="wave-title">All My Waves</div>
          {waves.map((wave, index) => {
            return (
              <div key={index} className="wave-container">
                <div>
                  <b>From Address: </b>
                  {wave.address}
                </div>
                <div>
                  <b>Waved At: </b>
                  {wave.timestamp.toString()}
                </div>
                <div>
                  <b>Wave Message: </b>
                  {wave.message}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
