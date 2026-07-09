import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTheme } from "@/components/AppShell";

export const Route = createFileRoute("/settings")({
  component: Settings,
  head: () => ({ meta: [{ title: "Settings · MindSphere AI" }] }),
});

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`h-6 w-11 rounded-full transition ${on ? "bg-fuchsia-500" : "bg-gray-200 dark:bg-white/15"} relative`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${on ? "left-5" : "left-0.5"}`}
      />
    </button>
  );
}

function Settings() {
  const { theme, setTheme } = useTheme();
  const [notif, setNotif] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  const [sounds, setSounds] = useState(true);

  const groups = [
    {
      title: "Appearance",
      items: [
        { label: "Dark mode", state: theme === "dark", set: (isDark: boolean) => setTheme(isDark ? 'dark' : 'light') },
        { label: "Ambient sounds", state: sounds, set: setSounds },
      ],
    },
    {
      title: "Notifications",
      items: [{ label: "Daily mood reminder", state: notif, set: setNotif }],
    },
    {
      title: "Privacy & Security",
      items: [{ label: "Anonymous mode in community", state: privacy, set: setPrivacy }],
    },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
      {groups.map((g) => (
        <div key={g.title} className="glass rounded-3xl p-6">
          <div className="text-sm text-muted-foreground mb-3">{g.title}</div>
          <div className="divide-y divide-white/5">
            {g.items.map((it) => (
              <div key={it.label} className="flex items-center justify-between py-3">
                <span className="text-sm">{it.label}</span>
                <Toggle on={it.state} onChange={it.set} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="glass rounded-3xl p-6">
        <div className="text-sm text-muted-foreground mb-3">Account</div>
        <div className="flex gap-3">
          <button className="glass rounded-2xl px-4 py-2 text-sm">Manage subscription</button>
          <button className="glass rounded-2xl px-4 py-2 text-sm">Export data</button>
          <button className="rounded-2xl px-4 py-2 text-sm bg-destructive/80 text-white">
            Sign out
          </button>
        </div>
      </div>
      <div className="text-xs text-muted-foreground text-center">
        MindSphere AI · v1.0.0 · Not a medical device
      </div>
    </div>
  );
}
