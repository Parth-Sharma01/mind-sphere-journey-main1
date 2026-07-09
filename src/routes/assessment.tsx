import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { assessmentQuestions, radarData } from "@/lib/mock-data";
import { ArrowRight, RotateCcw, Sparkles, Trophy } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/assessment")({
  component: Assessment,
  head: () => ({ meta: [{ title: "Assessment · MindSphere AI" }] }),
});

function Assessment() {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const total = assessmentQuestions.length;
  const progress = (answers.length / total) * 100;
  const done = answers.length >= total;

  const xp = answers.length * 10;
  const level = Math.floor(xp / 100) + 1;

  const q = assessmentQuestions[i];

  const choose = (idx: number) => {
    setAnswers((prev) => [...prev, idx]);
    setTimeout(() => setI((v) => Math.min(v + 1, total - 1)), 250);
  };

  const reset = () => {
    setAnswers([]);
    setI(0);
  };

  const summary = useMemo(() => {
    // random-ish but stable-looking summary
    const s = answers.reduce((a, b) => a + b, 0);
    const seed = (n: number) => 45 + ((s * 7 + n * 13) % 55);
    return radarData.map((d, k) => ({ ...d, A: seed(k) }));
  }, [answers]);

  const rangeFor = (value: number) => {
    // value is 0-100
    if (value < 35) return { label: "Cautious", color: "border-rose-500/30 bg-rose-500/5" };
    if (value < 55) return { label: "Getting steadier", color: "border-yellow-500/30 bg-yellow-500/5" };
    if (value < 75) return { label: "Good progress", color: "border-emerald-500/30 bg-emerald-500/5" };
    if (value < 90) return { label: "Strong", color: "border-cyan-500/30 bg-cyan-500/5" };
    return { label: "Excellent", color: "border-fuchsia-500/30 bg-fuchsia-500/5" };
  };

  const guidanceContent: Record<string, {
    meaning: (v: number) => string;
    today: (v: number) => string[];
    caution?: (v: number) => string | undefined;
  }> = {
    Mood: {
      meaning: (v) =>
        v < 35
          ? "Your mood is likely heavier right now. That doesn’t mean you’re stuck — it means you need support."
          : v < 55
            ? "Your mood is mixed. Some moments are okay, others feel harder."
            : v < 75
              ? "Your mood is leaning positive. You’re more resilient than you think."
              : "Your mood is strong. Ride it gently, and keep things balanced.",
      today: (v) => v < 55 ? ["Do a 2-minute reset (slow breathing)", "Pick one small kind action (text a friend / drink water)", "Write: 'What helped even 1%?'" ] : ["Keep one habit consistent", "Add a short joy moment (music / sunshine)", "Avoid overloading today — protect your energy"],
      caution: (v) =>
        v < 35
          ? "If you feel unsafe or overwhelmed, reach out immediately to someone you trust or a local professional for urgent support."
          : undefined,
    },
    Stress: {
      meaning: (v) =>
        v < 35
          ? "Stress looks low — nice. That usually means your mind can recover easily."
          : v < 55
            ? "Stress seems moderate. You might feel 'on' more than usual."
            : v < 75
              ? "Stress is present but manageable."
              : "Stress looks high right now. Your body may be asking for a pause.",
      today: (v) =>
        v < 55
          ? ["Try a 5-minute breathing reset", "Stand up + stretch 60 seconds", "Plan one low-pressure block"]
          : ["Do a 3-minute 'downshift' (inhale 4, exhale 6)", "Reduce screen/notifications for 30 minutes", "Ask for one small help (even a quick check-in)"] ,
      caution: (v) =>
        v >= 75
          ? "Need immediate help? If your stress feels unbearable or you feel unsafe, contact local emergency services or a trusted person/professional right now."
          : undefined,
    },
    Focus: {
      meaning: (v) =>
        v < 35
          ? "Focus is likely scattered. It’s okay — we’ll work with your current bandwidth."
          : v < 55
            ? "Your attention is working, but it may break often."
            : v < 75
              ? "Good focus baseline. With the right structure, you can do a lot."
              : "Strong focus. You can enter a productive flow faster than usual.",
      today: (v) =>
        v < 55
          ? ["Use a 10–15 minute timer (one task only)", "Clear your desk/phone distractions", "Take a 2-minute break after timer ends"]
          : ["Do one deep work block (25–35 min)", "Turn on 'Do Not Disturb'", "Start with the easiest step first"],
    },
    Sleep: {
      meaning: (v) =>
        v < 35
          ? "Sleep quality looks low. This can make stress and focus harder tomorrow."
          : v < 55
            ? "Sleep is okay, but not fully restorative."
            : v < 75
              ? "Sleep quality is decent."
              : "Sleep quality is strong. Great recovery window.",
      today: (v) =>
        v < 75
          ? ["Dim lights 60 minutes before bed", "Avoid screens last 20 minutes", "If you can’t sleep: try calm breathing for 5 minutes"]
          : ["Keep a consistent bedtime tonight", "Short wind-down (5–10 min)", "Hydrate earlier, not right before bed"],
    },
    Energy: {
      meaning: (v) =>
        v < 35
          ? "Energy is low today. That’s a signal to pace, not push."
          : v < 55
            ? "Your energy is inconsistent."
            : v < 75
              ? "Energy is moderate — you can get things done with breaks."
              : "Energy is strong. Use it wisely.",
      today: (v) =>
        v < 55
          ? ["Pick one 'must-do' only", "Short walk (5–10 minutes)", "Eat something simple + water"]
          : ["Do the hardest thing first", "Schedule a break before you 'feel tired'", "Keep evenings lighter"],
    },
    Motivation: {
      meaning: (v) =>
        v < 35
          ? "Motivation is low — this is normal when life feels heavy."
          : v < 55
            ? "Motivation is there, but small and fragile."
            : v < 75
              ? "Motivation is steady."
              : "High motivation. Great time to build momentum.",
      today: (v) =>
        v < 55
          ? ["Set a tiny goal (2-minute start)", "Reward yourself immediately after starting", "Choose 'good enough' over perfect"]
          : ["Plan 3 steps max", "Batch similar tasks", "Start early to reduce mental load"],
    },
    Confidence: {
      meaning: (v) =>
        v < 35
          ? "Confidence feels shaky. You may doubt yourself more than you need to."
          : v < 55
            ? "Confidence is mixed."
            : v < 75
              ? "Confidence is okay."
              : "Confidence is strong.",
      today: (v) =>
        v < 55
          ? ["Talk to yourself like a friend (1 kind sentence)", "Write: 'I’ve handled harder weeks'", "Do one small action to prove progress"]
          : ["Commit to a simple next step", "Keep expectations realistic", "Celebrate effort, not just outcomes"],
    },
    Relationships: {
      meaning: (v) =>
        v < 35
          ? "You might feel disconnected right now."
          : v < 55
            ? "Some connections feel okay, others feel distant."
            : v < 75
              ? "Relationships look supportive overall."
              : "You likely feel connected and understood.",
      today: (v) =>
        v < 75
          ? ["Message one person (short + honest)", "Try a 10-minute chat or call", "Join a small community moment (if possible)"]
          : ["Share one win with someone", "Make plans for next week", "Offer support back — connection grows both ways"],
    },
  };

  const guidanceFor = (subject: string, value: number) => {
    const content = guidanceContent[subject];
    if (!content) {
      return {
        meaning: "You’re building consistency. Keep your routine simple and repeatable.",
        today: ["Keep it simple today."],
        caution: undefined,
      };
    }
    return {
      meaning: content.meaning(value),
      today: content.today(value),
      caution: content.caution ? content.caution(value) : undefined,
    };
  };

  const overallScore = Math.round(
    summary.reduce((sum, m) => sum + m.A, 0) / Math.max(1, summary.length),
  );
  const overallRange = rangeFor(overallScore);

  const downloadReport = () => {
    const lines: string[] = [];
    lines.push("MindSphere AI — Wellness Report");
    lines.push(`Generated: ${new Date().toLocaleString()}`);
    lines.push("");
    lines.push(`Overall: ${overallScore}/100 (${overallRange.label})`);
    lines.push(`XP: +${xp} | Level: ${level}`);
    lines.push("");
    for (const m of summary) {
      const g = guidanceFor(m.subject, m.A);
      lines.push(`${m.subject}: ${m.A}/100 (${rangeFor(m.A).label})`);
      lines.push(`Meaning: ${g.meaning}`); // This line will now use the refactored function
      lines.push("Do today:");
      for (const t of g.today) lines.push(`- ${t}`);
      if (g.caution) lines.push(`Safety note: ${g.caution}`);
      lines.push("");
    }
    lines.push("Important: This report is educational and not a medical or mental health diagnosis.");

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MindSphere_Wellness_Report_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  if (done) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-strong rounded-3xl p-8 text-center"
        >
          <Trophy className="mx-auto h-10 w-10 text-amber-300" />
          <h1 className="mt-4 text-3xl font-semibold">Your Wellness Report</h1>
          <p className="mt-2 text-muted-foreground">
            A friendly, educational snapshot of how you're doing right now. Not a diagnosis — a mirror.
          </p>
          <div className="mt-4 inline-flex gap-3 flex-wrap justify-center">
            <span className="glass rounded-full px-3 py-1 text-xs">+{xp} XP</span>
            <span className="glass rounded-full px-3 py-1 text-xs">Level {level}</span>
            <span className="glass rounded-full px-3 py-1 text-xs">Achievement: Self-Aware 🌱</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass rounded-3xl p-6 h-[360px]">
            <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground mb-2">
              <span>Mind Snapshot</span>
              <span className={`border px-3 py-1 rounded-full text-xs ${overallRange.color}`}
              >
                Overall: {overallScore}/100
              </span>
            </div>
            <ResponsiveContainer width="100%" height="90%">
              <RadarChart data={summary}>
                <PolarGrid stroke="oklch(1 0 0 / 0.15)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "oklch(0.85 0 0)", fontSize: 12 }} />
                <PolarRadiusAxis stroke="oklch(1 0 0 / 0.1)" tick={false} />
                <Radar dataKey="A" stroke="#d946ef" fill="#d946ef" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {summary.slice(0, 6).map((m) => {
              const r = rangeFor(m.A);
              return (
                <div key={m.subject} className={`glass rounded-2xl p-4 border ${r.color.replace("border-", "border-")}`.trim()}>
                  <div className="text-[11px] text-muted-foreground">{m.subject}</div>
                  <div className="mt-1 text-2xl font-semibold">{m.A}</div>
                  <div className="mt-2 text-[11px] opacity-80">{r.label}</div>
                  <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.A}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-400"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" /> What this means (plain language)
          </div>
          <p className="mt-3 text-lg">
            Your overall range is <span className="font-semibold">{overallRange.label}</span>. This likely means your habits are
            {overallScore < 55 ? " building stability" : " ready for momentum"}, with small daily support steps helping most.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Educational note: if you feel unsafe or in urgent danger, contact local emergency services or a trusted professional immediately.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {summary.map((m) => {
            const g = guidanceFor(m.subject, m.A);
            const r = rangeFor(m.A);
            return (
              <div key={m.subject} className={`glass rounded-3xl p-6 border ${r.color}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-muted-foreground">{m.subject}</div>
                    <div className="mt-1 text-2xl font-semibold">
                      {m.A} <span className="text-sm font-normal">/ 100</span>
                    </div>
                    <div className="mt-1 text-xs">Range: {r.label}</div>
                  </div>
                </div>
                <div className="mt-4 text-sm leading-relaxed">{g.meaning}</div>
                <div className="mt-4">
                  <div className="text-xs text-muted-foreground">What to do today</div>
                  <ul className="mt-2 space-y-2 text-sm list-disc pl-5">
                    {g.today.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
                {g.caution && (
                  <div className="mt-4 rounded-2xl bg-white/5 border border-rose-500/30 p-3 text-xs text-rose-200">
                    <span className="font-semibold">Safety / support:</span> {g.caution}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <button
            onClick={downloadReport}
            className="flex items-center justify-center gap-2 glass rounded-full px-5 py-2 text-sm"
          >
            <span aria-hidden>⬇️</span> Download report
          </button>
          <button
            onClick={reset}
            className="mx-auto flex items-center justify-center gap-2 glass rounded-full px-5 py-2 text-sm"
          >
            <RotateCcw className="h-4 w-4" /> Retake assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Question {answers.length + 1} of {total}
        </span>
        <span>
          +{xp} XP · Lvl {level}
        </span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="glass-strong rounded-3xl p-8 mt-8"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">{q.q}</h2>
          <div className="mt-6 grid gap-3">
            {q.options.map((o, k) => (
              <motion.button
                key={k}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => choose(k)}
                className="glass rounded-2xl px-5 py-4 text-left hover:bg-white/10 transition flex items-center justify-between"
              >
                <span className="text-base">{o}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
