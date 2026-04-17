import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, Line, Float } from '@react-three/drei';
import { useGameStore } from '../store';

export function AnalyteX() {
  const groupRef = useRef<THREE.Group>(null);
  const curveRef = useRef<THREE.Group>(null);
  const syncRef = useRef<THREE.Group>(null);
  const arrowRef = useRef<THREE.Group>(null);
  const laserRef = useRef<THREE.Mesh>(null);
  const warningRef = useRef<any>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const hexagonRef = useRef<THREE.Mesh>(null);
  const ripple1Ref = useRef<THREE.Mesh>(null);
  const ripple2Ref = useRef<THREE.Mesh>(null);
  const dataParticlesRef = useRef<THREE.Group>(null);
  const plotterHeadRef = useRef<THREE.Mesh>(null);
  const resultsScrollGroupRef = useRef<THREE.Group>(null);
  const dataStreamRef = useRef<THREE.Group>(null);
  const signalWaveRef = useRef<THREE.Line>(null);
  const scannerRef = useRef<THREE.Mesh>(null);
  const rotatingRingRef = useRef<THREE.Mesh>(null);
  const sampleParticlesRef = useRef<THREE.Group>(null);
  const cvGeometryRef = useRef<THREE.BufferGeometry>(null);
  
  // HUD labels
  const hudRef = useRef<THREE.Group>(null);
  
  // RESULTS animation
  const biomarkerTextRef = useRef<any>(null);
  const troponinTextRef = useRef<any>(null);
  const concentrationTextRef = useRef<any>(null);
  const resultBoxRef = useRef<THREE.Mesh>(null);

  const totalScrollProgress = useGameStore(state => state.totalScrollProgress);

  // Constants
  const dangerColor = useMemo(() => new THREE.Color("#ff3366"), []);
  const whiteColor = useMemo(() => new THREE.Color("#ffffff"), []);

  // Determine screen state
  const screenState = useMemo(() => {
    if (totalScrollProgress < 0.15) return 'READY';
    if (totalScrollProgress < 0.23) return 'INSERT SENSOR';
    if (totalScrollProgress < 0.253) return 'BLOOD DETECTED';
    if (totalScrollProgress < 0.276) return 'WATER DETECTED';
    if (totalScrollProgress < 0.3) return 'SERUM DETECTED';
    if (totalScrollProgress < 0.38) return 'SCANNING';
    if (totalScrollProgress < 0.46) return 'SYNCING';
    return 'RESULTS';
  }, [totalScrollProgress]);

  const isSampleDetected = ['BLOOD DETECTED', 'WATER DETECTED', 'SERUM DETECTED'].includes(screenState);
  
  const getSampleColor = () => {
    if (screenState === 'BLOOD DETECTED') return '#ff3366';
    if (screenState === 'WATER DETECTED') return '#00ccff';
    if (screenState === 'SERUM DETECTED') return '#ffcc00';
    return '#ffffff';
  };

  // Generate CV curve
  const cvPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 50; i++) {
        const v = -0.7 + (i / 50) * 1.4;
        const i_curr = 0.1 * v + 0.5 * Math.exp(-Math.pow(v - 0.15, 2) / 0.04);
        points.push(new THREE.Vector3(v, i_curr - 0.1, 0));
    }
    for (let i = 50; i >= 0; i--) {
        const v = -0.7 + (i / 50) * 1.4;
        const i_curr = 0.1 * v - 0.4 * Math.exp(-Math.pow(v + 0.1, 2) / 0.04);
        points.push(new THREE.Vector3(v, i_curr - 0.1, 0));
    }
    points.push(points[0]);
    return points;
  }, []);

  const cvPositions = useMemo(() => {
    const pos = new Float32Array(cvPoints.length * 3);
    cvPoints.forEach((p, i) => {
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
    });
    return pos;
  }, [cvPoints]);

  const wavePointsCount = 101;
  const signalWaveObject = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(wavePointsCount * 3), 3));
    return new THREE.Line(geo);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      const isReady = screenState === 'READY';
      const targetRotY = isReady ? Math.sin(t * 1.5) * 0.08 : 0;
      const targetRotX = isReady ? Math.cos(t * 2.2) * 0.04 : 0;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    }

    if (curveRef.current) {
      const isMeasuring = screenState === 'SCANNING';
      const speed = isMeasuring ? 8 : 0;
      const intensity = isMeasuring ? 0.05 : 0;
      curveRef.current.scale.setScalar(1.1 + Math.sin(t * speed) * intensity);
    }

    if (syncRef.current) syncRef.current.rotation.z = -t * 5;
    if (arrowRef.current) arrowRef.current.position.y = Math.sin(t * 5) * 0.05 - 0.3;
    if (laserRef.current) laserRef.current.position.x = Math.sin(t * 3) * 0.8;
    if (warningRef.current) warningRef.current.fillOpacity = 0.5 + Math.sin(t * 8) * 0.5;

    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(1 + (t % 1) * 0.5);
      const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
      if (mat) mat.opacity = 1 - (t % 1);
    }

    if (hexagonRef.current) hexagonRef.current.rotation.z = t * 0.5;

    if (ripple1Ref.current) {
      ripple1Ref.current.scale.setScalar(1 + (t % 1.5) * 2);
      const mat = ripple1Ref.current.material as THREE.MeshBasicMaterial;
      if (mat) mat.opacity = 1 - (t % 1.5) / 1.5;
    }
    if (ripple2Ref.current) {
      ripple2Ref.current.scale.setScalar(1 + ((t + 0.75) % 1.5) * 2);
      const mat = ripple2Ref.current.material as THREE.MeshBasicMaterial;
      if (mat) mat.opacity = 1 - ((t + 0.75) % 1.5) / 1.5;
    }

    if (dataParticlesRef.current) {
      dataParticlesRef.current.children.forEach((child, i) => {
        child.position.y = ((t * 2 + i * 0.2) % 1) - 0.5;
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = 1 - Math.abs(child.position.y * 2);
      });
    }

    if (rotatingRingRef.current) rotatingRingRef.current.rotation.z = t * 2;

    if (sampleParticlesRef.current) {
      sampleParticlesRef.current.children.forEach((child, i) => {
        child.position.y += 0.005 + (i % 3) * 0.002;
        child.position.x = Math.sin(t * 4 + i * 2) * 0.04;
        if (child.position.y > 0.2) child.position.y = -0.05;
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) {
          const progress = (child.position.y + 0.05) / 0.25;
          mat.opacity = Math.sin(progress * Math.PI) * 0.8;
        }
      });
    }

    if (screenState === 'SCANNING') {
      const scanProgress = Math.min((totalScrollProgress - 0.3) / 0.08, 1);
      const drawCount = Math.floor(scanProgress * cvPoints.length);
      if (cvGeometryRef.current) cvGeometryRef.current.setDrawRange(0, drawCount);
      if (plotterHeadRef.current) {
        if (drawCount > 0 && drawCount <= cvPoints.length) {
          plotterHeadRef.current.visible = true;
          plotterHeadRef.current.position.copy(cvPoints[drawCount - 1]);
        } else plotterHeadRef.current.visible = false;
      }
    } else if (screenState === 'SYNCING' || screenState === 'RESULTS') {
      if (cvGeometryRef.current) cvGeometryRef.current.setDrawRange(0, cvPoints.length);
      if (plotterHeadRef.current) plotterHeadRef.current.visible = false;
    } else {
      if (cvGeometryRef.current) cvGeometryRef.current.setDrawRange(0, 0);
      if (plotterHeadRef.current) plotterHeadRef.current.visible = false;
    }

    const isResults = screenState === 'RESULTS';
    if (isResults) {
      const resultProgress = Math.min((totalScrollProgress - 0.46) / 0.04, 1);
      if (resultsScrollGroupRef.current) {
        const easeOut = 1 - Math.pow(1 - resultProgress, 4);
        resultsScrollGroupRef.current.position.y = THREE.MathUtils.lerp(-1.5, 0.4, easeOut);
      }
      const pulse = (Math.sin(t * 6) + 1) / 2;
      if (troponinTextRef.current) {
        troponinTextRef.current.color = dangerColor.clone().lerp(whiteColor, 1 - pulse);
        troponinTextRef.current.scale.setScalar(1 + pulse * 0.08);
      }
      if (concentrationTextRef.current) {
        concentrationTextRef.current.color = dangerColor.clone().lerp(whiteColor, 1 - pulse);
        concentrationTextRef.current.scale.setScalar(1 + pulse * 0.08);
      }
      if (resultBoxRef.current) {
        const mat = resultBoxRef.current.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.color = dangerColor;
          mat.opacity = 0.1 + pulse * 0.2;
        }
      }
      if (biomarkerTextRef.current) biomarkerTextRef.current.color = new THREE.Color("#888888").lerp(dangerColor, pulse * 0.4);
    }

    const isScanning = screenState === 'SCANNING';
    if (scannerRef.current) {
      scannerRef.current.visible = isScanning;
      if (isScanning) {
        scannerRef.current.position.y = Math.sin(t * 3) * 1.5 + 0.5;
        const mat = scannerRef.current.material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = 0.3 + Math.sin(t * 10) * 0.2;
      }
    }

    if (signalWaveRef.current) {
      signalWaveRef.current.visible = isScanning;
      if (isScanning) {
        const positions = signalWaveRef.current.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const y = Math.sin(x * 4 + t * 10) * 0.5;
          positions.setY(i, y);
        }
        positions.needsUpdate = true;
      }
    }

    const isSyncing = screenState === 'SYNCING';
    if (dataStreamRef.current) {
      dataStreamRef.current.visible = isSyncing;
      if (isSyncing) {
        dataStreamRef.current.children.forEach((child, i) => {
          const progress = ((t * 0.5 + i * 0.1) % 1);
          child.position.set(THREE.MathUtils.lerp(0, 10, progress) + Math.sin(t * 5 + i) * 0.2, THREE.MathUtils.lerp(0, 5, progress) + Math.cos(t * 5 + i) * 0.2, THREE.MathUtils.lerp(0, -5, progress));
          (child as THREE.Mesh).scale.setScalar(1 - progress);
          const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (mat) mat.opacity = (1 - progress) * 0.8;
        });
      }
    }

    if (hudRef.current) {
      const showHUD = totalScrollProgress < 0.15;
      hudRef.current.visible = showHUD;
      if (showHUD) hudRef.current.rotation.y = Math.sin(t) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 3.5, 0.6]} />
          <meshPhysicalMaterial color="#111111" roughness={0.2} metalness={0.8} clearcoat={0.5} clearcoatRoughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.31]}>
          <boxGeometry args={[2.0, 3.3, 0.02]} />
          <meshPhysicalMaterial color="#0a0a0a" roughness={0.6} metalness={0.4} />
        </mesh>
        <group position={[0, 0.4, 0.32]}>
          <mesh><planeGeometry args={[1.8, 2.2]} /><meshStandardMaterial color="#000000" /></mesh>
          <group position={[0, 0, 0.01]}>
            <gridHelper args={[1.8, 20, 0x003322, 0x001100]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.005]} />
            <group position={[0, 1.0, 0]}>
              <Text position={[-0.8, 0, 0]} fontSize={0.05} color="gray" anchorX="left">14:26</Text>
              <group position={[0.7, 0, 0]}>
                <Text position={[-0.15, 0, 0]} fontSize={0.05} color="#00ffcc" anchorX="right">100%</Text>
                <mesh><planeGeometry args={[0.1, 0.05]} /><meshBasicMaterial color="#00ffcc" wireframe /></mesh>
                <mesh><planeGeometry args={[0.08, 0.03]} /><meshBasicMaterial color="#00ffcc" /></mesh>
                <mesh position={[0.055, 0, 0]}><planeGeometry args={[0.01, 0.02]} /><meshBasicMaterial color="#00ffcc" /></mesh>
              </group>
            </group>
            {screenState === 'READY' && (
              <group>
                <Text position={[0, 0.15, 0]} fontSize={0.16} color="white" letterSpacing={0.05}>AnalyteX</Text>
                <Text position={[0, -0.1, 0]} fontSize={0.09} color="gray">Awaiting Sensor Insertion</Text>
                <group position={[0, 0.45, 0]}>
                  <mesh ref={pulseRef}><ringGeometry args={[0.08, 0.1, 32]} /><meshBasicMaterial color="#00ffcc" transparent /></mesh>
                  <mesh ref={hexagonRef}><ringGeometry args={[0.12, 0.13, 6]} /><meshBasicMaterial color="#00ffcc" transparent opacity={0.5} /></mesh>
                  <mesh><circleGeometry args={[0.02, 32]} /><meshBasicMaterial color="#00ffcc" /></mesh>
                </group>
              </group>
            )}
            {screenState === 'INSERT SENSOR' && (
              <group>
                <Text position={[0, 0.15, 0]} fontSize={0.14} color="yellow" letterSpacing={0.05}>WAITING FOR VIDYUTX...</Text>
                <Text position={[0, -0.1, 0]} fontSize={0.09} color="gray">Insert into bottom slot</Text>
                <group ref={arrowRef} position={[0, -0.3, 0]}>
                  <Text position={[0, 0.05, 0]} fontSize={0.15} color="yellow" rotation={[0, 0, -Math.PI/2]} fillOpacity={0.5}>➔</Text>
                  <Text position={[0, 0, 0]} fontSize={0.15} color="yellow" rotation={[0, 0, -Math.PI/2]}>➔</Text>
                </group>
              </group>
            )}
            {screenState === 'BLOOD DETECTED' && (
              <group>
                <Text position={[0, 0.15, 0]} fontSize={0.16} color="#ff3366" letterSpacing={0.05}>BLOOD DETECTED</Text>
                <Text position={[0, -0.1, 0]} fontSize={0.09} color="gray">Biomarker Analysis Ready</Text>
              </group>
            )}
            {screenState === 'WATER DETECTED' && (
              <group>
                <Text position={[0, 0.15, 0]} fontSize={0.16} color="#00ccff" letterSpacing={0.05}>WATER DETECTED</Text>
                <Text position={[0, -0.1, 0]} fontSize={0.09} color="gray">Heavy Metal Scan Ready</Text>
              </group>
            )}
            {screenState === 'SERUM DETECTED' && (
              <group>
                <Text position={[0, 0.15, 0]} fontSize={0.16} color="#ffcc00" letterSpacing={0.05}>SERUM DETECTED</Text>
                <Text position={[0, -0.1, 0]} fontSize={0.09} color="gray">Initiating Scan Sequence</Text>
              </group>
            )}
            {isSampleDetected && (
              <group position={[0, 0.45, 0]}>
                <mesh><circleGeometry args={[0.05, 32]} /><meshBasicMaterial color={getSampleColor()} /></mesh>
                <mesh ref={ripple1Ref}><ringGeometry args={[0.05, 0.06, 32]} /><meshBasicMaterial color={getSampleColor()} transparent /></mesh>
                <mesh ref={ripple2Ref}><ringGeometry args={[0.05, 0.06, 32]} /><meshBasicMaterial color={getSampleColor()} transparent /></mesh>
                <mesh ref={rotatingRingRef}><ringGeometry args={[0.08, 0.09, 6]} /><meshBasicMaterial color={getSampleColor()} transparent opacity={0.5} /></mesh>
                <group ref={sampleParticlesRef}>
                  {[...Array(8)].map((_, i) => (
                    <mesh key={i} position={[0, (i * 0.03) - 0.05, 0]}>
                      <circleGeometry args={[0.008, 8]} />
                      <meshBasicMaterial color={getSampleColor()} transparent opacity={0} />
                    </mesh>
                  ))}
                </group>
              </group>
            )}
            {screenState === 'SCANNING' && (
              <group>
                <Text position={[0, 0.7, 0]} fontSize={0.14} color="#00ffcc" letterSpacing={0.05}>ANALYZING</Text>
                <Text position={[0, 0.5, 0]} fontSize={0.08} color="gray">Voltage (V) vs Current (µA)</Text>
                <group ref={curveRef} position={[0, -0.25, 0]}>
                  <Line points={[[-0.8, -0.5, 0], [0.8, -0.5, 0]]} color="#444" lineWidth={1} />
                  <Line points={[[-0.8, -0.5, 0], [-0.8, 0.6, 0]]} color="#444" lineWidth={1} />
                  <Text position={[0.7, -0.6, 0]} fontSize={0.05} color="#666">0.7V</Text>
                  <Text position={[-0.7, -0.6, 0]} fontSize={0.05} color="#666">-0.7V</Text>
                  <Text position={[-0.9, 0.5, 0]} fontSize={0.05} color="#666">Max</Text>
                  <Text position={[-0.9, -0.4, 0]} fontSize={0.05} color="#666">Min</Text>
                  <line>
                    <bufferGeometry ref={cvGeometryRef}>
                      <bufferAttribute attach="attributes-position" count={cvPositions.length / 3} array={cvPositions} itemSize={3} />
                    </bufferGeometry>
                    <lineBasicMaterial color="#00ffcc" />
                  </line>
                  <mesh ref={plotterHeadRef} visible={false}><circleGeometry args={[0.03, 16]} /><meshBasicMaterial color="#ffffff" /></mesh>
                </group>
              </group>
            )}
            {screenState === 'SYNCING' && (
              <group>
                <Text position={[0, 0.15, 0]} fontSize={0.16} color="#00ffcc" letterSpacing={0.05}>SYNCING TO MOBILE</Text>
                <Text position={[0, -0.1, 0]} fontSize={0.09} color="gray">BLE Connected</Text>
                <group ref={syncRef} position={[0, 0.45, 0]}>
                  <mesh><ringGeometry args={[0.08, 0.12, 32, 1, 0, Math.PI * 1.5]} /><meshBasicMaterial color="#00ffcc" /></mesh>
                  <mesh position={[0, 0.1, 0]}><circleGeometry args={[0.02, 16]} /><meshBasicMaterial color="#00ffcc" /></mesh>
                </group>
                <group ref={dataParticlesRef} position={[0, 0.45, 0]}>
                  {[...Array(5)].map((_, i) => (
                    <mesh key={i}><planeGeometry args={[0.01, 0.05]} /><meshBasicMaterial color="#00ffcc" transparent /></mesh>
                  ))}
                </group>
              </group>
            )}
            {screenState === 'RESULTS' && (
              <group>
                <Text ref={biomarkerTextRef} position={[0, 0.75, 0]} fontSize={0.11} color="gray" letterSpacing={0.15}>BIOMARKER DETECTED</Text>
                <group position={[0, 0.1, 0]}>
                  <group ref={resultsScrollGroupRef} position={[0, -1.5, 0]}>
                    <Text position={[0, 1.6, 0]} fontSize={0.12} color="#444">GLUCOSE</Text>
                    <Text position={[0, 1.2, 0]} fontSize={0.12} color="#444">LACTATE</Text>
                    <Text position={[0, 0.8, 0]} fontSize={0.12} color="#444">CORTISOL</Text>
                    <Text position={[0, 0.4, 0]} fontSize={0.12} color="#444">HEAVY METALS</Text>
                    <group position={[0, 0, 0]}>
                      <Text ref={troponinTextRef} position={[0, 0, 0]} fontSize={0.22} color="#00ffcc" letterSpacing={0.05}>TROPONIN I</Text>
                      <mesh ref={resultBoxRef} position={[0, -0.5, 0]}><planeGeometry args={[1.5, 0.45]} /><meshBasicMaterial color="#00ffcc" transparent opacity={0.15} /></mesh>
                      <Text ref={concentrationTextRef} position={[0, -0.5, 0]} fontSize={0.22} color="white" letterSpacing={0.05}>0.04 ng/mL</Text>
                      <Text ref={warningRef} position={[0, -1.0, 0]} fontSize={0.08} color="#ff3366" letterSpacing={0.05}>ELEVATED - SEEK MEDICAL ATTENTION</Text>
                    </group>
                  </group>
                </group>
              </group>
            )}
          </group>
        </group>
        <group position={[0, -1.2, 0.32]}>
          <mesh position={[-0.5, 0, 0]}><circleGeometry args={[0.2, 32]} /><meshPhysicalMaterial color="#333" metalness={0.7} roughness={0.3} clearcoat={0.5} /></mesh>
          <mesh position={[0.5, 0, 0]}><circleGeometry args={[0.2, 32]} /><meshPhysicalMaterial color="#333" metalness={0.7} roughness={0.3} clearcoat={0.5} /></mesh>
          <mesh position={[0, 0, 0]}><circleGeometry args={[0.25, 32]} /><meshPhysicalMaterial color="#00ffcc" metalness={0.4} roughness={0.2} clearcoat={0.8} /></mesh>
        </group>
        <group position={[0, -1.75, 0]}>
          <mesh><boxGeometry args={[1.6, 0.1, 0.2]} /><meshPhysicalMaterial color="#000" roughness={0.8} metalness={0.2} /></mesh>
          <mesh position={[0, -0.05, 0]}><boxGeometry args={[1.8, 0.05, 0.3]} /><meshPhysicalMaterial color="#222" metalness={0.8} roughness={0.3} /></mesh>
        </group>
        <group ref={hudRef}>
          <group position={[1.5, 1, 0.5]}>
            <Line points={[[0, 0, 0], [-0.5, -0.5, -0.2]]} color="#00ffcc" lineWidth={1} transparent opacity={0.5} />
            <Text position={[0.1, 0, 0]} fontSize={0.08} color="#00ffcc" anchorX="left">ALUMINUM 6061 CHASSIS</Text>
          </group>
          <group position={[-1.5, 0, 0.5]}>
            <Line points={[[0, 0, 0], [0.5, 0.2, -0.2]]} color="#00ffcc" lineWidth={1} transparent opacity={0.5} />
            <Text position={[-0.1, 0, 0]} fontSize={0.08} color="#00ffcc" anchorX="right">1.8" HIGH-RES LCD</Text>
          </group>
          <group position={[1.5, -1.2, 0.5]}>
            <Line points={[[0, 0, 0], [-0.5, 0.2, -0.2]]} color="#00ffcc" lineWidth={1} transparent opacity={0.5} />
            <Text position={[0.1, 0, 0]} fontSize={0.08} color="#00ffcc" anchorX="left">TACTILE CONTROLS</Text>
          </group>
        </group>
        <mesh ref={scannerRef} position={[0, 0.5, 0.35]} visible={false}>
          <planeGeometry args={[2.5, 0.05]} />
          <meshBasicMaterial color="#00ffcc" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        <primitive object={signalWaveObject} ref={signalWaveRef} position={[0, 2.5, 0]} visible={false}>
           <lineBasicMaterial color="#00ffcc" transparent opacity={0.4} />
        </primitive>
        <group ref={dataStreamRef} visible={false}>
          {[...Array(20)].map((_, i) => (
            <mesh key={i}><sphereGeometry args={[0.05, 8, 8]} /><meshBasicMaterial color="#00ffcc" transparent /></mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}
