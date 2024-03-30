import React, { createContext, useState, useEffect, useContext } from "react";
import erc20abi from "./ERC20abi.json";
import { ethers } from "ethers";
import Web3 from 'web3'

import { MetaMaskContext } from "./metamaskContext";

export const ContractContext = createContext();

 export const ContractProvider = ({children}) => {
    const {MetaMasktTools} = useContext(MetaMaskContext);
    const { chainId, currentAccount } = MetaMasktTools;
    const chain = chainId;
    const contractAddress = '0x955F5b406053476f122ce22d20FAA8121B479469';
    let i = 10;

    const [balanceOf, setBalanceOf] = useState(null)

    useEffect(()=> {
        if(currentAccount && chainId === "BuildBear Siryn"){
            getMyBalance()
        }
    },[currentAccount])

    const getMyBalance = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const erc20 = new ethers.Contract(contractAddress, erc20abi, provider);
        const balance = await erc20.balanceDeposits(currentAccount);
        const web3 = new Web3();

        setBalanceOf(web3.utils.fromWei(balance, 'ether'))
    
    }

    return (<ContractContext.Provider value={{i, chain, balanceOf, getMyBalance}}>{children}</ContractContext.Provider>);
 }