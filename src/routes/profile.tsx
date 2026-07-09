import { createFileRoute } from "@tanstack/react-router";
import { achievements, wellnessMetrics } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "Profile · MindSphere AI" }] }),
});

function Profile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Aditi Sharma",
    role: "Student",
    location: "Bengaluru",
    joinedLabel: "Joined Mar 2026",
  });
  return (
    <div className="space-y-6">
      <div className="glass-strong rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 grid place-items-center text-3xl">
          ✨
        </div>
        <div className="flex-1 text-center sm:text-left">
          {editing ? (
            <div className="space-y-3">
              <label className="block text-sm text-muted-foreground">Name</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                className="w-full glass rounded-2xl px-4 py-2 text-sm outline-none"
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-muted-foreground">Role</label>
                  <input
                    value={profile.role}
                    onChange={(e) => setProfile((p) => ({ ...p, role: e.target.value }))}
                    className="w-full glass rounded-2xl px-4 py-2 text-sm outline-none mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground">Location</label>
                  <input
                    value={profile.location}
                    onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                    className="w-full glass rounded-2xl px-4 py-2 text-sm outline-none mt-1"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  className="glass rounded-2xl px-4 py-2 text-sm"
                  onClick={() => setEditing(false)}
                >
                  Save
                </button>
                <button
                  className="glass rounded-2xl px-4 py-2 text-sm"
                  onClick={() => {
                    setProfile({
                      name: "Aditi Sharma",
                      role: "Student",
                      location: "Bengaluru",
                      joinedLabel: "Joined Mar 2026",
                    });
                    setEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">{profile.name}</h1>
              <div className="text-sm text-muted-foreground">
                {profile.role} · {profile.location} · {profile.joinedLabel}
              </div>
              <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="glass rounded-full px-3 py-1 text-xs">Level 7</span>
                <span className="glass rounded-full px-3 py-1 text-xs">1,240 XP</span>
                <span className="glass rounded-full px-3 py-1 text-xs">🔥 12-day streak</span>
                <span className="glass rounded-full px-3 py-1 text-xs">MindPlus</span>
              </div>
            </>
          )}
        </div>
        {!editing && (
          <button className="glass rounded-2xl px-4 py-2 text-sm" onClick={() => setEditing(true)}>
            Edit profile
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-3xl p-6">
          <div className="text-sm text-muted-foreground mb-4">Statistics</div>
          <div className="space-y-3">
            {wellnessMetrics.slice(0, 5).map((m) => (
              <div key={m.name}>
                <div className="flex justify-between text-sm">
                  <span>{m.name}</span>
                  <span className="text-muted-foreground">{m.value}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    className="h-full"
                    style={{ background: m.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <div className="text-sm text-muted-foreground mb-4">Badges</div>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((a) => (
              <motion.div
                key={a.id}
                whileHover={{ y: -2 }}
                className={`aspect-square rounded-2xl grid place-items-center text-3xl ${a.unlocked ? "glass" : "bg-white/[0.02] opacity-40"}`}
              >
                {a.icon}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
