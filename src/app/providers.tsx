"use client";

import { WagmiConfig, createConfig } from "wagmi";
import { bsc, bscTestnet } from "viem/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ThemeProvider } from "next-themes";
import TRPCProvider from "@/app/_trpc/Provider";

const chains = [bscTestnet];
const projectId = "c4e75039af63deadc1923378815c5bec";

const metadata = {
  appName: "Vintage&Rare NFT",
  appDescription:
    "Vintage&Rare NFT is allows you to create an NFT of your musical instruments and accesories.",
};

const wagmiConfig = createConfig(
  getDefaultConfig({
    chains,
    walletConnectProjectId: projectId,
    ...metadata,
  })
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <TRPCProvider>
        <WagmiConfig config={wagmiConfig}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </WagmiConfig>
      </TRPCProvider>
    </ThemeProvider>
  );
}
