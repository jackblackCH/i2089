"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Text3D,
  OrbitControls,
  Center,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { useControls, folder, Leva } from "leva";

function GlassText() {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const [textProps, setTextProps] = useState({
    text: "22",
    size: 0.5,
    height: 0.05,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 5,
  });

  const [materialProps, setMaterialProps] = useState({
    transmission: 0.98,
    opacity: 0.7,
    metalness: 0.01,
    roughness: 0.01,
    ior: 1.2,
    thickness: 0.05,
    specularIntensity: 1,
    envMapIntensity: 5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });

  useControls({
    Text: folder({
      text: {
        value: "22",
        label: "Content",
        onChange: (v) => setTextProps((prev) => ({ ...prev, text: v })),
      },
      size: {
        value: 0.5,
        min: 0.1,
        max: 2,
        step: 0.1,
        onChange: (v) => setTextProps((prev) => ({ ...prev, size: v })),
      },
      height: {
        value: 0.05,
        min: 0.01,
        max: 0.2,
        step: 0.01,
        onChange: (v) => setTextProps((prev) => ({ ...prev, height: v })),
      },
      curveSegments: {
        value: 12,
        min: 1,
        max: 32,
        step: 1,
        onChange: (v) =>
          setTextProps((prev) => ({ ...prev, curveSegments: v })),
      },
      bevelEnabled: {
        value: true,
        onChange: (v) => setTextProps((prev) => ({ ...prev, bevelEnabled: v })),
      },
      bevelThickness: {
        value: 0.01,
        min: 0.001,
        max: 0.1,
        step: 0.001,
        onChange: (v) =>
          setTextProps((prev) => ({ ...prev, bevelThickness: v })),
      },
      bevelSize: {
        value: 0.01,
        min: 0.001,
        max: 0.1,
        step: 0.001,
        onChange: (v) => setTextProps((prev) => ({ ...prev, bevelSize: v })),
      },
      bevelSegments: {
        value: 5,
        min: 1,
        max: 16,
        step: 1,
        onChange: (v) =>
          setTextProps((prev) => ({ ...prev, bevelSegments: v })),
      },
    }),
  });

  useControls({
    Material: folder({
      transmission: {
        value: 0.98,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: (v) =>
          setMaterialProps((prev) => ({ ...prev, transmission: v })),
      },
      opacity: {
        value: 0.7,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: (v) => setMaterialProps((prev) => ({ ...prev, opacity: v })),
      },
      metalness: {
        value: 0.01,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: (v) =>
          setMaterialProps((prev) => ({ ...prev, metalness: v })),
      },
      roughness: {
        value: 0.01,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: (v) =>
          setMaterialProps((prev) => ({ ...prev, roughness: v })),
      },
      ior: {
        value: 1.2,
        min: 1,
        max: 2.33,
        step: 0.01,
        onChange: (v) => setMaterialProps((prev) => ({ ...prev, ior: v })),
      },
      thickness: {
        value: 0.05,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: (v) =>
          setMaterialProps((prev) => ({ ...prev, thickness: v })),
      },
      specularIntensity: {
        value: 1,
        min: 0,
        max: 5,
        step: 0.1,
        onChange: (v) =>
          setMaterialProps((prev) => ({ ...prev, specularIntensity: v })),
      },
      envMapIntensity: {
        value: 5,
        min: 0,
        max: 10,
        step: 0.1,
        onChange: (v) =>
          setMaterialProps((prev) => ({ ...prev, envMapIntensity: v })),
      },
      clearcoat: {
        value: 1,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: (v) =>
          setMaterialProps((prev) => ({ ...prev, clearcoat: v })),
      },
      clearcoatRoughness: {
        value: 0.1,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: (v) =>
          setMaterialProps((prev) => ({ ...prev, clearcoatRoughness: v })),
      },
    }),
  });

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  useEffect(() => {
    if (mesh.current && mesh.current.geometry) {
      const geometry = mesh.current.geometry;
      const positionAttribute = geometry.getAttribute("position");

      if (positionAttribute && positionAttribute.count > 0) {
        const colors = new Float32Array(positionAttribute.count * 3);

        for (let i = 0; i < positionAttribute.count; i++) {
          const y = positionAttribute.getY(i);
          const normalizedY = (y + 0.25) / 0.5; // Normalize y between 0 and 1
          colors[i * 3] = Math.sin(normalizedY * Math.PI); // Red
          colors[i * 3 + 1] = Math.cos(normalizedY * Math.PI * 0.5); // Green
          colors[i * 3 + 2] = 1 - normalizedY; // Blue
        }

        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.attributes.color.needsUpdate = true;
      }
    }
  }, [textProps]);

  return (
    <Center scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}>
      <mesh ref={mesh}>
        <Text3D font="/fonts/geist_bold.json" {...textProps}>
          {textProps.text}
          <meshPhysicalMaterial
            {...materialProps}
            transparent
            side={THREE.DoubleSide}
            vertexColors
          />
        </Text3D>
      </mesh>
    </Center>
  );
}

function Scene() {
  const { gl, scene } = useThree();

  useEffect(() => {
    gl.toneMapping = THREE.NeutralToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMappingExposure = 1.2;
    scene.background = new THREE.Color(0xff0000);
    // set alpha
  }, [gl, scene]);

  return null;
}

export default function Component() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="h-screen w-full">
      <Canvas>
        <Scene />
        <PerspectiveCamera makeDefault position={[0, 0, 2]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <GlassText />
        <OrbitControls enableZoom={false} />
        {/* <Environment preset="studio" background={false} /> */}
      </Canvas>
      <Leva oneLineLabels />
    </div>
  );
}
