import { Suspense, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, Sparkles, OrbitControls, ContactShadows, Line } from '@react-three/drei';
import { ArrowLeft, Zap, Cpu, Activity, BatteryCharging } from 'lucide-react';
import * as THREE from 'three';

const PROJECTS = [
  {
    title: "VidyuthSwarm",
    tag: "Printed Mesh Logic",
    description: "Hex-grid autonomous nodes featuring printed photovoltaic surfaces and LoRa-E silicon integration. Designed for massive environmental data swarming.",
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    model: <SwarmModel />
  },
  {
    title: "NanoPrint Patch",
    tag: "Flexible Electronics",
    description: "Gold-serpentine printed circuit traces on bio-compatible elastomer. Monitors sweat-sodium and glucose via organic electrochemical transistors (OECTs).",
    icon: <Activity className="w-5 h-5 text-rose-400" />,
    model: <PatchModel />
  },
  {
    title: "CNT NanoProbe",
    tag: "Nano-Chemistry",
    description: "Multi-walled carbon nanotube (MWCNT) arrays on silicon-carbide tips. Enhances electron transfer rates for sub-micromolar analyte detection.",
    icon: <Cpu className="w-5 h-5 text-amber-400" />,
    model: <ProbeModel />
  },
  {
    title: "VidyuthStack",
    tag: "Printed Energy",
    description: "Thin-film solid-state graphene supercapacitors. Printed directly onto device chassis to eliminate bulky battery requirements.",
    icon: <BatteryCharging className="w-5 h-5 text-indigo-400" />,
    model: <StackModel />
  }
];

function SwarmModel() {
  const ref = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
        ref.current.rotation.y = t * 0.4;
    }
    if (ringRef.current) {
        ringRef.current.rotation.z = -t * 0.8;
    }
  });

  return (
    <group ref={ref}>
      {/* Hex Chassis */}
      <mesh rotation={[Math.PI/2, 0, Math.PI/6]}>
        <cylinderGeometry args={[1, 1, 0.15, 6]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Printed Solar Cells */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh 
          key={i} 
          position={[Math.cos(i * Math.PI/3) * 0.5, 0.08, Math.sin(i * Math.PI/3) * 0.5]}
          rotation={[-Math.PI/2, 0, i * Math.PI/3]}
        >
          <planeGeometry args={[0.4, 0.4]} />
          <meshStandardMaterial color="#003366" emissive="#003366" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {/* Central Brain */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} />
      </mesh>
      <mesh ref={ringRef} position={[0, 0.2, 0]} rotation={[Math.PI/2.5, 0, 0]}>
        <torusGeometry args={[0.45, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00ffcc" />
      </mesh>
      <Sparkles count={30} scale={2} size={1} speed={0.3} color="#00ffcc" />
    </group>
  );
}

function PatchModel() {
  const ref = useRef<THREE.Group>(null);
  
  // Create serpentine traces
  const traces = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 50; i++) {
        const x = (i / 50) * 4 - 2;
        const y = Math.sin(i * 0.8) * 0.2;
        pts.push(new THREE.Vector3(x, y, 0));
    }
    return pts;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
        ref.current.rotation.x = Math.sin(t * 0.5) * 0.2;
        ref.current.rotation.y = Math.cos(t * 0.3) * 0.2;
    }
  });

  return (
    <group ref={ref}>
      {/* Bio-Elastomer Substrate */}
      <mesh>
        <planeGeometry args={[3, 1.5, 32, 32]} />
        <MeshDistortMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.1} 
          speed={2} 
          distort={0.2} 
          metalness={0.1} 
          roughness={0} 
        />
      </mesh>
      {/* Printed Traces */}
      <Line points={traces} color="#ffcc00" lineWidth={2} position={[0, 0.2, 0.01]} />
      <Line points={traces} color="#ffcc00" lineWidth={2} position={[0, -0.2, 0.01]} />
      {/* Micro-Die */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.3, 0.3, 0.05]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0} />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[0.2, 0.2]} />
        <meshBasicMaterial color="#ff3366" />
      </mesh>
    </group>
  );
}

function ProbeModel() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
        ref.current.rotation.y = t;
        ref.current.position.y = Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      {/* Silicon Probe Base */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.25, 3, 16]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* CNT Array at Tip */}
      <group position={[0, -1.5, 0]}>
        <mesh>
          <cylinderGeometry args={[0.07, 0.07, 0.2, 16]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        {/* CNT Bristles */}
        {[...Array(12)].map((_, i) => (
            <mesh 
              key={i} 
              position={[Math.cos(i) * 0.05, -0.1, Math.sin(i) * 0.05]}
              rotation={[0.1, 0, 0.1]}
            >
              <cylinderGeometry args={[0.005, 0.005, 0.3, 8]} />
              <meshBasicMaterial color="#ffcc00" />
              <pointLight intensity={0.1} color="#ffcc00" />
            </mesh>
        ))}
      </group>
    </group>
  );
}

function StackModel() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
        ref.current.rotation.y = t * 0.3;
        ref.current.rotation.x = Math.PI / 6;
    }
  });

  return (
    <group ref={ref}>
      {/* Multi-layered Printed Stack */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, i * 0.12 - 0.2, 0]}>
          <boxGeometry args={[1.8, 0.08, 1.2]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#111" : "#444"} 
            metalness={0.6}
            roughness={0.4}
            transparent
            opacity={0.8}
          />
          {/* Graphene Ripple Effect */}
          {i === 2 && (
             <mesh position={[0, 0.05, 0]}>
                <planeGeometry args={[1.7, 1.1]} rotation={[-Math.PI/2, 0, 0]} />
                <meshBasicMaterial color="#5500ff" transparent opacity={0.3} wireframe />
             </mesh>
          )}
        </mesh>
      ))}
      {/* Energy Flow Animation */}
      <Sparkles count={40} scale={[2, 0.5, 1.5]} size={2} speed={1} color="#5500ff" />
    </group>
  );
}

export function FuturePage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[200] bg-[#050505] overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Technical Header */}
        <div className="mb-20 relative">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none" />
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors mb-8 cursor-pointer relative z-10"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Return to Core System</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-[1px] bg-cyan-400" />
             <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Nano-Electronics Pipeline v2.0</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none mb-6 relative z-10">
            FUTURE <br/><span className="text-transparent stroke-text">PRINTED.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl font-medium uppercase tracking-wide leading-relaxed relative z-10">
            VidyuthLabs is pioneering <span className="text-cyan-400">Printed Organics</span> and <span className="text-white">Carbon Nano-Arrays</span> to redefine molecular sensing at the sub-micromolar scale.
          </p>
        </div>

        {/* Technical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card Background with Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 rounded-[3rem] blur-xl transition-all duration-500" />
              
              <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-8 md:p-10 overflow-hidden">
                {/* 3D Viewport */}
                <div className="w-full aspect-square bg-[#050505] rounded-[2rem] mb-8 relative ring-1 ring-white/5 group-hover:ring-cyan-400/50 transition-all duration-700">
                  <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
                    <ambientLight intensity={0.4} />
                    <spotLight position={[5, 10, 5]} intensity={2} angle={0.15} penumbra={1} color="#00ffcc" />
                    <pointLight position={[-5, -5, -5]} intensity={1} color="#5500ff" />
                    <Suspense fallback={null}>
                      <Float speed={3} rotationIntensity={0.6} floatIntensity={0.6}>
                        {project.model}
                      </Float>
                      <Environment preset="night" />
                      <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={6} blur={3} />
                    </Suspense>
                    <OrbitControls enableZoom={false} makeDefault />
                  </Canvas>
                  
                  {/* Technical Overlay */}
                  <div className="absolute top-6 left-6 flex flex-col gap-1">
                     <span className="text-[10px] font-mono text-cyan-400/50 uppercase tracking-widest">Geometry Check: OK</span>
                     <span className="text-[10px] font-mono text-cyan-400/50 uppercase tracking-widest">Signal Locked</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                      {project.icon}
                    </div>
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">{project.tag}</span>
                  </div>

                  <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">{project.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium mb-0 group-hover:text-gray-300 transition-colors">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Technical Note */}
        <div className="mt-32 p-16 border border-dashed border-white/10 rounded-[4rem] text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-cyan-400/2 blur-[150px] pointer-events-none" />
           <h2 className="text-2xl font-black text-white uppercase tracking-[0.5em] mb-4">Laboratory Access Restricted</h2>
           <p className="text-gray-500 text-xs max-w-md mx-auto leading-loose uppercase tracking-widest">
             These designs represent intellectual property currently undergoing field trials. Contact VidyuthLabs directly for strategic R&D residency or partnership opportunities.
           </p>
        </div>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
        .group:hover .stroke-text {
          -webkit-text-stroke: 1px rgba(0,255,204,0.5);
        }
      `}</style>
    </motion.div>
  );
}
