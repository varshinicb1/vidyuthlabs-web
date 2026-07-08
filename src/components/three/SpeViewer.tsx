import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SpeChip } from './SpeChip';
import { LazyMount } from './LazyMount';

/**
 * Interactive 3D viewer for a single SPE. Drag to rotate; auto-rotates when
 * idle. One shared instance is reused across the catalogue (coating/code swap
 * on tab change) so the page only ever holds one extra WebGL context here.
 */
export function SpeViewer({ coating, code }: { coating: string; code: string }) {
  return (
    <LazyMount
      className="h-full w-full"
      placeholder={
        <div className="grid h-full w-full place-items-center">
          <div className="h-40 w-24 animate-pulse rounded-xl bg-white/5" />
        </div>
      }
    >
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <hemisphereLight args={['#ffffff', '#1a2028', 0.7]} />
        <directionalLight position={[3, 5, 6]} intensity={2.4} />
        <directionalLight position={[-5, 2, 3]} intensity={0.9} color="#00e5ff" />
        <pointLight position={[0, 1, 4]} intensity={1.3} color="#ffffff" />
        <pointLight position={[0, 2, 3]} intensity={0.7} color={coating} />
        <Suspense fallback={null}>
          <SpeChip coating={coating} code={code} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>
    </LazyMount>
  );
}
