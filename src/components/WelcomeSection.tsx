import { motion } from "framer-motion";
import { Flame, Coins, TrendingUp } from "lucide-react";
import { CountUp } from "./AnimatedNumber";
import { userProfile, getLastLoginInfo, getMoodTrend } from "@/lib/mock-data";

export function WelcomeSection() {
  const lastLogin = getLastLoginInfo();
  const trend = getMoodTrend();
  const trendEmoji = trend === "up" ? "📈" : trend === "down" ? "📉" : "➡️";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Good evening, {userProfile.name} 👋</div>
          <h1 className="text-3xl font-semibold tracking-tight mt-1">Your mind, today.</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Welcome back! You're maintaining a powerful wellness journey. Keep going!
          </p>
        </div>
        <div className="flex gap-2">
          <Chip
            icon={<Flame className="h-3.5 w-3.5 text-orange-300" />}
            label={`${userProfile.currentStreak} day streak`}
            tooltip="Consecutive days of wellness activities"
          />
          <Chip
            icon={<Coins className="h-3.5 w-3.5 text-amber-300" />}
            label={`${userProfile.coins} coins`}
            tooltip="Earned through activities and achievements"
          />
          <Chip
            icon={<span>{trendEmoji}</span>}
            label={`Mood ${trend}`}
            tooltip={`Your mood has been ${trend} this week`}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        <div className="glass rounded-2xl p-3">
          <div className="text-muted-foreground">Last login</div>
          <div className="font-medium mt-1">{lastLogin}</div>
        </div>
        <div className="glass rounded-2xl p-3">
          <div className="text-muted-foreground">Daily Progress</div>
          <div className="font-medium mt-1 text-emerald-300">2/5 goals</div>
        </div>
        <div className="glass rounded-2xl p-3">
          <div className="text-muted-foreground">Total XP</div>
          <div className="font-medium mt-1">
            <CountUp end={userProfile.totalXP} duration={1} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Chip({
  icon,
  label,
  tooltip,
}: {
  icon: React.ReactNode;
  label: string;
  tooltip?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      title={tooltip}
      className="glass rounded-full px-3 py-1.5 text-xs flex items-center gap-1.5 cursor-help transition-colors hover:bg-white/10"
    >
      {icon}
      <span>{label}</span>
    </motion.div>
  );
}
