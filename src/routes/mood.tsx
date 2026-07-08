import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { moodTimeline, monthlyHeatmap } from "@/lib/mock-data";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/mood")({
  component: Mood,
  head: () => ({ meta: [{ title: "Mood Tracker · MindSphere AI" }] }),
});

const emojis = ["😞", "😕", "😐", "🙂", "😄", "🤩"];

function Mood() {
  const [pick, setPick] = useState(3);
  const [intensity, setIntensity] = useState(60);
  const [tags, setTags] = useState<string[]>(["Focused"]);
  const allTags = [
    "Focused",
    "Anxious",
    "Grateful",
    "Tired",
    "Hopeful",
    "Restless",
    "Content",
    "Lonely",
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">How are you, really?</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass-strong rounded-3xl p-8">
          <div className="text-sm text-muted-foreground">Pick your mood</div>
          <div className="mt-6 flex justify-between">
            {emojis.map((e, i) => (
              <motion.button
                key={i}
                onClick={() => setPick(i)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={`h-14 w-14 rounded-2xl text-3xl grid place-items-center transition ${pick === i ? "bg-white/15 shadow-[0_0_30px_rgba(217,70,239,0.4)]" : "hover:bg-white/5"}`}
              >
                {e}
              </motion.button>
            ))}
          </div>
          <div className="mt-8">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Intensity</span>
              <span>{intensity}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={intensity}
              onChange={(e) => setIntensity(+e.target.value)}
              className="mt-2 w-full accent-fuchsia-500"
            />
          </div>
          <div className="mt-6">
            <div className="text-sm text-muted-foreground mb-2">Tags</div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((t) => {
                const on = tags.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => setTags(on ? tags.filter((x) => x !== t) : [...tags, t])}
                    className={`rounded-full px-3 py-1 text-xs transition ${on ? "bg-fuchsia-500 text-black" : "glass hover:bg-white/10"}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
          <button className="mt-8 w-full rounded-2xl bg-white text-black py-3 font-medium hover:opacity-90">
            Log this moment
          </button>
        </div>
        <div className="glass rounded-3xl p-6 h-[420px]">
          <div className="text-sm text-muted-foreground">Weekly mood</div>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={moodTimeline}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="oklch(0.7 0 0)" tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.7 0 0)" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.14 0.03 270)",
                  border: "1px solid oklch(1 0 0 / 0.1)",
                  borderRadius: 12,
                }}
              />
              <Bar dataKey="mood" fill="#d946ef" radius={[8, 8, 0, 0]} />
              <Bar dataKey="energy" fill="#22d3ee" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass rounded-3xl p-6">
        <div className="text-sm text-muted-foreground">Monthly heatmap</div>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {monthlyHeatmap.map((d, i) => {
            const bg = [
              "bg-white/5",
              "bg-fuchsia-900/60",
              "bg-fuchsia-700/70",
              "bg-fuchsia-500/80",
              "bg-fuchsia-400",
            ][d.value];
            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.01 }}
                className={`aspect-square rounded-md ${bg}`}
                title={`Day ${d.day}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
