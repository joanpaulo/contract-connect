import React, {useContext} from 'react';
import styles from './header.module.css'

import { MetaMaskContext } from '../../Context/metamaskContext';
import { ContractContext } from '../../Context/contractContext';

const Main = () => {
  const {MetaMasktTools} = useContext(MetaMaskContext);
  const {i, chain, balanceOf, getMyBalance} = useContext(ContractContext);

  const {
    NETWORKS,
    isMetaMaskInstalled,
    isConnected,
    setIsConnected,
    currentAccount,
    setCurrentAccount,
    chainId,
    setChainId,
    web3,
    setWeb3
  } = MetaMasktTools;

  const shortenAddress = (addr) => {
    return `${addr.substring(0, 7)}...${addr.substring(addr.length - 5, addr.length)}`;
  };

  return (
    <div>
      <header className='navbar navbar-dark bg-dark'>
      <div className='container-fluid'>
      <h1 className='navbar-brand'>My Website</h1>
      <div className='nav'>
      <div className={styles.list}>
        <div className={styles.balon}>
        <h5>{balanceOf}</h5>
        </div>
        <div className={styles.balon}>
        <h5>{chainId}</h5>
        </div>
      </div>
      <div className={styles.accountInfo}>
      <h3>{shortenAddress(currentAccount)}</h3>
      </div>
      </div>
      </div>
    </header>
     
    </div>
  )
}

export default Main