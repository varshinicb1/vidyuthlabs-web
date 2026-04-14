import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { AnalyteX } from './AnalyteX';
import { VidyutX } from './VidyutX';
import { useGameStore } from '../store';

function MobilePhone({ progress }: { progress: number }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!ref.current) return;
    // Visible between 0.38 and 0.53
    if (progress > 0.35 && progress < 0.5) {
      ref.current.visible = true;
      // Slide in from right
      const targetX = progress < 0.38 ? THREE.MathUtils.lerp(6, 2.8, (progress - 0.35) / 0.03) : 
                      progress > 0.46 ? THREE.MathUtils.lerp(2.8, 6, (progress - 0.46) / 0.04) : 2.8;
      ref.current.position.lerp(new THREE.Vector3(targetX, 0, 2), 0.1);
      ref.current.rotation.y = -Math.PI / 6;
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <group ref={ref} visible={false}>
      {/* Phone Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 4.4, 0.2]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[2.0, 4.2]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      {/* App UI */}
      <group position={[0, 0, 0.12]}>
        {/* Header */}
        <mesh position={[0, 1.8, 0]}>
          <planeGeometry args={[2.0, 0.6]} />
          <meshBasicMaterial color="#111" />
        </mesh>
        <Text position={[-0.8, 1.8, 0.01]} fontSize={0.12} color="#00ffcc" anchorX="left" font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf">VidyuthLabs</Text>
        <Text position={[0.8, 1.8, 0.01]} fontSize={0.08} color="gray" anchorX="right">SYNCED</Text>
        
        {/* Dashboard Cards */}
        <mesh position={[0, 0.8, 0]}>
          <planeGeometry args={[1.8, 1.2]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <Text position={[-0.8, 1.2, 0.01]} fontSize={0.10} color="gray" anchorX="left">LATEST SCAN</Text>
        <Text position={[-0.8, 0.95, 0.01]} fontSize={0.16} color="#fff" anchorX="left">Troponin I</Text>
        <Text position={[-0.8, 0.70, 0.01]} fontSize={0.20} color="#ff3366" anchorX="left">0.04 ng/mL</Text>
        
        {/* Graph Mockup */}
        <Line points={[[-0.8, 0.4, 0.01], [-0.4, 0.4, 0.01], [0, 0.65, 0.01], [0.4, 0.35, 0.01], [0.8, 0.55, 0.01]]} color="#00ffcc" lineWidth={2} />
        
        <mesh position={[0, -0.4, 0]}>
          <planeGeometry args={[1.8, 0.8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <Text position={[-0.8, -0.2, 0.01]} fontSize={0.1} color="gray" anchorX="left">PATIENT STATUS</Text>
        <Text position={[-0.8, -0.5, 0.01]} fontSize={0.12} color="#ff3366" anchorX="left">CRITICAL - ELEVATED LEVELS</Text>

        <mesh position={[0, -1.4, 0]}>
          <planeGeometry args={[1.8, 0.8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <Text position={[-0.8, -1.2, 0.01]} fontSize={0.1} color="gray" anchorX="left">RECOMMENDATION</Text>
        <Text position={[-0.8, -1.5, 0.01]} fontSize={0.12} color="#fff" anchorX="left">Immediate Cardiology Consult</Text>
      </group>
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
  // Visible between 0.50 and 0.65
  const isVisible = progress > 0.50 && progress < 0.65;
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

function MarketGapVisual({ progress }: { progress: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });
  const isVisible = progress > 0.58 && progress < 0.72;
  return (
    <group position={[20, 0, 0]} visible={isVisible} ref={ref}>
      {/* Big heavy traditional machine */}
      <group position={[-2, -1, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3, 4, 3]} />
          <meshStandardMaterial color="#333" roughness={0.9} metalness={0.1} />
        </mesh>
        <Text position={[0, 2.5, 0]} fontSize={0.3} color="#ff3366">TRADITIONAL</Text>
        <Text position={[0, 0, 1.51]} fontSize={0.2} color="gray">5 KG / ₹8L+</Text>
      </group>
      
      {/* Sleek VidyutX */}
      <group position={[2, -1, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1, 1.5, 0.2]} />
          <meshPhysicalMaterial color="#111" roughness={0.2} metalness={0.8} />
        </mesh>
        <Text position={[0, 2.5, 0]} fontSize={0.3} color="#00ffcc">ANALYTEX</Text>
        <Text position={[0, 0, 0.11]} fontSize={0.15} color="#00ffcc">150g / ₹25k</Text>
      </group>
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
  const isVisible = progress > 0.65 && progress < 0.80;
  return (
    <group position={[30, 0, 0]} visible={isVisible}>
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
    </group>
  );
}

function SwarmVisualization({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);

  const NODE_COUNT = 75;
  const MAX_DISTANCE = 1.8;
  const SPHERE_RADIUS = 3;

  // Initialize node data using Fibonacci sphere distribution
  const nodesData = useMemo(() => {
    const data = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      data.push({
        basePosition: new THREE.Vector3(x * SPHERE_RADIUS, y * SPHERE_RADIUS, z * SPHERE_RADIUS),
        position: new THREE.Vector3(x * SPHERE_RADIUS, y * SPHERE_RADIUS, z * SPHERE_RADIUS),
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.2 + Math.random() * 0.8,
        activity: 0, // For signal propagation
        connections: [] as number[],
      });
    }
    
    // Pre-calculate connections for signal routing
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (data[i].basePosition.distanceTo(data[j].basePosition) < MAX_DISTANCE) {
          data[i].connections.push(j);
          data[j].connections.push(i);
        }
      }
    }
    
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  
  // Arrays for lines
  const maxLines = NODE_COUNT * 10;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), []);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), []);

  useFrame((state) => {
    if (!groupRef.current || !groupRef.current.visible) return;

    // Slow rotation
    groupRef.current.rotation.y += 0.001;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;

    let lineIndex = 0;
    let colorIndex = 0;

    // Randomly trigger signals
    if (Math.random() < 0.05) {
      const randomNode = Math.floor(Math.random() * NODE_COUNT);
      nodesData[randomNode].activity = 1.0;
    }

    // Update nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      const data = nodesData[i];
      
      // Signal decay and propagation
      if (data.activity > 0) {
        data.activity -= 0.02; // Decay
        
        // Propagate to neighbors
        if (data.activity > 0.5 && Math.random() < 0.1) {
          const neighborIdx = data.connections[Math.floor(Math.random() * data.connections.length)];
          if (neighborIdx !== undefined && nodesData[neighborIdx].activity < 0.2) {
            nodesData[neighborIdx].activity = 1.0;
          }
        }
      }
      if (data.activity < 0) data.activity = 0;

      // Structured breathing + activity pulse
      const pulse = Math.sin(state.clock.elapsedTime * data.pulseSpeed + data.phase) * 0.05;
      const activityScale = 1 + data.activity * 0.5;
      
      data.position.copy(data.basePosition).multiplyScalar(1 + pulse);

      dummy.position.copy(data.position);
      dummy.lookAt(0, 0, 0);
      dummy.scale.setScalar(activityScale);
      dummy.updateMatrix();
      
      if (nodesRef.current) {
        nodesRef.current.setMatrixAt(i, dummy.matrix);
        
        // Color based on activity: Cyan (base) to White/Yellow (active)
        color.setHSL(0.5 - data.activity * 0.1, 1.0, 0.5 + data.activity * 0.5);
        nodesRef.current.setColorAt(i, color);
      }

      // Update connections
      for (let j = 0; j < data.connections.length; j++) {
        const neighborIdx = data.connections[j];
        if (neighborIdx > i) { // Only draw once per pair
          const neighbor = nodesData[neighborIdx];
          const dist = data.position.distanceTo(neighbor.position);
          
          if (dist < MAX_DISTANCE) {
            linePositions[lineIndex++] = data.position.x;
            linePositions[lineIndex++] = data.position.y;
            linePositions[lineIndex++] = data.position.z;
            linePositions[lineIndex++] = neighbor.position.x;
            linePositions[lineIndex++] = neighbor.position.y;
            linePositions[lineIndex++] = neighbor.position.z;
            
            // Line color based on combined activity
            const combinedActivity = Math.max(data.activity, neighbor.activity);
            const r = 0.0 + combinedActivity;
            const g = 1.0;
            const b = 0.8 + combinedActivity * 0.2;
            
            // Alpha/intensity based on distance and activity
            const intensity = (1 - dist / MAX_DISTANCE) * (0.2 + combinedActivity * 0.8);
            
            lineColors[colorIndex++] = r * intensity;
            lineColors[colorIndex++] = g * intensity;
            lineColors[colorIndex++] = b * intensity;
            lineColors[colorIndex++] = r * intensity;
            lineColors[colorIndex++] = g * intensity;
            lineColors[colorIndex++] = b * intensity;
          }
        }
      }
    }

    if (nodesRef.current) {
      nodesRef.current.instanceMatrix.needsUpdate = true;
      if (nodesRef.current.instanceColor) {
        nodesRef.current.instanceColor.needsUpdate = true;
      }
    }

    if (linesRef.current) {
      linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIndex), 3));
      linesRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(lineColors.slice(0, colorIndex), 3));
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  // Visibility logic
  useFrame(() => {
    if (!groupRef.current) return;
    if (progress > 0.8 && progress < 0.95) {
      groupRef.current.visible = true;
    } else {
      groupRef.current.visible = false;
    }
  });

  return (
    <group ref={groupRef} visible={false} position={[0, 2, 0]}>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, NODE_COUNT]}>
        <boxGeometry args={[0.15, 0.02, 0.15]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          emissive="#ffffff" 
          emissiveIntensity={1.5} 
          roughness={0.2} 
          metalness={0.8}
          toneMapped={false}
        />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial 
          vertexColors={true} 
          transparent 
          opacity={0.8} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function LiquidDrop({ progress }: { progress: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  
  useFrame(() => {
    if (!ref.current || !materialRef.current) return;
    const dropStart = 0.23;
    const dropEnd = 0.30;
    
    if (progress > dropStart && progress < dropEnd) {
      ref.current.visible = true;
      
      let t = 0;
      let color = "#880000"; // Blood
      
      if (progress < 0.253) {
        t = (progress - 0.23) / (0.253 - 0.23);
        color = "#880000";
      } else if (progress < 0.276) {
        t = (progress - 0.253) / (0.276 - 0.253);
        color = "#00ccff"; // Water
      } else {
        t = (progress - 0.276) / (0.30 - 0.276);
        color = "#ffcc00"; // Serum
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
    camera.updateProjectionMatrix();

    const mobileYOffset = isMobile ? 1.5 : 0; // Shift camera lookAt down to move model up
    const mobileZOffset = isMobile ? 2 : 0;   // Pull camera back slightly on mobile

    // Camera transitions based on scroll
    let targetPos = new THREE.Vector3(0, 0, 10 + mobileZOffset);
    let targetLookAt = new THREE.Vector3(0, -mobileYOffset, 0);

    if (t < 0.07) { // Hero
      targetPos.set(0, 0, 8 + mobileZOffset);
      targetLookAt.set(0, -mobileYOffset, 0);
    } else if (t < 0.15) { // Sensor
      targetPos.set(0, 0, 6 + mobileZOffset);
      targetLookAt.set(0, -mobileYOffset, 0);
    } else if (t < 0.23) { // Insertion
      // Full screen view looking down at the device
      targetPos.set(0, 5 + (isMobile ? 2 : 0), -0.5);
      targetLookAt.set(0, 0, -0.5);
    } else if (t < 0.30) { // Sample
      // Zoom in on the electrode for the drop
      targetPos.set(0, 3 + (isMobile ? 1 : 0), 1.5);
      targetLookAt.set(0, 0, 1.5);
    } else if (t < 0.38) { // Analysis
      targetPos.set(0, 1, 4 + mobileZOffset);
      targetLookAt.set(0, 0.5 - mobileYOffset, 0);
    } else if (t < 0.46) { // Mobile
      targetPos.set(0, 0, 8 + mobileZOffset);
      targetLookAt.set(0, -mobileYOffset, 0);
    } else if (t < 0.53) { // Results
      targetPos.set(0, 1, 4 + mobileZOffset);
      targetLookAt.set(0, 0.5 - mobileYOffset, 0);
    } else if (t < 0.61) { // Applications
      targetPos.set(10, 0, 8 + mobileZOffset);
      targetLookAt.set(10, -mobileYOffset, 0);
    } else if (t < 0.69) { // Competitors (Market Gap)
      targetPos.set(20, 0, 8 + mobileZOffset);
      targetLookAt.set(20, -mobileYOffset, 0);
    } else if (t < 0.76) { // Why Us
      targetPos.set(30, 0, 8 + mobileZOffset);
      targetLookAt.set(30, -mobileYOffset, 0);
    } else if (t < 0.84) { // Target Market
      targetPos.set(30, 0, 8 + mobileZOffset); // stay on Why Us or move slightly
      targetLookAt.set(30, -mobileYOffset, 0);
    } else if (t < 0.92) { // Future
      targetPos.set(0, 2, 8 + mobileZOffset);
      targetLookAt.set(0, -mobileYOffset, 0);
    } else { // Vision
      targetPos.set(0, 0, 10 + mobileZOffset);
      targetLookAt.set(0, -mobileYOffset, 0);
    }

    state.camera.position.lerp(targetPos, 0.04);
    
    const currentLookAt = new THREE.Vector3();
    state.camera.getWorldDirection(currentLookAt);
    currentLookAt.add(state.camera.position);
    currentLookAt.lerp(targetLookAt, 0.04);
    state.camera.lookAt(currentLookAt);

    // Device & Sensor Transforms
    if (analyteRef.current && vidyutRef.current) {
      let aPos = new THREE.Vector3();
      let aRot = new THREE.Euler();
      let vPos = new THREE.Vector3();
      let vRot = new THREE.Euler();

      if (t < 0.07) {
        // Hero
        aPos.set(0, 0, 0);
        aRot.set(0, 0, 0);
        vPos.set(10, 0, 0); // Hidden
      } else if (t < 0.15) {
        // Sensor
        aPos.set(-2, 0, 0);
        aRot.set(0, 0, 0);
        vPos.set(2, 0, 2);
        vRot.set(Math.PI / 4, t * 20, 0); // Spinning
      } else if (t < 0.23) {
        // Insertion
        aPos.set(0, 0, -2);
        aRot.set(-Math.PI / 2, 0, 0);
        
        if (t < 0.18) {
          // Aligning
          const alignT = (t - 0.15) / 0.03;
          vPos.set(0, 0, THREE.MathUtils.lerp(5, 2.5, alignT));
          vRot.set(0, Math.PI, 0);
        } else if (t < 0.20) {
          // Pause to show contacts
          vPos.set(0, 0, 2.5);
          vRot.set(0, Math.PI, 0);
        } else {
          // Inserting precisely into the slot with a snap
          const insertT = (t - 0.20) / 0.03;
          const snapT = 1 - Math.pow(1 - insertT, 3); // cubic ease out
          vPos.set(0, 0, THREE.MathUtils.lerp(2.5, 1.55, snapT));
          vRot.set(0, Math.PI, 0);
          
          // Add a physical "bump" to the AnalyteX device when inserted
          if (insertT > 0.8) {
             const bump = Math.sin((insertT - 0.8) * 5 * Math.PI) * 0.05;
             aPos.z -= bump;
          }
        }
      } else if (t < 0.30) {
        // Sample
        aPos.set(0, 0, -2);
        aRot.set(-Math.PI / 2, 0, 0);
        vPos.set(0, 0, 1.55);
        vRot.set(0, Math.PI, 0);
      } else if (t < 0.38) {
        // Analysis
        aPos.set(0, 0, 0);
        aRot.set(0, 0, 0);
        vPos.set(0, 0.05, 0);
        vRot.set(Math.PI / 2, 0, Math.PI);
      } else if (t < 0.46) {
        // Mobile
        aPos.set(-3, 0, 0);
        vPos.set(-3, 0.05, 0);
        vRot.set(Math.PI / 2, 0, Math.PI);
      } else if (t < 0.84) {
        // Results & Info
        aPos.set(0, 0, 0);
        vPos.set(0, 0.05, 0);
        vRot.set(Math.PI / 2, 0, Math.PI);
      } else {
        // Future (Swarm) & Vision
        // Move device completely out of frame to separate from swarm
        aPos.set(0, 15, 0);
        vPos.set(0, 15, 0);
      }

      analyteRef.current.position.lerp(aPos, 0.1);
      analyteRef.current.quaternion.slerp(new THREE.Quaternion().setFromEuler(aRot), 0.1);
      
      vidyutRef.current.position.lerp(vPos, 0.1);
      vidyutRef.current.quaternion.slerp(new THREE.Quaternion().setFromEuler(vRot), 0.1);
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#00ffcc" />
      
      <group ref={analyteRef}>
        <AnalyteX />
      </group>
      
      <group ref={vidyutRef}>
        <VidyutX isFloating={false} />
      </group>

      <LiquidDrop progress={totalScrollProgress} />
      <MobilePhone progress={totalScrollProgress} />
      <ApplicationsVisual progress={totalScrollProgress} />
      <MarketGapVisual progress={totalScrollProgress} />
      <WhyUsVisual progress={totalScrollProgress} />
      <SwarmVisualization progress={totalScrollProgress} />

      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={10} resolution={256} />
    </>
  );
}

export function Game() {
  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 45 }}>
      <color attach="background" args={['#000000']} />
      <Scene />
    </Canvas>
  );
}
