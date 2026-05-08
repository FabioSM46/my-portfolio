/**
 * Skills Section
 * Interactive 3D skill constellation visualization
 * Skills are displayed as nodes in a network with connecting lines
 * Demonstrates technical expertise through visual interaction
 * Minimal text - maximum visual impact
 */

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Line } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

interface SkillNode {
  name: string;
  category: string;
  position: [number, number, number];
  color: string;
}

const skillsData: SkillNode[] = [
  // Core
  { name: 'TypeScript', category: 'core', position: [0, 2, 0], color: '#3178c6' },
  { name: 'Node.js', category: 'core', position: [-1.5, 1.2, 0.5], color: '#339933' },
  { name: 'Go', category: 'core', position: [1.5, 1.2, -0.5], color: '#00add8' },

  // Frontend
  { name: 'React', category: 'frontend', position: [-2.5, 0, 1], color: '#61dafb' },
  { name: 'Next.js', category: 'frontend', position: [-1.8, -0.8, 1.5], color: '#ffffff' },
  { name: 'Tailwind', category: 'frontend', position: [-3, -1.5, 0.5], color: '#06b6d4' },

  // Backend
  { name: 'NestJS', category: 'backend', position: [2.5, 0, -1], color: '#e0234e' },
  { name: 'REST APIs', category: 'backend', position: [3, -1, -0.5], color: '#68d391' },
  { name: 'Microservices', category: 'backend', position: [1.8, -0.5, -1.5], color: '#9f7aea' },

  // Geospatial
  { name: 'PostGIS', category: 'geo', position: [0, -1.5, 2], color: '#336791' },
  { name: 'Deck.gl', category: 'geo', position: [-1, -2.5, 1.5], color: '#ff7f00' },
  { name: 'Mapbox', category: 'geo', position: [1.2, -2, 1.8], color: '#4264fb' },

  // Testing
  { name: 'Playwright', category: 'testing', position: [2, 1.5, 1.5], color: '#2ead4a' },
  { name: 'Jest', category: 'testing', position: [3, 0.5, 1], color: '#c21325' },

  // AI
  { name: 'MCP', category: 'ai', position: [-0.5, 0.5, -2], color: '#10b981' },
  { name: 'AI Agents', category: 'ai', position: [0.5, -0.5, -2.5], color: '#8b5cf6' },
];

// Connections between related skills
const connections: [number, number][] = [
  [0, 1],
  [0, 2], // TypeScript to Node.js, Go
  [0, 3],
  [3, 4],
  [3, 5], // TypeScript to React ecosystem
  [0, 6],
  [6, 7],
  [6, 8], // TypeScript to NestJS ecosystem
  [1, 10],
  [10, 11], // Node.js to geospatial
  [0, 13],
  [13, 14], // Testing
  [0, 14], // AI
];

function SkillNodeComponent({
  node,
  index,
  hovered,
  onHover,
}: {
  node: SkillNode;
  index: number;
  hovered: number | null;
  onHover: (index: number | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHovered = hovered === index;
  const isNeighbor =
    hovered !== null &&
    connections.some(([a, b]) => (a === hovered && b === index) || (b === hovered && a === index));

  useFrame(() => {
    if (meshRef.current) {
      const scale = isHovered ? 1.5 : isNeighbor ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group
        position={node.position}
        onPointerOver={() => onHover(index)}
        onPointerOut={() => onHover(null)}
      >
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={isHovered ? 0.8 : isNeighbor ? 0.4 : 0.2}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
        <Text
          position={[0, -0.35, 0]}
          fontSize={0.18}
          color={isHovered ? '#ffffff' : '#94a3b8'}
          anchorX="center"
          anchorY="middle"
        >
          {node.name}
        </Text>
      </group>
    </Float>
  );
}

function ConnectionLines({ hovered }: { hovered: number | null }) {
  const lines = useMemo(() => {
    return connections.map(([start, end], i) => {
      const startNode = skillsData[start];
      const endNode = skillsData[end];
      const isActive =
        hovered === start ||
        hovered === end ||
        connections.some(
          ([a, b]) =>
            (a === hovered && (b === start || b === end)) ||
            (b === hovered && (a === start || a === end))
        );

      return (
        <Line
          key={i}
          points={[startNode.position, endNode.position]}
          color={isActive ? '#3b82f6' : '#1e3a5f'}
          lineWidth={isActive ? 2 : 1}
          transparent
          opacity={isActive ? 0.8 : 0.3}
        />
      );
    });
  }, [hovered]);

  return <>{lines}</>;
}

function Scene() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={0.3} />

      <ConnectionLines hovered={hovered} />

      {skillsData.map((node, index) => (
        <SkillNodeComponent
          key={node.name}
          node={node}
          index={index}
          hovered={hovered}
          onHover={setHovered}
        />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a1628" transparent opacity={0.5} />
      </mesh>
    </>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gradient">Skills</h2>
        <p className="mt-4 text-muted-foreground max-w-lg">
          Interactive skill network. Hover to explore connections.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full max-w-4xl h-[600px]"
      >
        <Canvas
          camera={{ position: [0, 2, 8], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </motion.div>

      {/* Category Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mt-8 z-10"
      >
        {[
          { label: 'Core', color: '#3178c6' },
          { label: 'Frontend', color: '#61dafb' },
          { label: 'Backend', color: '#e0234e' },
          { label: 'Geospatial', color: '#ff7f00' },
          { label: 'Testing', color: '#2ead4a' },
          { label: 'AI', color: '#8b5cf6' },
        ].map(cat => (
          <div key={cat.label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
            <span className="text-sm text-muted-foreground">{cat.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
