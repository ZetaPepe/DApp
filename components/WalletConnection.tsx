"use client";

import { useEffect, useState } from "react";
import { useWallet, WalletProvider, ConnectionProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolletWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const WalletConnection = () => {
  const [wallets, setWallets] = useState([]);
  const { connected, publicKey, wallet, connect, disconnect } = useWallet();

  useEffect(() => {
    const wallets = [
      new PhantomWalletAdapter(),
      new SolletWalletAdapter()
    ];
    setWallets(wallets);
  }, []);

  return (
    <div className="absolute top-4 right-4 z-50">
      {!connected ? (
        <WalletMultiButton />
      ) : (
        <div>
          <p>Connected: {publicKey.toBase58()}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      )}
    </div>
  );
};

export default WalletConnection;
