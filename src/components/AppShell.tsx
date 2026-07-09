import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Home,
  ClipboardCheck,
  LayoutDashboard,
  HeartPulse,
  BookOpen,
  Gamepad2,
  Sparkles,
  Users,
  Tag,
  User,
  Settings,
  Menu,
  X,
  Headphones,
} from "lucide-react";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/mind-score", label: "Mind Score", icon: ClipboardCheck },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/melody-of-life", label: "MeLodY OfLife", icon: HeartPulse },
  { to: "/journal", label: "Journal", icon: BookOpen },
  { to: "/games", label: "Games", icon: Gamepad2 },
  { to: "/coach", label: "AI Coach", icon: Sparkles },
  { to: "/community", label: "Community", icon: Users },
  { to: "/pricing", label: "Pricing", icon: Tag },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-3xl animate-aurora" />
        <div
          className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-cyan-400/15 blur-3xl animate-aurora"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-3xl animate-aurora"
          style={{ animationDelay: "6s" }}
        />
      </div>

      {/* Top nav */}
      <header className="sticky top-0 z-40 px-4 py-3">
        <nav className="glass-strong mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 shadow-[0_0_20px_rgba(217,70,239,0.5)]" />
            <span className="font-semibold tracking-tight">MindSphere</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {nav.slice(0, 8).map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-1.5 rounded-full text-sm transition ${active ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5"
            >
              Pricing
            </Link>
            <Link
              to="/profile"
              className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 grid place-items-center text-xs font-semibold text-black"
            >
              A
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/5"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden glass-strong mx-auto mt-2 max-w-7xl rounded-2xl p-3 grid grid-cols-2 gap-1"
            >
              {nav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm ${active ? "bg-white/10" : "hover:bg-white/5"}`}
                  >
                    <Icon className="h-4 w-4" /> {item.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-white/5 mt-20 py-10 px-4">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-fuchsia-500 to-cyan-400" />
            <span>MindSphere AI · Play. Reflect. Understand. Heal.</span>
          </div>
          <div className="flex gap-6">
            <Link to="/pricing">Pricing</Link>
            <Link to="/community">Community</Link>
            <Link to="/settings">Settings</Link>
          </div>
          <span>© 2026 MindSphere</span>
        </div>
      </footer>
    </div>
  );
}
