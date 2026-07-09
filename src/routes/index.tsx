import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  ClipboardCheck,
  Gamepad2,
  HeartPulse,
  LineChart,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PremiumHeroSection } from "@/components/PremiumHeroSection";

function HomeIndex() {
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

  return (
    <div className="space-y-32">
      {/* Hero */}
      <PremiumHeroSection />

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
              className="bg-white/30 backdrop-blur-md border border-gray-200/80 dark:glass rounded-3xl p-6 hover:bg-white/50 dark:hover:bg-white/[0.07] transition"
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
      <section className="bg-gray-200/30 backdrop-blur-lg border border-gray-300/50 dark:glass-strong rounded-[2rem] p-10 sm:p-16 text-center relative overflow-hidden">
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

export const Route = createFileRoute("/")({
  component: HomeIndex,
});
