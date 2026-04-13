/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Text, MeshDistortMaterial } from '@react-three/drei';

export function VidyutX({ isFloating = true }: { isFloating?: boolean }) {
  const meshRef = useRef<THREE.Group>(null);

  return (
    <group ref={meshRef}>
      <Float speed={isFloating ? 2 : 0} rotationIntensity={isFloating ? 0.5 : 0} floatIntensity={isFloating ? 0.5 : 0}>
        {/* PCB Base - Matte Black */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.05, 4.5]} />
          <meshPhysicalMaterial color="#050505" roughness={0.8} metalness={0.1} clearcoat={0.1} />
        </mesh>

        {/* Top Circular Electrode Area */}
        <group position={[0, 0.03, -1.2]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.5, 64]} />
            <meshPhysicalMaterial color="#ffcc00" metalness={1} roughness={0.2} clearcoat={0.3} />
          </mesh>
          {/* Outer Ring */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
            <ringGeometry args={[0.55, 0.65, 64]} />
            <meshPhysicalMaterial color="#ffcc00" metalness={1} roughness={0.2} clearcoat={0.3} />
          </mesh>
        </group>

        {/* Chemical Structure Icon (Simplified as group of small circles/lines) */}
        <group position={[0, 0.03, -0.2]} scale={0.15}>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <group key={i} rotation={[0, (angle * Math.PI) / 180, 0]}>
              <mesh position={[1, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.1, 16]} />
                <meshPhysicalMaterial color="#ffd700" metalness={1} roughness={0.15} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Branding Text */}
        <Text
          position={[0, 0.03, 0.5]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.18}
          color="#ffd700"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
        >
          VidyutX
        </Text>
        <Text
          position={[0, 0.03, 0.8]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.1}
          color="#ffd700"
        >
          By VidyuthLabs V1.0
        </Text>

        {/* Bottom Rectangular Contacts (CE, WE, RE) */}
        <group position={[0, 0.03, 1.8]}>
          {[-0.4, 0, 0.4].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.25, 0.8]} />
              <meshPhysicalMaterial color="#ffcc00" metalness={1} roughness={0.2} clearcoat={0.3} />
            </mesh>
          ))}
          
          <Text position={[-0.4, 0.05, -0.6]} fontSize={0.12} color="white" rotation={[-Math.PI / 2, 0, 0]}>CE</Text>
          <Text position={[0, 0.05, -0.6]} fontSize={0.12} color="white" rotation={[-Math.PI / 2, 0, 0]}>WE</Text>
          <Text position={[0.4, 0.05, -0.6]} fontSize={0.12} color="white" rotation={[-Math.PI / 2, 0, 0]}>RE</Text>
        </group>

        {/* Traces (Subtle lines) */}
        <mesh position={[0, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.3, 4.3]} />
          <meshStandardMaterial color="#111" transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
}
