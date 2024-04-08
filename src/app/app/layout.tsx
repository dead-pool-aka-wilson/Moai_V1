"use client";
import React, { useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import NavBarNavigation from "@/app/context/Navigation";

// Default styles that can be overridden by your app
require("../wallet.css");

import { NavBar, Page } from "@/app/components/common";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // You can also provide a custom RPC endpoint.
  const endpoint =
    "https://solana-devnet-archive.allthatnode.com/Ez7eqjgszCRYxMTozvryy4B5Y8qvR5Q7/";

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/anza-xyz/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div className="flex h-full flex-col">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <NavBarNavigation>
              <Page> {children}</Page>
              <NavBar />
            </NavBarNavigation>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
