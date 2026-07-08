import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { games } from "@/lib/mock-data";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/games")({
  component: Games,
  head: () => ({ meta: [{ title: "Wellness Games · MindSphere AI" }] }),
});

function Games() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Mindful games</h1>
        <p className="text-muted-foreground mt-1">Short. Playful. Every round earns XP.</p>
      </div>

      {active === "breathing" && <BreathingGame onExit={() => setActive(null)} />}
      {active === "reaction-test" && <ReactionGame onExit={() => setActive(null)} />}
      {active === "balloon" && <BalloonGame onExit={() => setActive(null)} />}
      {active === "memory-match" && <MemoryMatchGame onExit={() => setActive(null)} />}
      {active && !["breathing", "reaction-test", "balloon", "memory-match"].includes(active) && (
        <ComingSoon onExit={() => setActive(null)} />
      )}

      {!active && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {games.map((g, i) => (
            <motion.button
              key={g.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setActive(g.slug)}
              className={`relative overflow-hidden rounded-3xl p-6 text-left bg-gradient-to-br ${g.color}`}
            >
              <div className="text-4xl mb-6">{g.icon}</div>
              <div className="font-semibold">{g.title}</div>
              <div className="text-xs opacity-80 mt-1">{g.desc}</div>
              <div className="mt-4 inline-flex items-center gap-1 text-xs bg-black/30 rounded-full px-2 py-0.5">
                <Sparkles className="h-3 w-3" /> +{g.xp} XP
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

function BreathingGame({ onExit }: { onExit: () => void }) {
  const [phase, setPhase] = useState("Inhale");
  useEffect(() => {
    const phases = ["Inhale", "Hold", "Exhale", "Hold"];
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % 4;
      setPhase(phases[i]);
    }, 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="glass-strong rounded-3xl p-10 text-center min-h-[400px] grid place-items-center relative">
      <button onClick={onExit} className="absolute top-4 right-4 text-sm text-muted-foreground">
        Close
      </button>
      <div>
        <motion.div
          animate={{ scale: phase === "Inhale" ? 1.4 : phase === "Exhale" ? 0.8 : 1.2 }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="h-40 w-40 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-[0_0_80px_rgba(34,211,238,0.5)]"
        />
        <div className="mt-8 text-2xl font-semibold">{phase}</div>
        <div className="text-sm text-muted-foreground mt-2">4-4-4-4 box breathing</div>
      </div>
    </div>
  );
}

function ReactionGame({ onExit }: { onExit: () => void }) {
  const [state, setState] = useState<"idle" | "wait" | "go" | "done">("idle");
  const [ms, setMs] = useState(0);
  const start = useRef(0);
  const timer = useRef<number | null>(null);

  const begin = () => {
    setState("wait");
    const delay = 1200 + Math.random() * 2500;
    timer.current = window.setTimeout(() => {
      start.current = performance.now();
      setState("go");
    }, delay);
  };
  const tap = () => {
    if (state === "go") {
      setMs(Math.round(performance.now() - start.current));
      setState("done");
    } else if (state === "wait") {
      if (timer.current) clearTimeout(timer.current);
      setState("idle");
      setMs(-1);
    }
  };
  const color =
    state === "go" ? "bg-emerald-500" : state === "wait" ? "bg-rose-500" : "bg-slate-700";

  return (
    <div className="glass-strong rounded-3xl p-8 relative">
      <button onClick={onExit} className="absolute top-4 right-4 text-sm text-muted-foreground">
        Close
      </button>
      <div
        onClick={state === "idle" || state === "done" ? begin : tap}
        className={`cursor-pointer rounded-3xl ${color} min-h-[300px] grid place-items-center text-center transition-colors`}
      >
        {state === "idle" && (
          <div>
            <div className="text-2xl font-semibold">Tap to start</div>
            <div className="text-sm opacity-80 mt-1">Tap the instant it turns green.</div>
          </div>
        )}
        {state === "wait" && <div className="text-lg">Wait for green…</div>}
        {state === "go" && <div className="text-2xl font-semibold">TAP!</div>}
        {state === "done" && (
          <div>
            <div className="text-4xl font-bold">{ms} ms</div>
            <div className="text-sm mt-2 opacity-80">Tap to retry</div>
          </div>
        )}
      </div>
    </div>
  );
}

function MemoryMatchGame({ onExit }: { onExit: () => void }) {
  type Card = { id: number; pairId: number; face: string; matched: boolean };
  const faces = ["🧠", "🌈", "⚡", "🌙", "🎯", "📚"];

  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    const pairs: Card[] = faces.slice(0, 6).flatMap((f, idx) => {
      const pairId = idx + 1;
      return [
        { id: Date.now() + Math.random() + pairId * 10 + 1, pairId, face: f, matched: false },
        { id: Date.now() + Math.random() + pairId * 10 + 2, pairId, face: f, matched: false },
      ];
    });

    const shuffled = [...pairs].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMoves(0);
    setLock(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    setCards([]);
    setFlipped([]);
    setMoves(0);
    setLock(false);
    // remount effect behavior
    setTimeout(() => window.location.reload(), 50);
  };

  const onFlip = (idx: number) => {
    if (lock) return;
    const c = cards[idx];
    if (!c || c.matched) return;
    if (flipped.includes(idx)) return;

    const nextFlipped = [...flipped, idx];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLock(true);

      const [aIdx, bIdx] = nextFlipped;
      const a = cards[aIdx];
      const b = cards[bIdx];

      const isMatch = a.pairId === b.pairId;

      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, i) => {
            if (i === aIdx || i === bIdx) {
              return isMatch ? { ...card, matched: true } : card;
            }
            return card;
          }),
        );
        setFlipped([]);
        setLock(false);
      }, isMatch ? 450 : 900);
    }
  };

  const allMatched = cards.length > 0 && cards.every((c) => c.matched);

  return (
    <div className="glass-strong rounded-3xl p-6 relative overflow-hidden min-h-[440px]">
      <button
        onClick={onExit}
        className="absolute top-4 right-4 text-sm text-muted-foreground z-10"
      >
        Close
      </button>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Memory Match</div>
          <div className="mt-1">
            Moves: <span className="font-semibold text-foreground">{moves}</span>
          </div>
        </div>
        {allMatched && (
          <div className="text-emerald-300 text-sm font-semibold">✅ Completed!</div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
        {cards.map((c, idx) => {
          const isFaceUp = c.matched || flipped.includes(idx);
          return (
            <motion.button
              key={c.id}
              onClick={() => onFlip(idx)}
              whileHover={{ y: -2 }}
              className={
                "aspect-square rounded-2xl border bg-white/[0.03] text-xl flex items-center justify-center select-none"
              }
            >
              {isFaceUp ? c.face : "❔"}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="text-xs text-muted-foreground">
          Tip: Flip slowly—your brain loves patterns.
        </div>
        <button onClick={reset} className="glass rounded-full px-4 py-2 text-sm">
          Retry
        </button>
      </div>
    </div>
  );
}

function BalloonGame({ onExit }: { onExit: () => void }) {
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<{ id: number; x: number; c: string }[]>([]);
  useEffect(() => {
    const colors = [
      "bg-rose-400",
      "bg-cyan-400",
      "bg-amber-400",
      "bg-violet-400",
      "bg-emerald-400",
    ];
    const t = setInterval(() => {
      setBalloons((prev) =>
        [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 85,
            c: colors[Math.floor(Math.random() * 5)],
          },
        ].slice(-12),
      );
    }, 700);
    return () => clearInterval(t);
  }, []);
  const pop = (id: number) => {
    setBalloons((b) => b.filter((x) => x.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <div className="glass-strong rounded-3xl p-6 relative overflow-hidden min-h-[440px]">
      <button
        onClick={onExit}
        className="absolute top-4 right-4 text-sm text-muted-foreground z-10"
      >
        Close
      </button>
      <div className="text-sm text-muted-foreground">
        Popped: <span className="text-foreground font-semibold">{score}</span>
      </div>
      <div className="relative h-[380px]">
        {balloons.map((b) => (
          <motion.button
            key={b.id}
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: -40, opacity: 1 }}
            transition={{ duration: 6, ease: "linear" }}
            onClick={() => pop(b.id)}
            className={`absolute h-12 w-12 rounded-full ${b.c} shadow-lg`}
            style={{ left: `${b.x}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function ComingSoon({ onExit }: { onExit: () => void }) {
  return (
    <div className="glass-strong rounded-3xl p-10 text-center">
      <div className="text-4xl mb-3">🎮</div>
      <div className="text-lg font-semibold">Playable in the full app</div>
      <p className="text-muted-foreground text-sm mt-1">
        Try Breathing, Reaction Test, or Stress Balloon in the meantime.
      </p>
      <button onClick={onExit} className="mt-6 glass rounded-full px-4 py-2 text-sm">
        Back to games
      </button>
    </div>
  );
}
