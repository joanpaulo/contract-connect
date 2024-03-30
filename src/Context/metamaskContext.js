import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";

export const MetaMaskContext = createContext();

 export const MetaMaskProvider = ({children}) => {
    const [provider, setProvider] = useState(window.ethereum);
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [currentAccount, setCurrentAccount] = useState('');
    const [chainId, setChainId] = useState(null);
    const [web3, setWeb3] = useState(null);
    let i = 1;

    useEffect(() => {
        if(i === 1){
            detectProvider();
            i--;   
        }
      }, [i]);

    const detectProvider = async () => {
        if (window.ethereum) {
            setProvider(window.ethereum);
            setIsMetaMaskInstalled(true);
            const hasWalletPermissions = await window.ethereum.send('wallet_getPermissions');
            const isConn = hasWalletPermissions['result'].length ;
            if(isConn > 0){
              onLogin(provider)
            }
        } else {
          console.log("No Ethereum browser detected! Check out MetaMask");
        }
      };

      useEffect(() => {
    
        const handleAccountsChanged = async (accounts) => {
          const web3Accounts = await web3.eth.getAccounts();
          if (accounts.length === 0) {
            onLogout();
          } else if (accounts[0] !== currentAccount) {
            setCurrentAccount(accounts[0]);
          }
        };
    
        const handleChainChanged = async (chainId) => {
          const web3ChainId = await web3.eth.getChainId();
          const chain = getCurrentNetwork(web3ChainId)
          setChainId(chain);
        };
    
      
        if (isConnected) {
          provider.on("accountsChanged", handleAccountsChanged);
          provider.on("chainChanged", handleChainChanged);
          
        }
    
        return () => {
          if (isConnected) {
            provider.removeListener("accountsChanged", handleAccountsChanged);
            provider.removeListener("chainChanged", handleChainChanged);
           
          }
        };
      }, [isConnected]);

      const onLogin = async () => {
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId();
        if(!accounts || !accounts.length){
          console.log('sem permisão')
        }else{
          const currentNetwork = getCurrentNetwork(chainId)
          setWeb3(web3);
          setChainId(currentNetwork);
          setCurrentAccount(accounts[0]);
          setIsConnected(true);
          setIsConnecting(false);
        }
      };
    
      const onLogout = () => {
        setIsConnected(false);
        setCurrentAccount(null);
      };

      const getCurrentNetwork = (chainId) => {
        return NETWORKS[chainId];
      };

      const NETWORKS = {
        1: "Ethereum Main Network",
        3: "Ropsten Test Network",
        4: "Rinkeby Test Network",
        5: "Goerli Test Network",
        42: "Kovan Test Network",
        137: "Polygon Mainnet",
        80001: "Polygon testnet",
        15257: "BuildBear Siryn",
      };

    const MetaMasktTools = {
        //arrey
        NETWORKS,
        //states
        provider,
        setProvider,
        isMetaMaskInstalled,
        isConnected,
        setIsConnected,
        currentAccount,
        setCurrentAccount,
        chainId,
        setChainId,
        web3,
        setWeb3,
        isConnecting,
        setIsConnecting,
        //functions
        getCurrentNetwork,
        onLogin,
    }
    
    return (<MetaMaskContext.Provider value={{MetaMasktTools}}>{children}</MetaMaskContext.Provider>);
};

