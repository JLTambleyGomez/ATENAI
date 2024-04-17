import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import React, { useState, useEffect } from 'react';
import {Routes, Route} from "react-router-dom"
import Landing from "./Landing"
import Home from "./Home"
import Topbar from "./Topbar"
import './App.css'

function App() {

  const appConfig = new AppConfig(["store_write"]);
  const userSession = new UserSession({ appConfig });
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const { testnet } = userSession.loadUserData().profile.stxAddress;
      const userWallet = testnet;
      setWalletAddress(userWallet);
    }
  }, [userSession.isUserSignedIn()]);

  return (
    <div className="App">
  <Topbar walletAddress={walletAddress}/>
      <Routes>
      <Route path="/" element={<Landing walletAddress={walletAddress}/>} />
      <Route path ="/Home" element={<Home />} />
      </Routes>    
    </div>
  )
}

export default App
