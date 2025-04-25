"use client"

import Navbar from "../components/Navbar"
import Component from "../next-blocks"

export default function SyntheticV0PageForDeployment() {
  return (
    <>
      <Navbar />  {/* 在页面顶部渲染 Navbar */}
      <Component />
    </>
  );
}
