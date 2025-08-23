import React, { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Html,
  useGLTF,
  ContactShadows,
} from "@react-three/drei";
import modelUrl from "../assets/miata2.glb";

export default function CarConfigurator() {
  const [color, setColor] = useState("#d32f2f");
  const [wheelType, setWheelType] = useState("default");

  return (
    <div className="w-full h-[90vh] relative bg-neutral-900">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, physicallyCorrectLights: true }}
        camera={{ position: [4, 2, 6], fov: 45 }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={<Loader />}>
          <Car modelUrl={modelUrl} color={color} wheelType={wheelType} />
        </Suspense>
        <Environment preset="city" />
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.5}
          scale={10}
          blur={2.2}
          far={10}
        />
        <OrbitControls enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute top-6 left-6 bg-black/50 rounded-lg p-4 flex flex-col gap-4">
        <div>
          <h3 className="text-white font-bold mb-2">Car Color</h3>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-8 cursor-pointer"
          />
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">Wheels</h3>
          <select
            value={wheelType}
            onChange={(e) => setWheelType(e.target.value)}
            className="w-full p-1 rounded bg-neutral-800 text-white"
          >
            <option value="default">Default</option>
            <option value="sport">Sport</option>
            <option value="classic">Classic</option>
          </select>
        </div>
      </div>
    </div>
  );
}


function Loader() {
  return (
    <Html center>
      <div className="rounded-lg px-4 py-2 bg-black/60 text-white">Loading Car…</div>
    </Html>
  );
}

function Car({ modelUrl, color, wheelType }) {
  const group = useRef();
  const gltf = useGLTF(modelUrl);

 
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.1;
  });

  useMemo(() => {
    if (!gltf.scene) return;
    gltf.scene.traverse((child) => {
      if (child.isMesh) {

        if (child.name.toLowerCase().includes("body")) {
          child.material = child.material.clone();
          child.material.color.set(color);
          child.material.metalness = 0.6;
          child.material.roughness = 0.35;
        }
      }
    });
  }, [gltf, color]);

  return (
    <group ref={group} dispose={null} position={[0, -0.6, 0]} castShadow receiveShadow>
      <primitive object={gltf.scene} />
    </group>
  );
}

useGLTF.preload(modelUrl);
