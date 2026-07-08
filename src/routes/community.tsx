import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { communityPosts } from "@/lib/mock-data";
import { Heart, MessageCircle, TrendingUp, Trophy } from "lucide-react";

export const Route = createFileRoute("/community")({
  component: Community,
  head: () => ({ meta: [{ title: "Community · MindSphere AI" }] }),
});

function Community() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const board = [
    { name: "Nebula47", xp: 4820, avatar: "🌌" },
    { name: "SolarWave", xp: 4310, avatar: "🌞" },
    { name: "MoonRider", xp: 3980, avatar: "🌙" },
    { name: "You", xp: 3210, avatar: "✨" },
  ];
  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Circle</h1>
        <div className="glass-strong rounded-2xl p-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 grid place-items-center text-sm">
            ✨
          </div>
          <input
            placeholder="Share something anonymously…"
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button className="rounded-full bg-white text-black text-sm px-4 py-1.5">Post</button>
        </div>
        {communityPosts.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full glass grid place-items-center">{p.avatar}</div>
              <div>
                <div className="text-sm font-medium">{p.author}</div>
                <div className="text-xs text-muted-foreground">
                  {p.time} · #{p.tag}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{p.content}</p>
            <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
              <button
                onClick={() => setLiked((l) => ({ ...l, [p.id]: !l[p.id] }))}
                className="flex items-center gap-1.5 hover:text-foreground"
              >
                <Heart
                  className={`h-3.5 w-3.5 ${liked[p.id] ? "fill-rose-400 text-rose-400" : ""}`}
                />{" "}
                {p.likes + (liked[p.id] ? 1 : 0)}
              </button>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" /> {p.comments}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="glass rounded-3xl p-5">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-300" /> Trending
          </div>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <div>#examseason</div>
            <div>#morningroutine</div>
            <div>#gratitude</div>
            <div>#quietwins</div>
          </div>
        </div>
        <div className="glass rounded-3xl p-5">
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4 text-amber-300" /> Leaderboard
          </div>
          <div className="mt-3 space-y-2">
            {board.map((u, i) => (
              <div key={u.name} className="flex items-center gap-2 text-sm">
                <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                <span>{u.avatar}</span>
                <span className="flex-1">{u.name}</span>
                <span className="text-xs text-muted-foreground">{u.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
