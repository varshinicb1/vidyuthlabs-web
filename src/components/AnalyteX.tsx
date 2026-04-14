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
  const sampleParticlesRef = useRef<THREE.Group>(null);
  const rotatingRingRef = useRef<THREE.Mesh>(null);
  const cvGeometryRef = useRef<THREE.BufferGeometry>(null);
  const plotterHeadRef = useRef<THREE.Mesh>(null);
  const resultsScrollGroupRef = useRef<THREE.Group>(null);
  
  // New refs for RESULTS animation
  const biomarkerTextRef = useRef<any>(null);
  const troponinTextRef = useRef<any>(null);
  const concentrationTextRef = useRef<any>(null);
  const resultBoxRef = useRef<THREE.Mesh>(null);

  const totalScrollProgress = useGameStore(state => state.totalScrollProgress);

  // Generate CV curve
  const cvPoints = useMemo(() => {
    const points = [];
    // Forward sweep (oxidation)
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      const v = -0.7 + t * 1.4; // Voltage from -0.7 to 0.7
      const i_curr = 0.1 * v + 0.5 * Math.exp(-Math.pow(v - 0.15, 2) / 0.04);
      points.push(new THREE.Vector3(v, i_curr - 0.1, 0));
    }
    // Reverse sweep (reduction)
    for (let i = 50; i >= 0; i--) {
      const t = i / 50;
      const v = -0.7 + t * 1.4;
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

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      const isReady = totalScrollProgress < 0.15;
      // Gentle tilt and rotation only in READY state
      const targetRotY = isReady ? Math.sin(t * 1.5) * 0.08 : 0;
      const targetRotX = isReady ? Math.cos(t * 2.2) * 0.04 : 0;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    }

    if (curveRef.current) {
      const isMeasuring = totalScrollProgress > 0.3 && totalScrollProgress < 0.38;
      const speed = isMeasuring ? 8 : 0;
      const intensity = isMeasuring ? 0.05 : 0;
      curveRef.current.scale.setScalar(1.1 + Math.sin(t * speed) * intensity);
    }

    if (syncRef.current) {
      syncRef.current.rotation.z = -t * 5;
    }

    if (arrowRef.current) {
      arrowRef.current.position.y = Math.sin(t * 5) * 0.05 - 0.3;
    }

    if (laserRef.current) {
      laserRef.current.position.x = Math.sin(t * 3) * 0.8;
    }

    if (warningRef.current) {
      warningRef.current.fillOpacity = 0.5 + Math.sin(t * 8) * 0.5;
    }

    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(1 + (t % 1) * 0.5);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 1 - (t % 1);
    }

    if (hexagonRef.current) {
      hexagonRef.current.rotation.z = t * 0.5;
    }

    if (ripple1Ref.current) {
      ripple1Ref.current.scale.setScalar(1 + (t % 1.5) * 2);
      (ripple1Ref.current.material as THREE.MeshBasicMaterial).opacity = 1 - (t % 1.5) / 1.5;
    }
    if (ripple2Ref.current) {
      ripple2Ref.current.scale.setScalar(1 + ((t + 0.75) % 1.5) * 2);
      (ripple2Ref.current.material as THREE.MeshBasicMaterial).opacity = 1 - ((t + 0.75) % 1.5) / 1.5;
    }

    if (dataParticlesRef.current) {
      dataParticlesRef.current.children.forEach((child, i) => {
        child.position.y = ((t * 2 + i * 0.2) % 1) - 0.5;
        ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 1 - Math.abs(child.position.y * 2);
      });
    }

    if (rotatingRingRef.current) {
      rotatingRingRef.current.rotation.z = t * 2;
    }

    if (sampleParticlesRef.current) {
      sampleParticlesRef.current.children.forEach((child, i) => {
        child.position.y += 0.005 + (i % 3) * 0.002;
        child.position.x = Math.sin(t * 4 + i * 2) * 0.04;
        if (child.position.y > 0.2) {
          child.position.y = -0.05;
        }
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        const progress = (child.position.y + 0.05) / 0.25; // 0 to 1
        mat.opacity = Math.sin(progress * Math.PI) * 0.8;
      });
    }

    // Dynamic CV Curve Plotting
    if (screenState === 'SCANNING') {
      const scanProgress = Math.min((totalScrollProgress - 0.3) / 0.08, 1);
      const drawCount = Math.floor(scanProgress * cvPoints.length);
      
      if (cvGeometryRef.current) {
        cvGeometryRef.current.setDrawRange(0, drawCount);
      }
      
      if (plotterHeadRef.current) {
        if (drawCount > 0 && drawCount <= cvPoints.length) {
          plotterHeadRef.current.visible = true;
          plotterHeadRef.current.position.copy(cvPoints[drawCount - 1]);
        } else {
          plotterHeadRef.current.visible = false;
        }
      }
    } else if (screenState === 'SYNCING' || screenState === 'RESULTS') {
      if (cvGeometryRef.current) cvGeometryRef.current.setDrawRange(0, cvPoints.length);
      if (plotterHeadRef.current) plotterHeadRef.current.visible = false;
    } else {
      if (cvGeometryRef.current) cvGeometryRef.current.setDrawRange(0, 0);
      if (plotterHeadRef.current) plotterHeadRef.current.visible = false;
    }

    // Dynamic RESULTS animation
    const isResults = totalScrollProgress >= 0.46;
    if (isResults) {
      const resultProgress = Math.min((totalScrollProgress - 0.46) / 0.04, 1); // 0 to 1
      
      // Scroll animation
      if (resultsScrollGroupRef.current) {
        const easeOut = 1 - Math.pow(1 - resultProgress, 4);
        resultsScrollGroupRef.current.position.y = THREE.MathUtils.lerp(-1.5, 0.4, easeOut);
      }

      const pulse = (Math.sin(t * 6) + 1) / 2; // 0 to 1
      const dangerColor = new THREE.Color("#ff3366");
      const whiteColor = new THREE.Color("#ffffff");
      
      if (troponinTextRef.current) {
        troponinTextRef.current.color = dangerColor.clone().lerp(whiteColor, 1 - pulse);
        troponinTextRef.current.scale.setScalar(1 + pulse * 0.08);
      }
      
      if (concentrationTextRef.current) {
        concentrationTextRef.current.color = dangerColor.clone().lerp(whiteColor, 1 - pulse);
        concentrationTextRef.current.scale.setScalar(1 + pulse * 0.08);
      }
      
      if (resultBoxRef.current) {
        (resultBoxRef.current.material as THREE.MeshBasicMaterial).color = dangerColor;
        (resultBoxRef.current.material as THREE.MeshBasicMaterial).opacity = 0.1 + pulse * 0.2;
      }
      
      if (biomarkerTextRef.current) {
        biomarkerTextRef.current.color = new THREE.Color("#888888").lerp(dangerColor, pulse * 0.4);
      }
      
      if (troponinTextRef.current) {
        troponinTextRef.current.color = dangerColor.clone().lerp(whiteColor, 1 - pulse);
        troponinTextRef.current.scale.setScalar(1 + pulse * 0.08);
      }
    }
  });

  // Determine screen state based on scroll
  let screenState = 'READY';
  if (totalScrollProgress < 0.15) screenState = 'READY';
  else if (totalScrollProgress < 0.23) screenState = 'INSERT SENSOR';
  else if (totalScrollProgress < 0.253) screenState = 'BLOOD DETECTED';
  else if (totalScrollProgress < 0.276) screenState = 'WATER DETECTED';
  else if (totalScrollProgress < 0.3) screenState = 'SERUM DETECTED';
  else if (totalScrollProgress < 0.38) screenState = 'SCANNING';
  else if (totalScrollProgress < 0.46) screenState = 'SYNCING';
  else screenState = 'RESULTS';

  const isSampleDetected = ['BLOOD DETECTED', 'WATER DETECTED', 'SERUM DETECTED'].includes(screenState);
  const getSampleColor = () => {
    if (screenState === 'BLOOD DETECTED') return '#ff3366';
    if (screenState === 'WATER DETECTED') return '#00ccff';
    if (screenState === 'SERUM DETECTED') return '#ffcc00';
    return '#ffffff';
  };

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Main Body - Upright Handheld */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 3.5, 0.6]} />
          <meshPhysicalMaterial color="#111111" roughness={0.2} metalness={0.8} clearcoat={0.5} clearcoatRoughness={0.2} />
        </mesh>
        
        {/* Bezel */}
        <mesh position={[0, 0, 0.31]}>
          <boxGeometry args={[2.0, 3.3, 0.02]} />
          <meshPhysicalMaterial color="#0a0a0a" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* Screen Area */}
        <group position={[0, 0.4, 0.32]}>
          <mesh>
            <planeGeometry args={[1.8, 2.2]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          
          {/* Screen Content */}
          <group position={[0, 0, 0.01]}>
            <gridHelper args={[1.8, 20, 0x003322, 0x001100]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.005]} />
            
            {/* Status Bar */}
            <group position={[0, 1.0, 0]}>
              <Text position={[-0.8, 0, 0]} fontSize={0.05} color="gray" anchorX="left">14:26</Text>
              
              {/* Battery Icon */}
              <group position={[0.7, 0, 0]}>
                <Text position={[-0.15, 0, 0]} fontSize={0.05} color="#00ffcc" anchorX="right">100%</Text>
                <mesh position={[0, 0, 0]}>
                  <planeGeometry args={[0.1, 0.05]} />
                  <meshBasicMaterial color="#00ffcc" wireframe />
                </mesh>
                <mesh position={[0, 0, 0]}>
                  <planeGeometry args={[0.08, 0.03]} />
                  <meshBasicMaterial color="#00ffcc" />
                </mesh>
                <mesh position={[0.055, 0, 0]}>
                  <planeGeometry args={[0.01, 0.02]} />
                  <meshBasicMaterial color="#00ffcc" />
                </mesh>
              </group>
            </group>


            {/* Dynamic Content */}
            {screenState === 'READY' && (
              <group>
                <Text position={[0, 0.15, 0]} fontSize={0.16} color="white" letterSpacing={0.05}>SYSTEM READY</Text>
                <Text position={[0, -0.1, 0]} fontSize={0.09} color="gray">Awaiting Sensor Insertion</Text>
                <group position={[0, 0.45, 0]}>
                  <mesh ref={pulseRef}>
                    <ringGeometry args={[0.08, 0.1, 32]} />
                    <meshBasicMaterial color="#00ffcc" transparent />
                  </mesh>
                  <mesh ref={hexagonRef}>
                    <ringGeometry args={[0.12, 0.13, 6]} />
                    <meshBasicMaterial color="#00ffcc" transparent opacity={0.5} />
                  </mesh>
                  <mesh>
                    <circleGeometry args={[0.02, 32]} />
                    <meshBasicMaterial color="#00ffcc" />
                  </mesh>
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
                {/* Core */}
                <mesh>
                  <circleGeometry args={[0.05, 32]} />
                  <meshBasicMaterial color={getSampleColor()} />
                </mesh>
                
                {/* Ripples */}
                <mesh ref={ripple1Ref}>
                  <ringGeometry args={[0.05, 0.06, 32]} />
                  <meshBasicMaterial color={getSampleColor()} transparent />
                </mesh>
                <mesh ref={ripple2Ref}>
                  <ringGeometry args={[0.05, 0.06, 32]} />
                  <meshBasicMaterial color={getSampleColor()} transparent />
                </mesh>

                {/* Rotating Hexagon Ring */}
                <mesh ref={rotatingRingRef}>
                  <ringGeometry args={[0.08, 0.09, 6]} />
                  <meshBasicMaterial color={getSampleColor()} transparent opacity={0.5} />
                </mesh>

                {/* Floating Particles */}
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
                  {/* Axes */}
                  <Line points={[[-0.8, -0.5, 0], [0.8, -0.5, 0]]} color="#444" lineWidth={1} />
                  <Line points={[[-0.8, -0.5, 0], [-0.8, 0.6, 0]]} color="#444" lineWidth={1} />
                  
                  {/* Axis Labels */}
                  <Text position={[0.7, -0.6, 0]} fontSize={0.05} color="#666">0.7V</Text>
                  <Text position={[-0.7, -0.6, 0]} fontSize={0.05} color="#666">-0.7V</Text>
                  <Text position={[-0.9, 0.5, 0]} fontSize={0.05} color="#666">Max</Text>
                  <Text position={[-0.9, -0.4, 0]} fontSize={0.05} color="#666">Min</Text>

                  {/* Curve */}
                  <line>
                    <bufferGeometry ref={cvGeometryRef}>
                      <bufferAttribute
                        attach="attributes-position"
                        count={cvPositions.length / 3}
                        array={cvPositions}
                        itemSize={3}
                      />
                    </bufferGeometry>
                    <lineBasicMaterial color="#00ffcc" linewidth={2} />
                  </line>
                  
                  {/* Plotter Head */}
                  <mesh ref={plotterHeadRef} visible={false}>
                    <circleGeometry args={[0.03, 16]} />
                    <meshBasicMaterial color="#ffffff" />
                  </mesh>
                </group>
              </group>
            )}

            {screenState === 'SYNCING' && (
              <group>
                <Text position={[0, 0.15, 0]} fontSize={0.16} color="#00ffcc" letterSpacing={0.05}>SYNCING TO MOBILE</Text>
                <Text position={[0, -0.1, 0]} fontSize={0.09} color="gray">BLE Connected</Text>
                <group ref={syncRef} position={[0, 0.45, 0]}>
                  <mesh>
                    <ringGeometry args={[0.08, 0.12, 32, 1, 0, Math.PI * 1.5]} />
                    <meshBasicMaterial color="#00ffcc" />
                  </mesh>
                  <mesh position={[0, 0.1, 0]}>
                    <circleGeometry args={[0.02, 16]} />
                    <meshBasicMaterial color="#00ffcc" />
                  </mesh>
                </group>
                
                {/* Data Particles */}
                <group ref={dataParticlesRef} position={[0, 0.45, 0]}>
                  {[...Array(5)].map((_, i) => (
                    <mesh key={i} position={[0, 0, 0]}>
                      <planeGeometry args={[0.01, 0.05]} />
                      <meshBasicMaterial color="#00ffcc" transparent />
                    </mesh>
                  ))}
                </group>
              </group>
            )}

            {screenState === 'RESULTS' && (
              <group>
                <Text ref={biomarkerTextRef} position={[0, 0.75, 0]} fontSize={0.11} color="gray" letterSpacing={0.15}>BIOMARKER DETECTED</Text>
                
                {/* Scrolling List */}
                <group position={[0, 0.1, 0]}>
                  <group ref={resultsScrollGroupRef} position={[0, -1.5, 0]}>
                    <Text position={[0, 1.6, 0]} fontSize={0.12} color="#444">GLUCOSE</Text>
                    <Text position={[0, 1.2, 0]} fontSize={0.12} color="#444">LACTATE</Text>
                    <Text position={[0, 0.8, 0]} fontSize={0.12} color="#444">CORTISOL</Text>
                    <Text position={[0, 0.4, 0]} fontSize={0.12} color="#444">HEAVY METALS</Text>
                    
                    <group position={[0, 0, 0]}>
                      <Text ref={troponinTextRef} position={[0, 0, 0]} fontSize={0.22} color="#00ffcc" letterSpacing={0.05}>TROPONIN I</Text>
                      <mesh ref={resultBoxRef} position={[0, -0.5, 0]}>
                        <planeGeometry args={[1.5, 0.45]} />
                        <meshBasicMaterial color="#00ffcc" transparent opacity={0.15} />
                      </mesh>
                      <Text ref={concentrationTextRef} position={[0, -0.5, 0]} fontSize={0.22} color="white" letterSpacing={0.05}>0.04 ng/mL</Text>
                      <Text ref={warningRef} position={[0, -1.0, 0]} fontSize={0.08} color="#ff3366" letterSpacing={0.05}>ELEVATED - SEEK MEDICAL ATTENTION</Text>
                    </group>
                  </group>
                </group>
              </group>
            )}
          </group>
        </group>

        {/* Physical Buttons */}
        <group position={[0, -1.2, 0.32]}>
          <mesh position={[-0.5, 0, 0]}>
            <circleGeometry args={[0.2, 32]} />
            <meshPhysicalMaterial color="#333" metalness={0.7} roughness={0.3} clearcoat={0.5} />
          </mesh>
          <mesh position={[0.5, 0, 0]}>
            <circleGeometry args={[0.2, 32]} />
            <meshPhysicalMaterial color="#333" metalness={0.7} roughness={0.3} clearcoat={0.5} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <circleGeometry args={[0.25, 32]} />
            <meshPhysicalMaterial color="#00ffcc" metalness={0.4} roughness={0.2} clearcoat={0.8} />
          </mesh>
        </group>

        {/* Sensor Slot (Bottom) */}
        <group position={[0, -1.75, 0]}>
          <mesh>
            <boxGeometry args={[1.6, 0.1, 0.2]} />
            <meshPhysicalMaterial color="#000" roughness={0.8} metalness={0.2} />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[1.8, 0.05, 0.3]} />
            <meshPhysicalMaterial color="#222" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
