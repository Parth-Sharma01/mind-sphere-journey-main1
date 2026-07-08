import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { journalEntries } from "@/lib/mock-data";
import { Pin, Search, Sparkles, Plus } from "lucide-react";

export const Route = createFileRoute("/journal")({
  component: Journal,
  head: () => ({ meta: [{ title: "Journal · MindSphere AI" }] }),
});

function Journal() {
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState("");
  const entries = journalEntries.filter(
    (e) =>
      e.title.toLowerCase().includes(q.toLowerCase()) ||
      e.excerpt.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Journal</h1>
          <button className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2">
            <Plus className="h-4 w-4" /> New entry
          </button>
        </div>

        <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search entries…"
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>

        <div className="glass-strong rounded-3xl p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span className="glass rounded-full px-2 py-0.5">Today</span>
            <span>·</span>
            <span>🌤️ mood: 7</span>
          </div>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            placeholder="What's on your mind?"
            className="w-full bg-transparent outline-none text-lg leading-relaxed resize-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span className="glass rounded-full px-2.5 py-1">B</span>
              <span className="glass rounded-full px-2.5 py-1 italic">i</span>
              <span className="glass rounded-full px-2.5 py-1">•</span>
            </div>
            <button className="rounded-full bg-white text-black text-sm px-4 py-1.5">
              Save entry
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {entries.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 hover:bg-white/[0.07] transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{e.mood}</span>
                  <div className="font-medium">{e.title}</div>
                  {e.pinned && <Pin className="h-3.5 w-3.5 text-fuchsia-300" />}
                </div>
                <span className="text-xs text-muted-foreground">{e.date}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{e.excerpt}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="glass-strong rounded-3xl p-6">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-fuchsia-300" /> AI summary
          </div>
          <p className="mt-3 text-sm leading-relaxed">
            You've written 12 entries this month. Words that appeared most:{" "}
            <span className="text-foreground font-medium">
              rest, exams, friends, tired, gratitude
            </span>
            . Your calmest days followed morning walks.
          </p>
          <button className="mt-4 text-xs text-fuchsia-300">Generate deeper insights →</button>
        </div>
        <div className="glass rounded-3xl p-6">
          <div className="text-sm text-muted-foreground">Streak</div>
          <div className="mt-2 text-3xl font-semibold">🔥 9 days</div>
          <p className="text-xs text-muted-foreground mt-1">Keep going — 5 more for a badge.</p>
        </div>
      </div>
    </div>
  );
}
