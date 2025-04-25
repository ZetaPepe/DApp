'use client';  
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'; 

export default function Navbar() { 
  return ( 
    <div className="relative w-full h-screen bg-background"> {/* 背景和布局 */}
      {/* 右上角的钱包按钮 */}
      <div className="absolute top-4 right-4 z-50">
        <WalletMultiButton />
      </div>
    </div>
  ); 
}
