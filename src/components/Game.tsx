import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, Line, Float, Stars, Grid } from '@react-three/drei';
import { Text } from './three/Text';
import * as THREE from 'three';
import { AnalyteX } from './AnalyteX';
import { NanoX } from './NanoX';
import { useGameStore } from '../store';

function MobilePhone({ progress }: { progress: number }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!ref.current) return;
    // Visible during the "mobile" section band
    if (progress > 0.45 && progress < 0.55) {
      ref.current.visible = true;
      // Slide in from right, out to the right
      const targetX = progress < 0.485 ? THREE.MathUtils.lerp(6, 2.8, (progress - 0.455) / 0.03) :
                      progress > 0.515 ? THREE.MathUtils.lerp(2.8, 6, (progress - 0.515) / 0.03) : 2.8;
      ref.current.position.lerp(new THREE.Vector3(targetX, 0, 2), 0.1);
      ref.current.rotation.y = -Math.PI / 6;
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <group ref={ref} visible={false}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Phone Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 4.4, 0.2]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[2.0, 4.2]} />
          <meshStandardMaterial color="#050505" emissive="#050505" />
        </mesh>
      {/* App UI */}
      <group position={[0, 0, 0.12]}>
        {/* Header */}
        <mesh position={[0, 1.8, 0]}>
          <planeGeometry args={[2.0, 0.6]} />
          <meshBasicMaterial color="#111" />
        </mesh>
        <Text position={[-0.8, 1.8, 0.01]} fontSize={0.12} color="#00ffcc" anchorX="left">VidyuthLabs</Text>
        <Text position={[0.8, 1.8, 0.01]} fontSize={0.08} color="gray" anchorX="right">SYNCED</Text>
        
        {/* Dashboard Cards */}
        <mesh position={[0, 0.8, 0]}>
          <planeGeometry args={[1.8, 1.2]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <Text position={[-0.8, 1.2, 0.01]} fontSize={0.10} color="gray" anchorX="left">LATEST SCAN</Text>
        <Text position={[-0.8, 0.95, 0.01]} fontSize={0.16} color="#fff" anchorX="left">Lead (Pb)</Text>
        <Text position={[-0.8, 0.70, 0.01]} fontSize={0.20} color="#ff3366" anchorX="left">12 ppb</Text>

        {/* Graph Mockup */}
        <Line points={[[-0.8, 0.4, 0.01], [-0.4, 0.4, 0.01], [0, 0.65, 0.01], [0.4, 0.35, 0.01], [0.8, 0.55, 0.01]]} color="#00ffcc" lineWidth={2} />

        <mesh position={[0, -0.4, 0]}>
          <planeGeometry args={[1.8, 0.8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <Text position={[-0.8, -0.2, 0.01]} fontSize={0.1} color="gray" anchorX="left">SAMPLE STATUS</Text>
        <Text position={[-0.8, -0.5, 0.01]} fontSize={0.12} color="#ff3366" anchorX="left">UNSAFE - EXCEEDS LIMIT</Text>

        <mesh position={[0, -1.4, 0]}>
          <planeGeometry args={[1.8, 0.8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <Text position={[-0.8, -1.2, 0.01]} fontSize={0.1} color="gray" anchorX="left">RECOMMENDATION</Text>
        <Text position={[-0.8, -1.5, 0.01]} fontSize={0.12} color="#fff" anchorX="left">Treat source · retest sample</Text>
      </group>
      </Float>
    </group>
  );
}

function ApplicationsVisual({ progress }: { progress: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  // Visible during the "applications" section band
  const isVisible = progress > 0.63 && progress < 0.73;
  return (
    <group position={[10, 0, 0]} visible={isVisible} ref={ref}>
      {/* DNA Helix or Abstract Medical structure */}
      {[...Array(20)].map((_, i) => {
        const y = (i - 10) * 0.3;
        const angle = i * 0.5;
        return (
          <group key={i} position={[0, y, 0]}>
            <mesh position={[Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5]}>
              <sphereGeometry args={[0.2]} />
              <meshPhysicalMaterial color="#00ffcc" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-Math.cos(angle) * 1.5, 0, -Math.sin(angle) * 1.5]}>
              <sphereGeometry args={[0.2]} />
              <meshPhysicalMaterial color="#ff3366" metalness={0.8} roughness={0.2} />
            </mesh>
            <Line points={[
              [Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5],
              [-Math.cos(angle) * 1.5, 0, -Math.sin(angle) * 1.5]
            ]} color="#ffffff" opacity={0.2} transparent />
          </group>
        );
      })}
    </group>
  );
}

function WhyUsVisual({ progress }: { progress: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 4;
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });
  const isVisible = progress > 0.72 && progress < 0.82;
  return (
    <group position={[30, 0, 0]} visible={isVisible}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={ref}>
        {/* Glowing Microchip / Core */}
        <mesh>
          <boxGeometry args={[2, 2, 0.2]} />
          <meshPhysicalMaterial color="#050505" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshBasicMaterial color="#00ffcc" wireframe />
        </mesh>
        {/* Data lines */}
        {[...Array(8)].map((_, i) => (
          <Line key={i} points={[
            [Math.cos(i * Math.PI/4) * 1, Math.sin(i * Math.PI/4) * 1, 0],
            [Math.cos(i * Math.PI/4) * 3, Math.sin(i * Math.PI/4) * 3, 0]
          ]} color="#00ffcc" transparent opacity={0.5} />
        ))}
      </group>
      </Float>
    </group>
  );
}


function LiquidDrop({ progress }: { progress: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  
  useFrame(() => {
    if (!ref.current || !materialRef.current) return;
    const dropStart = 0.273;
    const dropEnd = 0.364;

    if (progress > dropStart && progress < dropEnd) {
      ref.current.visible = true;

      let t = 0;
      let color = "#2aa9ff"; // Water

      if (progress < 0.303) {
        t = (progress - 0.273) / (0.303 - 0.273);
        color = "#2aa9ff"; // Water
      } else if (progress < 0.333) {
        t = (progress - 0.303) / (0.333 - 0.303);
        color = "#9bd14b"; // Soil
      } else {
        t = (progress - 0.333) / (0.364 - 0.333);
        color = "#ffb020"; // Food
      }
      
      materialRef.current.color.set(color);
      
      // Simulate gravity: y = y0 - 1/2 * g * t^2
      // We map t (0 to 1) to a quadratic curve
      const easeT = t * t;
      ref.current.position.set(0, 2 - easeT * 1.97, 2.75);
      
      // Stretch vertically while falling, flatten as it hits
      if (t > 0.9) {
        // Flattening upon impact
        const impactT = (t - 0.9) * 10; // 0 to 1
        ref.current.scale.set(
          THREE.MathUtils.lerp(0.08, 0.15, impactT),
          THREE.MathUtils.lerp(0.12, 0.05, impactT),
          THREE.MathUtils.lerp(0.08, 0.15, impactT)
        );
      } else {
        // Falling stretch
        ref.current.scale.set(0.08, 0.12, 0.08);
      }
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhysicalMaterial 
        ref={materialRef}
        color="#880000" 
        transparent 
        opacity={0.8} 
        roughness={0.05} 
        metalness={0.1} 
        clearcoat={1.0} 
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

function QuantumFabric() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Subtle wave motion
    meshRef.current.rotation.z = Math.sin(t * 0.1) * 0.05;
    
    // Wave the vertices slightly via position
    const positions = (meshRef.current.geometry as THREE.BufferGeometry).attributes.position;
    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = Math.sin(x * 0.5 + t) * Math.cos(y * 0.5 + t) * 0.3;
        positions.setZ(i, z);
    }
    positions.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, -5]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshStandardMaterial 
        color="#00e5ff" 
        wireframe 
        transparent 
        opacity={0.03} 
        emissive="#00e5ff"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function Scene() {
  const analyteRef = useRef<THREE.Group>(null);
  const vidyutRef = useRef<THREE.Group>(null);
  const totalScrollProgress = useGameStore(state => state.totalScrollProgress);

  const { camera, size } = useThree();

  useFrame((state) => {
    const t = totalScrollProgress;
    const isMobile = window.innerWidth < 768;
    
    // Dynamically adjust FOV based on aspect ratio to prevent clipping in portrait mode
    const aspect = size.width / size.height;
    const targetFov = aspect < 1 ? 45 + (1 - aspect) * 60 : 45; // Widen FOV heavily on narrow screens
    (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp((camera as THREE.PerspectiveCamera).fov, targetFov, 0.1);
    
    if (!isMobile) {
      // Shift camera view left by exactly 25% of the screen width for side-by-side layout
      (camera as THREE.PerspectiveCamera).setViewOffset(size.width, size.height, size.width * 0.25, 0, size.width, size.height);
    } else {
      (camera as THREE.PerspectiveCamera).clearViewOffset();
    }
    
    camera.updateProjectionMatrix();

    const mobileYOffset = isMobile ? 1.5 : 0; // Shift camera lookAt down to move model up
    const mobileZOffset = isMobile ? 2 : 0;   // Pull camera back slightly on mobile

    // Camera transitions based on scroll
    let targetPos = new THREE.Vector3(0, 0, 10 + mobileZOffset);
    let targetLookAt = new THREE.Vector3(0, -mobileYOffset, 0);

    if (t < 0.091) { // Hero
      targetPos.set(0, 0, 8 + mobileZOffset);
      targetLookAt.set(0, -mobileYOffset, 0);
    } else if (t < 0.182) { // Sensor
      targetPos.set(0, 0, 6 + mobileZOffset);
      targetLookAt.set(0, -mobileYOffset, 0);
    } else if (t < 0.273) { // Insertion
      targetPos.set(0, 5 + (isMobile ? 2 : 0), -0.5);
      targetLookAt.set(0, 0, -0.5);
    } else if (t < 0.364) { // Sample
      targetPos.set(0, 3 + (isMobile ? 1 : 0), 1.5);
      targetLookAt.set(0, 0, 1.5);
    } else if (t < 0.455) { // Analysis
      targetPos.set(0, 1, 4 + mobileZOffset);
      targetLookAt.set(0, 0.5 - mobileYOffset, 0);
    } else if (t < 0.545) { // Mobile
      targetPos.set(0, 0, 8 + mobileZOffset);
      targetLookAt.set(0, -mobileYOffset, 0);
    } else if (t < 0.636) { // Results
      targetPos.set(0, 1, 4 + mobileZOffset);
      targetLookAt.set(0, 0.5 - mobileYOffset, 0);
    } else if (t < 0.727) { // Applications
      targetPos.set(10, 0, 8 + mobileZOffset);
      targetLookAt.set(10, -mobileYOffset, 0);
    } else if (t < 0.818) { // Why Us
      targetPos.set(30, 0, 8 + mobileZOffset);
      targetLookAt.set(30, -mobileYOffset, 0);
    } else if (t < 0.909) { // Target Market
      targetPos.set(30, 0, 8 + mobileZOffset);
      targetLookAt.set(30, -mobileYOffset, 0);
    } else { // Vision
      targetPos.set(0, 0, 10 + mobileZOffset);
      targetLookAt.set(0, -mobileYOffset, 0);
    }

    state.camera.position.lerp(targetPos, 0.02);
    
    const currentLookAt = new THREE.Vector3();
    state.camera.getWorldDirection(currentLookAt);
    currentLookAt.add(state.camera.position);
    currentLookAt.lerp(targetLookAt, 0.02);
    state.camera.lookAt(currentLookAt);

    // Device & Sensor Transforms
    if (analyteRef.current && vidyutRef.current) {
      let aPos = new THREE.Vector3();
      let aRot = new THREE.Euler();
      let vPos = new THREE.Vector3();
      let vRot = new THREE.Euler();

      if (t < 0.091) {
        // Hero
        aPos.set(0, 0, 0);
        aRot.set(0, 0, 0);
        vPos.set(10, 0, 0); // Hidden
      } else if (t < 0.182) {
        // Sensor
        aPos.set(-2, 0, 0);
        aRot.set(0, 0, 0);
        vPos.set(2, 0, 2);
        vRot.set(Math.PI / 4, t * 20, 0); // Spinning
      } else if (t < 0.273) {
        // Insertion
        aPos.set(0, 0, -2);
        aRot.set(-Math.PI / 2, 0, 0);

        if (t < 0.212) {
          // Aligning
          const alignT = (t - 0.182) / 0.03;
          vPos.set(0, 0, THREE.MathUtils.lerp(5, 2.5, alignT));
          vRot.set(0, Math.PI, 0);
        } else if (t < 0.232) {
          // Pause to show contacts
          vPos.set(0, 0, 2.5);
          vRot.set(0, Math.PI, 0);
        } else {
          // Inserting precisely into the slot with a snap
          const insertT = (t - 0.232) / 0.041;
          const snapT = 1 - Math.pow(1 - insertT, 3); // cubic ease out
          vPos.set(0, 0, THREE.MathUtils.lerp(2.5, 1.55, snapT));
          vRot.set(0, Math.PI, 0);

          // Add a physical "bump" to the AnalyteX device when inserted
          if (insertT > 0.8) {
             const bump = Math.sin((insertT - 0.8) * 5 * Math.PI) * 0.05;
             aPos.z -= bump;
          }
        }
      } else if (t < 0.364) {
        // Sample
        aPos.set(0, 0, -2);
        aRot.set(-Math.PI / 2, 0, 0);
        vPos.set(0, 0, 1.55);
        vRot.set(0, Math.PI, 0);
      } else if (t < 0.455) {
        // Analysis
        aPos.set(0, 0, 0);
        aRot.set(0, 0, 0);
        vPos.set(0, 0.05, 0);
        vRot.set(Math.PI / 2, 0, Math.PI);
      } else if (t < 0.545) {
        // Mobile
        aPos.set(-3, 0, 0);
        vPos.set(-3, 0.05, 0);
        vRot.set(Math.PI / 2, 0, Math.PI);
      } else if (t < 0.909) {
        // Results & Info (results, applications, why-us, target market)
        aPos.set(0, 0, 0);
        vPos.set(0, 0.05, 0);
        vRot.set(Math.PI / 2, 0, Math.PI);
      } else {
        // Vision — move device out of frame for the team reveal
        aPos.set(0, 15, 0);
        vPos.set(0, 15, 0);
      }

      analyteRef.current.position.lerp(aPos, 0.05);
      analyteRef.current.quaternion.slerp(new THREE.Quaternion().setFromEuler(aRot), 0.05);
      
      vidyutRef.current.position.lerp(vPos, 0.05);
      vidyutRef.current.quaternion.slerp(new THREE.Quaternion().setFromEuler(vRot), 0.05);
    }
  });

  return (
    <>
      {/* Self-hosted (CC0, from @pmndrs/assets); preset="city" fetches from raw.githack.com at runtime. */}
      <Environment files="/hdri/city.exr" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#00ffcc" />
      
      <group ref={analyteRef}>
        <AnalyteX />
      </group>
      
      <group ref={vidyutRef}>
        <NanoX isFloating={false} />
      </group>

      <LiquidDrop progress={totalScrollProgress} />
      <MobilePhone progress={totalScrollProgress} />
      <ApplicationsVisual progress={totalScrollProgress} />
      <WhyUsVisual progress={totalScrollProgress} />

      <QuantumFabric />
      
      <Grid
        position={[0, -2.5, 0]}
        sectionSize={1.5}
        sectionColor="#008899"
        sectionThickness={1.5}
        cellSize={0.5}
        cellColor="#003344"
        cellThickness={0.8}
        infiniteGrid
        fadeDistance={40}
        fadeStrength={5}
      />

      <ContactShadows position={[0, -2.4, 0]} opacity={0.4} scale={20} blur={2} far={10} resolution={256} />
    </>
  );
}

export function Game() {
  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 45 }}>
      <color attach="background" args={['#000000']} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
