import { mainnet, sepolia, polygon, arbitrum } from "viem/chains";
import { http, createConfig } from "wagmi";
import {
  injected,
  coinbaseWallet,
  metaMask,
  walletConnect,
} from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, arbitrum],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    }),
    coinbaseWallet({
      appName: "Candoxa",
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
});
