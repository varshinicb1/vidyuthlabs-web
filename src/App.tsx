import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { Overlay } from './components/Overlay';
import { CustomCursor } from './components/CustomCursor';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-black-base">
      <CustomCursor />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={isMobile ? 1 : [1, 2]}>
          <color attach="background" args={['#050505']} />
          <fog attach="fog" args={['#050505', 10, 30]} />
          <ambientLight intensity={0.2} />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
        <Overlay />
      </div>
    </div>
  );
}

export default App;
