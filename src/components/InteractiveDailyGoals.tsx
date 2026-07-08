import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { CountUp } from "./AnimatedNumber";
import { useWellnessState } from "@/hooks/useWellnessState";

export function InteractiveDailyGoals() {
  const { state, toggleGoal, getXPEarned, getProgress } = useWellnessState();

  const handleToggleGoal = (goalId: number) => {
    toggleGoal(goalId);
  };

  const progressPercent = getProgress();
  const xpEarned = getXPEarned();
  const completed = state.dailyGoals.filter((g) => g.done).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-3xl p-6"
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-sm text-muted-foreground">Daily Goals</div>
            <div className="font-medium mt-0.5">
              {completed}/{state.dailyGoals.length} completed
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-emerald-300">
              <CountUp end={xpEarned} duration={1} suffix=" XP" />
            </div>
            <div className="text-xs text-muted-foreground">earned today</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        {state.dailyGoals.map((goal, index) => (
          <motion.button
            key={goal.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleToggleGoal(goal.id)}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition group"
          >
            <div className="flex items-center gap-3 flex-1 text-left">
              <motion.div
                animate={{
                  scale: goal.done ? [1, 1.2, 1] : 1,
                  rotate: goal.done ? [0, 360] : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`h-5 w-5 rounded-full border-2 flex-shrink-0 grid place-items-center transition ${
                  goal.done
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-white/20 group-hover:border-white/40"
                }`}
              >
                {goal.done && <span className="text-[10px] text-black">✓</span>}
              </motion.div>
              <div className="min-w-0">
                <div
                  className={`text-sm transition ${goal.done ? "text-muted-foreground line-through" : ""}`}
                >
                  {goal.emoji} {goal.title}
                </div>
                <div className="text-xs text-muted-foreground">{goal.description}</div>
              </div>
            </div>
            <motion.div
              animate={{ scale: goal.done ? 1.1 : 1 }}
              className={`text-xs font-medium flex-shrink-0 ml-2 ${goal.done ? "text-emerald-300" : "text-muted-foreground"}`}
            >
              +{goal.xp} XP
            </motion.div>
          </motion.button>
        ))}
      </div>

      {progressPercent === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30"
        >
          <p className="text-xs text-emerald-300 font-medium">
            ✨ Amazing! All goals completed. Your streak grows stronger!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
