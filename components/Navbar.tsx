'use client'; 
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'; 

export default function Navbar() { 
  return ( 
    <div className="relative w-full h-[calc(100vh-64px)] bg-background"> {/* 使用全局背景颜色变量 */}
      {/* 绝对定位的按钮 */}
      <div className="absolute top-4 right-4 z-10">
        <WalletMultiButton />
      </div>
    </div>
  ); 
}
