import { motion } from "framer-motion";
import { detailedAchievements } from "@/lib/mock-data";

export function EnhancedAchievements() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-3xl p-6"
    >
      <div className="text-sm text-muted-foreground mb-4">Achievements</div>
      <div className="grid grid-cols-3 gap-3">
        {detailedAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -2, scale: 1.05 }}
            className="group relative"
          >
            <div
              className={`aspect-square rounded-2xl grid place-items-center text-3xl transition ${
                achievement.unlocked ? "glass" : "bg-white/[0.02] opacity-40 group-hover:opacity-60"
              }`}
            >
              {achievement.icon}
            </div>

            {/* Tooltip on hover */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 rounded-lg glass text-xs text-center whitespace-nowrap pointer-events-none"
            >
              <p className="font-medium">{achievement.title}</p>
              <p className="text-muted-foreground text-[10px]">
                {achievement.progress}/{achievement.target}
              </p>
            </motion.div>

            {/* Progress ring for locked achievements */}
            {!achievement.unlocked && (
              <motion.div
                initial={{ rotate: -90 }}
                animate={{ rotate: 270 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `conic-gradient(
                    from 0deg,
                    oklch(0.5 0.2 280) ${(achievement.progress / achievement.target) * 360}deg,
                    transparent ${(achievement.progress / achievement.target) * 360}deg
                  )`,
                  opacity: 0.3,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Achievement details on hover */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        whileHover={{ opacity: 1, height: "auto" }}
        className="mt-4 pt-4 border-t border-white/10 overflow-hidden"
      >
        <div className="space-y-2">
          {detailedAchievements
            .filter((a) => a.unlocked)
            .slice(0, 3)
            .map((a) => (
              <div key={a.id} className="text-xs">
                <div className="font-medium text-emerald-300">✓ {a.title}</div>
                <p className="text-muted-foreground">{a.desc}</p>
              </div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
