"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Group, Mesh } from "three";

function Logo() {
  const groupRef = useRef<Group>(null);
  const textRef = useRef<Mesh>(null);
  // const envMap = useTexture('/textures/envmap.jpg');

  useEffect(() => {
    if (textRef.current) {
      textRef.current.geometry.center();
    }
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.25;
    }
  });

  return (
    <>
      {/* Warm ambient light */}
      <ambientLight intensity={0.5} color="#FFF5E0" />

      {/* Main directional light (sun-like) */}
      <directionalLight position={[5, 5, 5]} intensity={1} color="#FFFAF0" />

      {/* Top light for highlights */}
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#FFFAF0" />

      {/* Front light for extra shine */}
      <spotLight
        position={[0, 0, 10]}
        angle={0.6}
        penumbra={1}
        intensity={0.5}
        color="#FFD700"
      />

      <group ref={groupRef}>
        <Text3D
          ref={textRef}
          font="/fonts/inter-bold.json"
          size={2.2}
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelSegments={10}
          castShadow
          receiveShadow
        >
          i2089
          <meshPhysicalMaterial
            color={new THREE.Color("#FFD700")}
            metalness={1}
            roughness={0.1}
            reflectivity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Text3D>
      </group>
    </>
  );
}

function Scene() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <Logo />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

export function GoldLogoComponent() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-white to-gray-200">
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
          stencil: true,
          depth: true,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
