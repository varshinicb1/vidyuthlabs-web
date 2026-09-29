import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from './Text';
import * as THREE from 'three';

const GOLD = '#e9b64a';

/**
 * A gold ENIG screen-printed electrode (three-electrode layout) with an
 * application-specific nanomaterial coating over the working electrode.
 * The `coating` colour is what changes between catalogue items.
 *
 * `spin` makes it gently rock while staying face-on (a flat card doing a full
 * 360° spin looks like a thin stick edge-on). Manual drag still rotates freely.
 */
export function SpeChip({ coating, code, spin = true }: { coating: string; code: string; spin?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coatRef.current) {
      // gentle "active sensing" shimmer on the coating
      coatRef.current.emissiveIntensity = 0.35 + Math.sin(t * 2) * 0.15;
    }
    if (spin && groupRef.current) {
      // stay mostly face-on; rock side to side instead of full spin
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.45;
      groupRef.current.rotation.x = -0.12 + Math.sin(t * 0.4) * 0.06;
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.12, 0, 0]}>
      {/* PCB substrate */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 3.2, 0.08]} />
        <meshPhysicalMaterial color="#0c1013" roughness={0.55} metalness={0.25} clearcoat={0.3} clearcoatRoughness={0.4} />
      </mesh>

      {/* subtle silk border */}
      <mesh position={[0, 0, 0.041]}>
        <ringGeometry args={[0.98, 1.0, 4]} />
        <meshBasicMaterial color="#1b2228" side={THREE.DoubleSide} />
      </mesh>

      {/* Working electrode (gold disc) */}
      <mesh position={[0, 0.55, 0.045]}>
        <cylinderGeometry args={[0.52, 0.52, 0.02, 48]} />
        <meshPhysicalMaterial color={GOLD} metalness={1} roughness={0.22} clearcoat={0.5} />
      </mesh>

      {/* Nanomaterial coating (the part that changes) */}
      <mesh position={[0, 0.55, 0.058]}>
        <cylinderGeometry args={[0.46, 0.46, 0.012, 48]} />
        <meshStandardMaterial
          ref={coatRef}
          color={coating}
          emissive={coating}
          emissiveIntensity={0.4}
          roughness={0.35}
          metalness={0.4}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Counter electrode (gold arc hugging the working electrode) */}
      <mesh position={[0, 0.55, 0.044]} rotation={[0, 0, Math.PI]}>
        <ringGeometry args={[0.6, 0.72, 48, 1, Math.PI * 0.15, Math.PI * 0.7]} />
        <meshPhysicalMaterial color={GOLD} metalness={1} roughness={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* Reference electrode (small gold bar) */}
      <mesh position={[0.62, -0.15, 0.045]}>
        <boxGeometry args={[0.16, 0.42, 0.02]} />
        <meshPhysicalMaterial color={GOLD} metalness={1} roughness={0.25} />
      </mesh>

      {/* Connection traces */}
      {[-0.42, 0, 0.42].map((x, i) => (
        <mesh key={i} position={[x, -0.55, 0.043]}>
          <boxGeometry args={[0.05, 0.9, 0.006]} />
          <meshStandardMaterial color="#3a4148" metalness={0.6} roughness={0.5} />
        </mesh>
      ))}

      {/* Bottom contact pads (CE / WE / RE) */}
      {[-0.42, 0, 0.42].map((x, i) => (
        <mesh key={i} position={[x, -1.25, 0.045]}>
          <boxGeometry args={[0.3, 0.62, 0.02]} />
          <meshPhysicalMaterial color={GOLD} metalness={1} roughness={0.25} clearcoat={0.4} />
        </mesh>
      ))}

      {/* Silkscreen labels */}
      <Text position={[0, -0.05, 0.05]} fontSize={0.13} color="#8b98a0" anchorX="center" letterSpacing={0.1}>
        NanoX SPE
      </Text>
      <Text position={[0, -0.78, 0.05]} fontSize={0.1} color={coating} anchorX="center" letterSpacing={0.15}>
        {code}
      </Text>
    </group>
  );
}
