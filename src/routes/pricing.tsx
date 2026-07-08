import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
  head: () => ({ meta: [{ title: "Pricing · MindSphere AI" }] }),
});

const tiers = [
  {
    name: "MindLite",
    monthly: 30,
    yearly: 300,
    features: [
      "Daily mood tracking",
      "Basic assessments",
      "Community access",
      "1 AI chat / day",
      "Weekly report",
    ],
  },
  {
    name: "MindPlus",
    monthly: 150,
    yearly: 1500,
    popular: true,
    features: [
      "Everything in Lite",
      "Unlimited AI chats",
      "Meditation library",
      "Focus mode",
      "Advanced reports",
      "Journal insights",
      "Burnout tracking",
    ],
  },
  {
    name: "MindSphere Premium",
    monthly: 999 / 12,
    yearly: 999,
    features: [
      "Everything in Plus",
      "Exclusive themes",
      "Family sharing",
      "Annual deep report",
      "Premium achievements",
      "Priority support",
      "Feature previews",
    ],
  },
];

function Pricing() {
  const [yr, setYr] = useState(false);
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Pick your pace.</h1>
        <p className="mt-3 text-muted-foreground">
          All plans include the assessment, mood tracker, and community.
        </p>
        <div className="mt-6 inline-flex glass rounded-full p-1 text-sm">
          <button
            onClick={() => setYr(false)}
            className={`px-4 py-1.5 rounded-full ${!yr ? "bg-white text-black" : ""}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setYr(true)}
            className={`px-4 py-1.5 rounded-full ${yr ? "bg-white text-black" : ""}`}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -6 }}
            className={`relative rounded-3xl p-8 ${t.popular ? "glass-strong ring-1 ring-fuchsia-500/40 shadow-[0_0_60px_rgba(217,70,239,0.25)]" : "glass"}`}
          >
            {t.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black text-xs font-medium px-3 py-1">
                Most popular
              </div>
            )}
            <div className="text-sm text-muted-foreground">{t.name}</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-semibold">
                ₹{Math.round(yr ? t.yearly / 12 : t.monthly)}
              </span>
              <span className="text-sm text-muted-foreground">/mo</span>
            </div>
            {yr && <div className="text-xs text-emerald-300 mt-1">Billed ₹{t.yearly}/year</div>}
            <ul className="mt-6 space-y-2 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="h-4 w-4 text-fuchsia-300 shrink-0 mt-0.5" /> <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              className={`mt-8 w-full rounded-2xl py-3 text-sm font-medium ${t.popular ? "bg-white text-black" : "glass hover:bg-white/10"}`}
            >
              Choose {t.name}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
