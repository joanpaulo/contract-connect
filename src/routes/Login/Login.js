import React, {useContext, useState} from 'react'
import Card from "../../Components/UI/Card/Card";
import classes from "./Login.module.css";

import { MetaMaskContext } from '../../Context/metamaskContext'

const Login = () => {
  const {MetaMasktTools} = useContext(MetaMaskContext)
  
  const { isMetaMaskInstalled, onLogin, setIsConnecting, isConnecting } = MetaMasktTools;

  const login = async () => {
    setIsConnecting(true)
    const conta = await window.ethereum.request({
     method: "eth_requestAccounts",
   })
   .catch((err) => {
     if (err.code === 4001) {
     } else {
         console.error(err);
     }
 });
 if(!conta || !conta.length){
   console.log('sem permisão')
   setIsConnecting(false)
 }else{
   onLogin()
 }
 }

  return (
    <Card className={classes.login}>
      {isMetaMaskInstalled && (
        <button
          onClick={login}
          className={classes.button}
          type="button"
        >
          {!isConnecting && "Connect"}
          {isConnecting && "Loading..."}
        </button>
      )}
      {!isMetaMaskInstalled && (
        <p>
          <a href="/">Install MetaMask</a>
        </p>
      )}
    </Card>
  )
}

export default Login