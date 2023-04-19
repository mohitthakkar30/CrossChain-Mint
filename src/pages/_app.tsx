import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import {polygonMumbai, sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const shmChain :Chain = {
  id: 8081,
  name: 'Shardeum Liberty 2.1',
  network: 'shardeum',
  nativeCurrency: {
    decimals: 18,
    name: 'Shm',
    symbol: 'SHM',
  },
  
  rpcUrls: {
    default:{http:['https://liberty20.shardeum.org']},
    public:{http:['https://liberty20.shardeum.org']} ,
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [polygonMumbai, sepolia , shmChain],
  [
    alchemyProvider({ apiKey: 'r1xrnkXFSD92Fd715SqGkluuVwQ_5-YK' }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'TaskSHM',
  // projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function App({ Component, pageProps }: AppProps) {
  return(  
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
  <ChakraProvider>
    <Navbar/>
    <Component {...pageProps} />
  </ChakraProvider>
  </RainbowKitProvider>
  </WagmiConfig>
  );
}
