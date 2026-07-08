import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { aiSuggestions } from "@/lib/mock-data";
import { Mic, Send, Sparkles } from "lucide-react";

export const Route = createFileRoute("/coach")({
  component: Coach,
  head: () => ({ meta: [{ title: "AI Coach · MindSphere AI" }] }),
});

type Msg = { id: number; role: "user" | "ai"; text: string };

const seed: Msg[] = [
  {
    id: 1,
    role: "ai",
    text: "Hi Aditi. I'm Sphere — your wellness companion. What's alive for you right now?",
  },
];

const canned = [
  "That's completely understandable. Let's take three slow breaths together — inhale for 4, hold 4, exhale 6. Ready?",
  "Here's a tiny plan for today: 20 min focused study, 5 min walk, then something you love for 15 min. Try it?",
  "Your affirmation for today: You are allowed to move slowly and still be moving forward.",
  "Let's write it out. What's the one thing weighing heaviest? We'll break it into three softer steps.",
  "Sleep loves rhythm. Try dimming lights an hour before bed and no screens the last 20 minutes. Small change, big shift.",
];

function Coach() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const u: Msg = { id: Date.now(), role: "user", text };
    setMessages((m) => [...m, u]);
    setInput("");
    setTyping(true);
    setTimeout(
      () => {
        const reply = canned[Math.floor(Math.random() * canned.length)];
        setMessages((m) => [...m, { id: Date.now() + 1, role: "ai", text: reply }]);
        setTyping(false);
      },
      900 + Math.random() * 700,
    );
  };

  return (
    <div className="grid lg:grid-cols-[1fr_280px] gap-6">
      <div className="glass-strong rounded-3xl flex flex-col h-[70vh]">
        <div className="flex items-center gap-3 p-5 border-b border-white/5">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 grid place-items-center">
            <Sparkles className="h-4 w-4 text-black" />
          </div>
          <div>
            <div className="font-semibold text-sm">Sphere</div>
            <div className="text-xs text-muted-foreground">
              Your AI wellness coach · always kind
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-fuchsia-500 text-black" : "glass"}`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="glass rounded-2xl px-4 py-3 flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                      className="h-1.5 w-1.5 rounded-full bg-white/60"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottom} />
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex flex-wrap gap-2 mb-3">
            {aiSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="glass rounded-full px-3 py-1 text-xs hover:bg-white/10"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="glass rounded-2xl flex items-center gap-2 px-3 py-2"
          >
            <button type="button" className="p-1.5 rounded-lg hover:bg-white/10">
              <Mic className="h-4 w-4" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Talk to Sphere…"
              className="flex-1 bg-transparent outline-none text-sm py-1.5"
            />
            <button type="submit" className="p-2 rounded-xl bg-white text-black">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-4">
        <div className="glass rounded-3xl p-5">
          <div className="text-xs text-muted-foreground">Today's affirmation</div>
          <div className="mt-2 text-sm leading-relaxed">
            "Slow is also progress. My pace is my own."
          </div>
        </div>
        <div className="glass rounded-3xl p-5">
          <div className="text-xs text-muted-foreground">Suggested plan</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>🌅 5-min breathing</li>
            <li>📚 25-min focus block</li>
            <li>🚶 Walk between classes</li>
            <li>📖 3-line gratitude entry</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
