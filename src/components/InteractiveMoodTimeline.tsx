import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { moodTimeline } from "@/lib/mock-data";

type TimelineView = "daily" | "weekly" | "monthly";

export function InteractiveMoodTimeline() {
  const [view, setView] = useState<TimelineView>("weekly");

  // Generate different data based on view
  const getData = () => {
    if (view === "daily") {
      return Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        mood: Math.floor(Math.random() * 5) + 5,
        focus: Math.floor(Math.random() * 5) + 5,
      }));
    } else if (view === "weekly") {
      return moodTimeline;
    } else {
      // Monthly
      return Array.from({ length: 30 }, (_, i) => ({
        day: `Day ${i + 1}`,
        mood: Math.floor(Math.random() * 10) + 1,
        focus: Math.floor(Math.random() * 10) + 1,
      }));
    }
  };

  const data = getData();
  const highestMood = Math.max(...data.map((d) => d.mood || 0));
  const lowestMood = Math.min(...data.map((d) => d.mood || 0));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-3xl p-6 lg:col-span-2 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-muted-foreground">Mood Timeline</div>
          <div className="font-medium mt-0.5">
            {view === "daily" && "Today's pattern"}
            {view === "weekly" && "This week"}
            {view === "monthly" && "This month"}
          </div>
        </div>

        {/* View toggle buttons */}
        <div className="flex gap-2">
          {(["daily", "weekly", "monthly"] as const).map((v) => (
            <motion.button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                view === v
                  ? "bg-fuchsia-500/20 border border-fuchsia-500/50 text-fuchsia-300"
                  : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d946ef" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#d946ef" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
          <XAxis
            dataKey={view === "daily" ? "time" : view === "weekly" ? "day" : "day"}
            stroke="oklch(0.7 0 0)"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="oklch(0.7 0 0)" tickLine={false} axisLine={false} domain={[0, 10]} />
          <Tooltip
            contentStyle={{
              background: "oklch(0.14 0.03 270)",
              border: "1px solid oklch(1 0 0 / 0.1)",
              borderRadius: 12,
            }}
            cursor={{ stroke: "oklch(1 0 0 / 0.1)" }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="mood"
            stroke="#d946ef"
            strokeWidth={2.5}
            fill="url(#g1)"
            isAnimationActive={true}
          />
          <Area
            type="monotone"
            dataKey="focus"
            stroke="#22d3ee"
            strokeWidth={2}
            fill="url(#g2)"
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs"
      >
        <div>
          <div className="text-muted-foreground">Highest Mood</div>
          <div className="font-medium text-emerald-300 mt-1">{highestMood}/10 📈</div>
        </div>
        <div>
          <div className="text-muted-foreground">Lowest Mood</div>
          <div className="font-medium text-red-300 mt-1">{lowestMood}/10 📉</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
