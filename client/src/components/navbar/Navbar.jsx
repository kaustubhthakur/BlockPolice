import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import './Navbar.css';  // Assuming you're importing your CSS file
import { Link } from "react-router-dom";

function Navbar() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // Function to handle MetaMask connection
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
      setIsConnected(true);
      localStorage.setItem("isWalletConnected", true); // Save connection state
    } catch (error) {
      console.error(error);
    }
  };

  // Function to disconnect wallet (reset state)
  const disconnectWallet = () => {
    setWalletAddress("");
    setIsConnected(false);
    localStorage.removeItem("isWalletConnected"); // Remove connection state
  };

  // Automatically reconnect wallet on page refresh
  useEffect(() => {
    const checkConnection = async () => {
      if (localStorage.getItem("isWalletConnected") === "true") {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    checkConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          disconnectWallet();
        }
      });
    }
  }, []);



  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgwW1-97oKmfTCcEll_xEZfE2luXLlK_n9bg&usqp=CAU" alt="Logo" className="logo" />
      </div>
      <div className="navbar-buttons">
        {isConnected ? (
          <>
            <span className="wallet-address">
              {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
            </span>
            <Link to='/registercomplaint'  className="btn">RegisterComplaint</Link>
            <Link to='resolvecomplaint' className="btn">Resolve complaint</Link>
            <button onClick={disconnectWallet} className="btn btn-disconnect">Disconnect</button>
          </>
        ) : (
          <button onClick={connectWallet} className="btn">Connect MetaMask</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
