import React, { useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect, } from "@stacks/connect"
import "./assets/css/Topbar.css"

const Topbar = ({walletAddress}) => {

  const appConfig = new AppConfig(["store_write"]);
  const userSession = new UserSession({ appConfig });
  console.log("=> user Wallet: ", walletAddress);

  const appDetails = {
    name: "Keros",
    icon: "",
  };
  const connectWallet = () => {
    showConnect({
      appDetails,
      onFinish: () => {
        window.location.reload();
        userSession.handlePendingSignIn();
      },
      userSession,
    });
  };

  const disconnectWallet = () => {
    if (userSession.isUserSignedIn()) {
      userSession.signUserOut(window.location.href);
      console.log("Wallet desconectada");
      logout();
    } else {
      console.log("No hay wallet conectada");
    }
  };


  const Lenguage = "EN"


  return (
    <div className="MainContain">
      <div className="TopbarContain">

        <div className="Logo">
          <img className="a" src="https://res.cloudinary.com/ddectuilp/image/upload/v1712365005/ATENAI/logo_2_zibpls.png"></img>
          <h1 className="Name">TENAI</h1>
        </div>
        <div className="MainMenu">
          <p className="p">{Lenguage === "EN" ? "Home" : "Inicio"}</p>
          <p className="p">{Lenguage === "EN" ? "About Atenai" : "Sobre Atenai"}</p>
          <p className="p">{Lenguage === "EN" ? "Discord" : "Discord"}</p>
          <p className="p">{Lenguage === "EN" ? "Help" : "Help"}</p>

        </div>
        <div className="Menu">
          {/* <button className="b1">{Lenguage === "EN" ? "My Studio" : "Mi Estudio "}</button>
        <button className="b1">{Lenguage === "EN" ? "Create Music" : "Crear Música"}</button> */}
          {walletAddress ? (
            <>
              <span className="user"><img src='User.svg' alt="User Icon" className="user-icon" />{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</span>
              <button className="b1" onClick={() => { disconnectWallet() }}>Disconnect Wallet</button>
            </>
          ) : (
            <button className="b1" onClick={() => { connectWallet() }}>Connect Wallet</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Topbar