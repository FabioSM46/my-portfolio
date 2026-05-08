import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Text, Float, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useIsMobile } from '@/hooks/useIsMobile';
import { seededRandom } from '@/lib/random';

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function Globe({ mobile }: { mobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const { normalizedX } = useMousePosition();
  const reduced = useReducedMotion();

  useFrame(() => {
    if (reduced) return;
    const baseSpeed = 0.001;
    const mouseInfluence = normalizedX * 0.008;
    const rotationSpeed = baseSpeed + mouseInfluence;

    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += rotationSpeed;
    }
  });

  const segments = mobile ? 32 : 64;
  const wireSegments = mobile ? 16 : 32;

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[3.5, segments, segments]} />
        <meshStandardMaterial
          color="#0a1628"
          metalness={0.8}
          roughness={0.2}
          emissive="#1a3a5c"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[3.51, wireSegments, wireSegments]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.15} />
      </mesh>
      <LatLongLines mobile={mobile} />
    </group>
  );
}

function LatLongLines({ mobile }: { mobile: boolean }) {
  const lines = useMemo(() => {
    const lineObjects: THREE.Line[] = [];
    const radius = 3.52;
    const step = mobile ? 4 : 6;
    const lngStep = mobile ? 8 : 12;

    for (let i = 1; i < step; i++) {
      const phi = (Math.PI * i) / step;
      const y = Math.cos(phi) * radius;
      const r = Math.sin(phi) * radius;

      const points = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
      }
      lineObjects.push(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          new THREE.LineBasicMaterial({ color: '#3b82f6', transparent: true, opacity: 0.3 })
        )
      );
    }

    for (let i = 0; i < lngStep; i++) {
      const theta = (i / lngStep) * Math.PI * 2;
      const points = [];
      for (let j = 0; j <= 64; j++) {
        const phi = (j / 64) * Math.PI;
        points.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
          )
        );
      }
      lineObjects.push(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          new THREE.LineBasicMaterial({ color: '#3b82f6', transparent: true, opacity: 0.3 })
        )
      );
    }

    return lineObjects;
  }, [mobile]);

  return (
    <group>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

interface OrbitParams {
  radius: number;
  speed: number;
  phaseOffset: number;
  u: THREE.Vector3;
  v: THREE.Vector3;
}

function createRandomOrbit(index: number): OrbitParams {
  const radius = 4.5 + seededRandom(index * 7) * 1.5;
  const speed = 0.2 + seededRandom(index * 13) * 0.2;
  const phaseOffset = seededRandom(index * 23) * Math.PI * 2;

  const theta = seededRandom(index * 31) * Math.PI * 2;
  const phi = Math.acos(2 * seededRandom(index * 41) - 1);
  const nx = Math.sin(phi) * Math.cos(theta);
  const ny = Math.sin(phi) * Math.sin(theta);
  const nz = Math.cos(phi);
  const normal = new THREE.Vector3(nx, ny, nz).normalize();

  const arbitrary =
    Math.abs(normal.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const u = new THREE.Vector3().crossVectors(normal, arbitrary).normalize();
  const v = new THREE.Vector3().crossVectors(normal, u).normalize();

  return { radius, speed, phaseOffset, u, v };
}

const orbitConfigs: OrbitParams[] = Array.from({ length: 8 }, (_, i) => createRandomOrbit(i));

function SkillSatellite({ skill, orbit }: { skill: string; orbit: OrbitParams }) {
  const groupRef = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = reduced
      ? orbit.phaseOffset
      : clock.getElapsedTime() * orbit.speed + orbit.phaseOffset;

    const cosT = Math.cos(t);
    const sinT = Math.sin(t);

    const x = orbit.u.x * cosT * orbit.radius + orbit.v.x * sinT * orbit.radius;
    const y = orbit.u.y * cosT * orbit.radius + orbit.v.y * sinT * orbit.radius;
    const z = orbit.u.z * cosT * orbit.radius + orbit.v.z * sinT * orbit.radius;

    groupRef.current.position.set(x, y, z);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Billboard>
          <Text fontSize={0.2} color="#60a5fa" anchorX="center" anchorY="middle">
            {skill}
          </Text>
        </Billboard>
        <pointLight color="#3b82f6" intensity={0.5} distance={2} />
      </Float>
    </group>
  );
}

function SkillNodes() {
  const skills = [
    'TypeScript',
    'React',
    'NestJS',
    'PostGIS',
    'Deck.gl',
    'Node.js',
    'Go',
    'Three.js',
  ];

  return (
    <>
      {skills.map((skill, index) => (
        <SkillSatellite key={skill} skill={skill} orbit={orbitConfigs[index]} />
      ))}
    </>
  );
}

function DataPoints({ mobile }: { mobile: boolean }) {
  const points = useMemo(() => {
    const pointData = [];
    const count = mobile ? 20 : 50;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const radius = 3.55;
      pointData.push({
        position: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi),
        ] as [number, number, number],
        scale: seededRandom(i) * 0.03 + 0.02,
      });
    }

    return pointData;
  }, [mobile]);

  return (
    <>
      {points.map((point, i) => (
        <mesh key={i} position={point.position}>
          <sphereGeometry args={[point.scale, 8, 8]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.8} />
        </mesh>
      ))}
    </>
  );
}

function CameraRig({ mobile }: { mobile: boolean }) {
  const { normalizedX, normalizedY } = useMousePosition();
  const zoomRef = useRef(9);
  const targetZoomRef = useRef(9);
  const reduced = useReducedMotion();
  const { gl } = useThree();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoomRef.current += e.deltaY * 0.01;
      targetZoomRef.current = Math.max(5, Math.min(20, targetZoomRef.current));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    if (!mobile) return;
    const canvas = gl.domElement;

    let initialPinchDist = 0;
    let initialZoom = targetZoomRef.current;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDist = Math.hypot(dx, dy);
        initialZoom = targetZoomRef.current;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        if (initialPinchDist > 0) {
          const scale = initialPinchDist / dist;
          targetZoomRef.current = Math.max(5, Math.min(20, initialZoom * scale));
        }
      }
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [mobile, gl.domElement]);

  useFrame(state => {
    zoomRef.current += (targetZoomRef.current - zoomRef.current) * 0.05;

    if (reduced) {
      state.camera.position.z = 9;
      state.camera.lookAt(0, 0, 0);
      return;
    }

    const targetX = normalizedX * (mobile ? 1.5 : 2);
    const targetY = normalizedY * (mobile ? 0.8 : 1);

    state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.02;
    state.camera.position.z = zoomRef.current;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene({ mobile }: { mobile: boolean }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, -5, -5]} color="#3b82f6" intensity={0.5} />

      <Globe mobile={mobile} />
      <DataPoints mobile={mobile} />
      <SkillNodes />
      <Stars
        radius={50}
        depth={50}
        count={mobile ? 300 : 1000}
        factor={mobile ? 3 : 4}
        saturation={0}
        fade
        speed={1}
      />

      <CameraRig mobile={mobile} />
    </>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-blue-400 rounded-full animate-spin" />
      </div>
      <p className="text-blue-400 text-sm font-medium animate-pulse">Loading globe...</p>
    </div>
  );
}

export default function GeospatialGlobe() {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 z-0" style={{ touchAction: 'none' }}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0a0e1a]/80 backdrop-blur-sm transition-opacity duration-500">
          <LoadingSpinner />
        </div>
      )}
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: !isMobile, alpha: true }}
        onCreated={() => {
          setTimeout(() => setIsLoading(false), 300);
        }}
        performance={{ min: 0.3 }}
      >
        <Scene mobile={isMobile} />
      </Canvas>
    </div>
  );
}
