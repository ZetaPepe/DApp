'use client';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Navbar() {
  return (
    <div className="w-full flex justify-end p-4 border-b bg-white shadow-sm">
      <WalletMultiButton />
    </div>
  );
}
