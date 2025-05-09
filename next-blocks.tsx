"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const isMobile = () => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

const BoxWithEdges = ({ position }) => {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhysicalMaterial 
          color="#0070f3"
          roughness={0.1}
          metalness={0.8}
          transparent={true}
          opacity={0.9}
          transmission={0.5}
          clearcoat={1}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.5, 0.5, 0.5)]} />
        <lineBasicMaterial color="#214dbd" linewidth={2} />
      </lineSegments>
    </group>
  )
}

const BoxLetter = ({ letter, position }) => {
  const group = useRef()

  const getLetterShape = (letter) => {
    const shapes = {
      P: [
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [1,0,0],
        [1,0,0],
      ],
      I: [
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      X: [
        [1,0,0,0,1],
        [0,1,0,1,0],
        [0,0,1,0,0],
        [0,1,0,1,0],
        [1,0,0,0,1],
      ],
      R: [
        [1,1,0],
        [1,0,1],
        [1,1,0],
        [1,0,1],
        [1,0,1],
      ],
      A: [
        [0,1,0],
        [1,0,1],
        [1,1,1],
        [1,0,1],
        [1,0,1],
      ],
    }
    return shapes[letter] || shapes['P'] // Default to 'P' if letter not found
  }

  const letterShape = getLetterShape(letter)

  return (
    <group ref={group} position={position} scale={['1', '1', '1']} className="sm:scale-75 md:scale-100 lg:scale-125">
      {letterShape.map((row, i) =>
        row.map((cell, j) => {
          if (cell) {
            let xOffset = j * 0.5 - (letter === 'I' ? 0 : letter === 'P' || letter === 'R' ? 0.5 : 1)
            
            if (letter === 'X') {
              if (j === 0) xOffset = -1;
              if (j === 1) xOffset = -0.75;
              if (j === 2) xOffset = -0.25;
              if (j === 3) xOffset = 0.25;
              if (j === 4) xOffset = 0.5;
            }
            if (letter === 'A') {
              if (j === 0) xOffset = -0.5;
              if (j === 1) xOffset = 0;
              if (j === 2) xOffset = 0.5;
            }

            return (
              <BoxWithEdges 
                key={`${i}-${j}`} 
                position={[xOffset, (4 - i) * 0.5 - 1, 0]}
              />
            )
          }
          return null
        })
      )}
    </group>
  )
}

const Scene = () => {
  const orbitControlsRef = useRef()
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  useEffect(() => {
    setIsMobileDevice(isMobile())
  }, [])

  return (
    <>
      <group position={[-0.5, 0, 0]} rotation={[0, Math.PI / 1.5, 0]}>
        <BoxLetter letter="P" position={[-5, 0, 0]} />
        <BoxLetter letter="I" position={[-2.5, 0, 0]} />
        <BoxLetter letter="X" position={[0, 0, 0]} />
        <BoxLetter letter="R" position={[2.5, 0, 0]} />
        <BoxLetter letter="A" position={[5, 0, 0]} />
      </group>
      <OrbitControls 
        ref={orbitControlsRef}
        enableZoom
        enablePan
        enableRotate
        autoRotate
        autoRotateSpeed={2}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <Environment 
        files={isMobileDevice 
          ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download3-7FArHVIJTFszlXm2045mQDPzsZqAyo.jpg"
          : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dither_it_M3_Drone_Shot_equirectangular-jpg_San_Francisco_Big_City_1287677938_12251179%20(1)-NY2qcmpjkyG6rDp1cPGIdX0bHk3hMR.jpg"
        }
        background
      />
    </>
  )
}

export default function Component() {
  const isMobileDevice = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  return (
    <div className="w-full h-screen bg-gray-900 relative">
      <div className="absolute top-2 right-4 flex space-x-4 z-50">
        <WalletMultiButton />
      </div>
      <div className="absolute top-4 left-4 flex space-x-4 z-50">
        <a 
          href="https://github.com/dodufish/PIXRA" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400 text-2xl"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a 
          href="https://x.com/pixra_ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400 text-2xl"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>

      <Canvas camera={{ 
        position: isMobileDevice ? [12, 0, -25] : [10.047021, -0.127436, -11.137374], 
        fov: 50 
      }}>
        <Scene />
      </Canvas>
    </div>
  )
}
