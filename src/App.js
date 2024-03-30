import React, {useContext} from 'react'

import Login from './routes/Login/Login'
import Main from './routes/Main/Main'

import { MetaMaskContext } from './Context/metamaskContext';

const App = () => {

  const {MetaMasktTools} = useContext(MetaMaskContext);
  const { isConnected } = MetaMasktTools;

  return (
    <div>
      {!isConnected && <Login/>}
      {isConnected && <Main/> }    
    </div>
  )
}

export default App