import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, Html, useGLTF, Float, PerformanceMonitor } from "@react-three/drei";
import { motion } from "framer-motion";
import modelUrl  from "../assets/miata.glb"


export default function MiataHero() {
  return (
    <section className="relative h-[100svh] w-full bg-neutral-950">
      {/* 3D Scene */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, physicallyCorrectLights: true }}
        camera={{ position: [4, 1.6, 6], fov: 45 }}
      >
        <PerformanceMonitor onDecline={() => null} />
        <color attach="background" args={["#0a0a0a"]} />
        <Suspense fallback={<Loader />}> 
          <Scene modelUrl={modelUrl} />
        </Suspense>
        <Environment preset="city" />
        <ContactShadows
          position={[0, -0.001, 0]}
          opacity={0.5}
          scale={10}
          blur={2.2}
          far={10}
        />

        <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
      </Canvas>

      {/* Overlay content */}
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto select-none"
          >
            <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-white">
              Personaliza tu <span className="text-red-500">MX-5 Miata</span>
            </h1>
            <p className="mt-4 max-w-xl text-neutral-300 md:text-lg">
              Ligero. Puro. Divertido. Deslízate para descubrir su historia y crea tu configuración única.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#configurador"
                className="pointer-events-auto inline-flex items-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-500 focus-visible:outline-none"
              >
                Ir al configurador
              </a>
              <button
 
                className="pointer-events-auto inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Ver historia
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 ">
        <div className="flex flex-col items-center gap-2">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-6 rounded-full border border-red-500"
          />
          <span className="text-xs uppercase tracking-widest">Desliza</span>
        </div>
      </div>
    </section>
  );
}


function Loader() {
  return (
    <Html center>
      <div className="rounded-2xl border border-white/10 bg-black/60 px-4 py-2 text-sm text-white shadow-xl">
        Cargando Miata…
      </div>
    </Html>
  );
}


function Scene({ modelUrl }) {
  return (
    <group position={[-2, -1, -3]}> 
      <FloorRim />
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <group position={[0, 0, 0]}> 
          <Car modelUrl={modelUrl} />
        </group>
      </Float>
      <group>
        <spotLight position={[3, 5, 3]} angle={0.45} penumbra={0.5} intensity={1.2} castShadow />
        <spotLight position={[-6, 4, -3]} angle={0.5} penumbra={0.5} intensity={0.6} color={"#ff6666"} />
      </group>
    </group>
  );
}


function FloorRim() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[3.6, 64]} />
      <meshStandardMaterial color="#111111" metalness={0} roughness={0.8} />
    </mesh>
  );
}


function Car({ modelUrl }) {
  const group = useRef();
  

  const { scene } = useGLTF(modelUrl);

 
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={group} position={[0, 0, 0]} dispose={null} scale={0.5} castShadow receiveShadow>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload(modelUrl);
