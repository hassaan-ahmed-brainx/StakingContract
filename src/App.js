import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Stake from './Components/Stake';
import UnStake from "./Components/UnStake"; 
import WithDrawRewardToken from "./Components/WithDrawRewardToken";

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})



function App() {
  return (
    <WagmiConfig config={config}>    
      <Router>
        <Routes>
        <Route path="/" element={<Stake/>} />
        <Route path="/UnStake" element={<UnStake/>}/>
        <Route path="/WithDrawRewardToken" element={<WithDrawRewardToken/>}/>
        </Routes>     
      </Router>
    </WagmiConfig>
  );
}

export default App;
