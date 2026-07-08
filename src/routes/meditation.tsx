import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { meditationSounds } from "@/lib/mock-data";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export const Route = createFileRoute("/meditation")({
  component: Meditation,
  head: () => ({ meta: [{ title: "Meditation · MindSphere AI" }] }),
});

function Meditation() {
  const [active, setActive] = useState(meditationSounds[0]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Sound bath</h1>
        <p className="text-muted-foreground mt-1">Soft rooms for a still mind.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {meditationSounds.map((s, i) => (
          <motion.button
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            onClick={() => {
              setActive(s);
              setPlaying(true);
            }}
            className={`relative overflow-hidden rounded-3xl p-6 text-left aspect-[4/5] bg-gradient-to-br ${s.color} ${active.title === s.title ? "ring-2 ring-white/50" : ""}`}
          >
            <div className="text-5xl">{s.icon}</div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-lg font-semibold">{s.title}</div>
              <div className="text-xs opacity-80">{s.desc}</div>
              <div className="text-xs opacity-70 mt-2">{s.duration}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="glass-strong rounded-3xl p-6 flex items-center gap-6">
        <div
          className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${active.color} grid place-items-center text-4xl`}
        >
          {active.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{active.title}</div>
          <div className="text-xs text-muted-foreground">{active.desc}</div>
          <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div animate={{ width: `${progress}%` }} className="h-full bg-white" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-white/5">
            <SkipBack className="h-4 w-4" />
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="h-11 w-11 rounded-full bg-white text-black grid place-items-center"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button className="p-2 rounded-full hover:bg-white/5">
            <SkipForward className="h-4 w-4" />
          </button>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(e) => setProgress(+e.target.value)}
        className="w-full accent-fuchsia-500"
      />
    </div>
  );
}
