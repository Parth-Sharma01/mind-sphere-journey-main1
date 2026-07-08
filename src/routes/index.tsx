import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  Sparkles,
  Brain,
  HeartPulse,
  Wand2,
  Gamepad2,
  ArrowRight,
  Users,
  LineChart,
  ClipboardCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

type Vec3 = { x: number; y: number; z: number };

function seededRandom(seed: number) {
  let t = seed % 2147483647;
  if (t <= 0) t += 2147483646;
  return () => (t = (t * 16807) % 2147483647) / 2147483647;
}

// Procedural brain model (no external GLB dependency)
function BrainModel() {
  const modelRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const brainkGeo = useMemo(() => {
    // Create a detailed procedural brain-like shape using multiple geometries
    const group = new THREE.Group();

    // Main brain body - icosahedron with high detail
    const mainGeometry = new THREE.IcosahedronGeometry(1.0, 6);

    // Add some displacement for brain-like features
    const positionAttribute = mainGeometry.getAttribute("position");
    const originalPositions = new Float32Array(positionAttribute.array);

    for (let i = 0; i < originalPositions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];
      const z = originalPositions[i + 2];

      // Add subtle organic bumps to simulate brain surface
      const noise =
        Math.sin(x * 3) * Math.cos(y * 3) * Math.sin(z * 2) * 0.12 +
        Math.sin(x * 7) * Math.cos(y * 5) * 0.08;

      positionAttribute.setXYZ(
        i / 3,
        x * (1 + noise),
        y * (1 + noise * 0.8),
        z * (1 + noise)
      );
    }
    (positionAttribute as THREE.BufferAttribute).needsUpdate = true;

    mainGeometry.computeVertexNormals();

    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#8b5cf6"),
      metalness: 0.12,
      roughness: 0.42,
      transmission: 0.25,
      thickness: 2,
      ior: 1.5,
      emissive: new THREE.Color("#7c3aed"),
      emissiveIntensity: 0.35,
      clearcoat: 0.85,
      clearcoatRoughness: 0.25,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(mainGeometry, material);
    group.add(mesh);

    return group;
  }, []);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.0006;
      modelRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.035;
    }
  });

  return (
    <group ref={modelRef} scale={1.15}>
      <primitive object={brainkGeo} />
    </group>
  );
}

// Neural network visualization around the brain
function NeuralNetwork() {
  const rng = useMemo(() => seededRandom(1337), []);
  const { viewport } = useThree();

  const quality = viewport.width < 768 ? 0.55 : 1;
  const particleCount = Math.floor(5800 * quality);
  const impulseArcCount = Math.floor(200 * quality);

  const neuronPositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const radiusX = 2.4;
    const radiusY = 2.0;
    const radiusZ = 2.2;

    for (let i = 0; i < particleCount; i++) {
      const u = rng() * 2 - 1;
      const t = rng() * Math.PI * 2;
      const f = Math.sqrt(1 - u * u);
      let x = f * Math.cos(t);
      let y = u;
      let z = f * Math.sin(t);

      const surfaceBias = 0.62 + rng() * 0.38;
      x *= radiusX * surfaceBias;
      y *= radiusY * (0.62 + rng() * 0.38);
      z *= radiusZ * surfaceBias;

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [particleCount, rng]);

  const impulseData = useMemo(() => {
    const arcs: { a: THREE.Vector3; b: THREE.Vector3; phase: number }[] = [];

    for (let i = 0; i < impulseArcCount; i++) {
      const ia = Math.floor(rng() * (particleCount - 1));
      let ib = Math.floor(rng() * (particleCount - 1));
      if (ib === ia) ib = (ib + Math.floor(particleCount * 0.22)) % particleCount;

      const a = new THREE.Vector3(
        neuronPositions[ia * 3 + 0],
        neuronPositions[ia * 3 + 1],
        neuronPositions[ia * 3 + 2],
      );
      const b = new THREE.Vector3(
        neuronPositions[ib * 3 + 0],
        neuronPositions[ib * 3 + 1],
        neuronPositions[ib * 3 + 2],
      );

      arcs.push({ a, b, phase: rng() });
    }
    return arcs;
  }, [impulseArcCount, particleCount, rng, neuronPositions]);

  const pointsRef = useRef<THREE.Points>(null);
  const impulseGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Animate particles with floating motion
    if (pointsRef.current) {
      const geom = pointsRef.current.geometry as THREE.BufferGeometry;
      const pos = geom.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const originalX = neuronPositions[ix];
        const originalY = neuronPositions[ix + 1];
        const originalZ = neuronPositions[ix + 2];

        pos.array[ix + 0] = originalX + Math.sin(t * 0.4 + i) * 0.18;
        pos.array[ix + 1] = originalY + Math.cos(t * 0.6 + i) * 0.15;
        pos.array[ix + 2] = originalZ + Math.sin(t * 0.5 + i) * 0.18;
      }
      pos.needsUpdate = true;
    }

    // Pulse impulses
    const pulse = 0.5 + 0.5 * Math.sin(t * 0.7);
    if (impulseGroupRef.current) {
      impulseGroupRef.current.children.forEach((child, idx) => {
        if (child instanceof THREE.Line) {
          const mat = child.material as THREE.LineBasicMaterial;
          if (mat) {
            const phase = (idx % 12) / 12;
            const intensity = 0.45 + 0.55 * Math.max(0, Math.sin(t * 1.2 + phase * Math.PI * 2));
            mat.opacity = 0.18 + intensity * 0.62 * (0.75 + pulse * 0.25);
          }
        }
      });
    }
  });

  return (
    <>
      {/* Neural signal particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[neuronPositions, 3]}
            count={particleCount}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.052}
          sizeAttenuation
          color="#22d3ee"
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Impulse arcs between neurons */}
      <group ref={impulseGroupRef}>
        {impulseData.map((arc, i) => {
          const mid = new THREE.Vector3(
            (arc.a.x + arc.b.x) / 2,
            (arc.a.y + arc.b.y) / 2 + 0.35,
            (arc.a.z + arc.b.z) / 2,
          );

          const curve = new THREE.QuadraticBezierCurve3(arc.a, mid, arc.b);
          const points = curve.getPoints(36);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);

          const material = new THREE.LineBasicMaterial({
            color: new THREE.Color().setHSL(0.64, 1, 0.63),
            transparent: true,
            opacity: 0.28,
            blending: THREE.AdditiveBlending,
            linewidth: 1,
          });

          return <primitive object={new THREE.Line(geometry, material)} key={`impulse-${i}`} />;
        })}
      </group>
    </>
  );
}

// Main neural brain scene
function NeuralBrainScene() {
  const groupRef = useRef<THREE.Group | null>(null);
  const { viewport, camera } = useThree();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useFrame((state: { clock: { elapsedTime: number } }, delta: number) => {
    const t = state.clock.elapsedTime;

    // Group rotation + subtle float
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.07;
      groupRef.current.rotation.x = Math.sin(t * 0.14) * 0.04;
      groupRef.current.position.y = Math.sin(t * 0.75) * 0.03;
    }

    // Subtle camera follow (reduces motion sickness)
    camera.position.x += (pointer.x * 0.22 - camera.position.x) * (1 - Math.pow(0.0008, delta));
    camera.position.y += (pointer.y * 0.16 - camera.position.y) * (1 - Math.pow(0.0008, delta));
    camera.lookAt(0, 0, 0);
  });

  const handlePointerMove = (e: THREE.Event) => {
    const ev = e as unknown as {
      clientX: number;
      clientY: number;
      target: HTMLElement;
      currentTarget: HTMLElement;
    };
    const el = (ev.currentTarget ?? ev.target) as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((ev.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  };

  return (
    <group ref={groupRef}>
      {/* Premium lighting setup */}
      <ambientLight intensity={0.32} />
      <pointLight position={[6, 6, 7]} intensity={2.8} color="#d946ef" />
      <pointLight position={[-6, -4, -7]} intensity={2.0} color="#22d3ee" />
      <pointLight position={[0, 4, 5]} intensity={1.4} color="#ffffff" decay={2.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />

      {/* Starfield background */}
      <Stars radius={55} depth={70} count={1800} factor={4} fade speed={0.75} />

      {/* Main brain model */}
      <BrainModel />

      {/* Neural network visualization */}
      <NeuralNetwork />

      {/* Interactive orbit controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3.0}
        maxDistance={9}
        autoRotate
        autoRotateSpeed={0.22}
        dampingFactor={0.09}
        rotateSpeed={1.0}
      />

      {/* Pointer tracking group */}
      <group
        onPointerMove={(e) => handlePointerMove(e as unknown as THREE.Event)}
        onPointerOver={() => undefined}
        onPointerOut={() => setPointer({ x: 0, y: 0 })}
      />
    </group>
  );
}

function Brain3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 52 }} dpr={[1, 2]}>
      <Suspense
        fallback={
          <group>
            <ambientLight intensity={0.2} />
          </group>
        }
      >
        <NeuralBrainScene />
      </Suspense>
    </Canvas>
  );
}

const features = [
  {
    icon: Brain,
    title: "Story-based Assessment",
    desc: "30 gamified questions that feel like play — not a form.",
  },
  {
    icon: HeartPulse,
    title: "Mood Tracker",
    desc: "Log daily and watch patterns emerge across weeks.",
  },
  {
    icon: Wand2,
    title: "AI Coach",
    desc: "A gentle companion for reflection, planning, and calm.",
  },
  {
    icon: Gamepad2,
    title: "Mindful Games",
    desc: "Reaction, memory & breathing games that reward focus.",
  },
  {
    icon: LineChart,
    title: "Mind Galaxy",
    desc: "A living 3D universe of your wellness across 8 dimensions.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "An anonymous circle of students sharing what actually helps.",
  },
];

const heroFeatures = [
  {
    icon: Gamepad2,
    title: "🎮 Gamified Assessment",
    desc: "Interactive scenario-based mental wellness experience.",
  },
  {
    icon: Sparkles,
    title: "🧠 AI Wellness Insights",
    desc: "Personalized wellness trends and visual reports.",
  },
  {
    icon: LineChart,
    title: "🌌 Mind Galaxy",
    desc: "Interactive visualization of emotional growth over time.",
  },
  {
    icon: ClipboardCheck,
    title: "🎯 Daily Wellness Missions",
    desc: "Build healthier habits through small daily challenges.",
  },
];

function Index() {
  return (
    <div className="space-y-32">
      {/* Hero */}
      <section className="grid lg:grid-cols-2 gap-8 items-center pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-6">
            <Sparkles className="h-3 w-3 text-fuchsia-300" /> Interactive Brain · AI Wellness
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
            Play. Reflect. <br />
            <span className="text-gradient">Understand. Heal.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            An AI-inspired wellness companion for students — gamified assessments, mood tracking,
            mindful games, and a living galaxy of your inner state.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/assessment"
              className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Start free assessment{" "}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link
              to="/dashboard"
              className="rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/10 transition"
            >
              See dashboard
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {heroFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-3xl p-5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="h-10 w-10 rounded-2xl bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/30 grid place-items-center relative"
                    whileHover={{ filter: "drop-shadow(0 0 18px rgba(34,211,238,0.25))" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <f.icon className="h-5 w-5" />
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-400/20 opacity-0 group-hover:opacity-100" />
                  </motion.div>
                  <div>
                    <div className="font-medium leading-tight">{f.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {f.desc}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative h-[420px] lg:h-[520px] rounded-3xl overflow-hidden glass"
        >
          <Brain3D />
          <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Interactive 3D · drag to rotate · scroll to zoom</span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Live Neural
              Network
            </span>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section>
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Every part of your mind, gently in view.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Not a diagnostic tool. A calm daily companion built to help students stay curious about
            themselves.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass rounded-3xl p-6 hover:bg-white/[0.07] transition"
            >
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/30 grid place-items-center mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="font-medium">{f.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="glass-strong rounded-[2rem] p-10 sm:p-16 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{ background: "var(--gradient-glow)" }}
        />
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight max-w-2xl mx-auto">
          Your mind deserves five gentle minutes a day.
        </h2>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
          Start with a 3-minute assessment. No email, no pressure.
        </p>
        <Link
          to="/assessment"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-black px-7 py-3 font-medium"
        >
          Begin your journey <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
