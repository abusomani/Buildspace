import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  const wave = () => {};

  const checkIfWalletIsConnected = async () => {
    try {
      // Make sure that we have access to window.ethereum
      const { ethereum } = window;
      if (!ethereum) {
        alert("Make sure you have a wallet connected like Metamask!");
        return;
      }

      //Checks if we're authorized to access the user's wallet.
      const accounts = await ethereum.request({ method: 'eth_accounts' });
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

      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch(error){
      console.error(error);
    }
  }

  // Runs the function when the page loads.
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  if (!shouldLoad) return <></>;
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey there!</div>

        <div className="bio">
          I am Somani and I am working in the Crypto world, that's pretty cool
          right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
      {!currentAccount && <button className="waveButton" onClick={connectWallet}>
        Connect Wallet
        </button>}
    </div>
  );
};

export default App;
