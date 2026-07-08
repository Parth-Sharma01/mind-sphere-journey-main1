import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Float } from "@react-three/drei";
import { wellnessMetrics } from "@/lib/mock-data";
import { X } from "lucide-react";

export function InteractiveMindGalaxy() {
  const [selectedMetric, setSelectedMetric] = useState<(typeof wellnessMetrics)[0] | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-3xl p-6 h-[400px] flex flex-col relative"
    >
      <div className="flex items-center justify-between mb-4 z-10">
        <div>
          <div className="text-sm text-muted-foreground">Mind Galaxy</div>
          <div className="font-medium mt-0.5">Click a planet to explore</div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 -mx-2 -mb-2">
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#d946ef" />
          <pointLight position={[-5, -5, 3]} intensity={1.5} color="#22d3ee" />

          {wellnessMetrics.slice(0, 8).map((m, i) => {
            const a = (i / 8) * Math.PI * 2;
            const r = 2.2;
            return (
              <InteractivePlanet
                key={m.name}
                metric={m}
                position={[Math.cos(a) * r, Math.sin(a) * r, 0]}
                onSelect={() => setSelectedMetric(m)}
              />
            );
          })}

          <Sphere args={[0.55, 32, 32]}>
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.2} />
          </Sphere>

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
      </div>

      {/* Details Panel */}
      <AnimatePresence>
        {selectedMetric && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 p-6 rounded-3xl glass backdrop-blur-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl">{selectedMetric.icon}</div>
                  <h3 className="text-lg font-semibold mt-2">{selectedMetric.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedMetric(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{selectedMetric.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Score</span>
                  <span className="text-xl font-bold text-emerald-300">
                    {selectedMetric.value}/100
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedMetric.value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: selectedMetric.color }}
                  />
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2 pt-4 border-t border-white/10"
            >
              <div className="text-xs font-medium text-emerald-300">Tips to improve:</div>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {getWellnessTips(selectedMetric.name).map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-emerald-300">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface InteractivePlanetProps {
  metric: (typeof wellnessMetrics)[0];
  position: [number, number, number];
  onSelect: () => void;
}

function InteractivePlanet({ metric, position, onSelect }: InteractivePlanetProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Float speed={1} floatIntensity={1}>
      <motion.group
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={onSelect}
      >
        <Sphere args={[0.3 + metric.value / 200, 32, 32]}>
          <meshStandardMaterial
            color={metric.color}
            emissive={metric.color}
            emissiveIntensity={hovered ? 1.2 : 0.6}
          />
        </Sphere>
      </motion.group>
    </Float>
  );
}

function getWellnessTips(metric: string): string[] {
  const tips: Record<string, string[]> = {
    Mood: ["Practice daily gratitude", "Connect with loved ones", "Engage in activities you enjoy"],
    Stress: ["Try breathing exercises", "Take regular breaks", "Practice mindfulness meditation"],
    Focus: ["Play focus games regularly", "Minimize distractions", "Take study breaks"],
    Sleep: [
      "Maintain a consistent sleep schedule",
      "Limit screen time before bed",
      "Create a cool sleep environment",
    ],
    Energy: ["Stay physically active", "Eat nutritious meals", "Get adequate sleep"],
    Motivation: ["Set meaningful goals", "Track your progress", "Celebrate small wins"],
    Confidence: [
      "Practice self-compassion",
      "Challenge negative thoughts",
      "Celebrate achievements",
    ],
    Relationships: ["Reach out to friends", "Join community activities", "Share your feelings"],
  };
  return tips[metric] || ["Keep practicing consistently"];
}
