import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const GRID_SIZE = isMobile ? 60 : 100; // Drastically reduce points on mobile
const GRID_SPACING = isMobile ? 0.5 : 0.35;

function SensorWaveGrid() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Calculate grid layout mapped onto a plane
  const [positions, colors] = useMemo(() => {
    const pos = [];
    const col = [];
    const color = new THREE.Color();
    
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const x = (i - GRID_SIZE / 2) * GRID_SPACING;
        const z = (j - GRID_SIZE / 2) * GRID_SPACING;
        pos.push(x, 0, z); // Y will be animated

        // seamless mix of cyan, blue and violet
        const mixRatio = (Math.sin(x * 0.1) * Math.cos(z * 0.1) + 1) / 2;
        const pseudoRandom = Math.abs(Math.sin((i * GRID_SIZE + j) * 43.5453123));
        color.setHex(0x7A5CFF).lerp(new THREE.Color(0x00F5FF), mixRatio * 0.8 + pseudoRandom * 0.2);
        
        // dim edges slightly
        const dist = Math.sqrt(x*x + z*z);
        const fade = Math.max(0, 1 - dist/20);
        col.push(color.r * fade, color.g * fade, color.b * fade);
      }
    }
    
    return [new Float32Array(pos), new Float32Array(col)];
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Parallax logic tied to scroll
    const scrollY = window.scrollY || 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // The camera smoothly glides over and into the grid
    state.camera.position.z = 15 - scrollProgress * 15;
    state.camera.position.y = 5 - scrollProgress * 3;
    state.camera.position.x = Math.sin(scrollProgress * Math.PI) * 2;
    state.camera.lookAt(0, -2, 0); // look slightly down into the fabric

    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const positionsArray = posAttr.array as Float32Array;
      
      let index = 0;
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          // Pre-cache variables for performance speedup
          const x = (i - GRID_SIZE / 2) * GRID_SPACING;
          const z = (j - GRID_SIZE / 2) * GRID_SPACING;
          
          // Simplified fabric multi-octave math to prevent JS thread blocking
          let y = Math.sin(x * 0.15 + time * 0.4) * 0.8 + Math.cos(z * 0.15 + time * 0.3) * 0.8;
          y += Math.sin(x * 0.4 - time * 0.2 + z * 0.2) * 0.3;
          
          // Disable tertiary micro ripples on mobile for performance
          if (!isMobile) {
            y += Math.cos(x * 0.8 + z * 0.8 + time * 0.5) * 0.1;
          }
          
          // Subtle overarching swell
          y += Math.sin((x * x + z * z) * 0.02 + time * 0.6) * 0.5;

          positionsArray[index * 3 + 1] = y;
          index++;
        }
      }
      posAttr.needsUpdate = true;
      
      // grid slowly rotates
      pointsRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <points ref={pointsRef} position={[0, -5, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.07} 
        vertexColors 
        transparent 
        opacity={0.9} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending} 
        toneMapped={false} 
      />
    </points>
  );
}

// Background gradient layer
function AmbientBackground() {
  return (
    <mesh position={[0, 0, -30]}>
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial color="#020108" />
    </mesh>
  );
}

export function Scene() {
  return (
    <>
      <AmbientBackground />
      <SensorWaveGrid />
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} mipmapBlur={!isMobile} luminanceSmoothing={0.9} intensity={2.0} />
      </EffectComposer>
    </>
  );
}
