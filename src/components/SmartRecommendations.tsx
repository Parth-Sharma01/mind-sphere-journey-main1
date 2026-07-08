import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { getSmartRecommendations } from "@/lib/mock-data";

export function SmartRecommendations() {
  const recs = getSmartRecommendations();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/30 bg-red-500/5";
      case "medium":
        return "border-yellow-500/30 bg-yellow-500/5";
      default:
        return "border-emerald-500/30 bg-emerald-500/5";
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-emerald-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass rounded-3xl p-6"
    >
      <div className="text-sm text-muted-foreground mb-4">Recommended for You</div>
      <div className="space-y-3">
        {recs.length > 0 ? (
          recs.slice(0, 3).map((rec, index) => (
            <Link
              key={index}
              to={rec.link}
              className={`flex items-start gap-3 p-3 rounded-xl transition border ${getPriorityColor(rec.priority)} hover:bg-white/[0.08] group`}
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className={`h-2 w-2 rounded-full ${getPriorityDot(rec.priority)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium group-hover:text-foreground">
                  {rec.emoji} {rec.title}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{rec.description}</p>
                <p className="text-xs text-muted-foreground mt-1 italic">
                  Because: {rec.reason.replace(/_/g, " ")}
                </p>
              </div>
              <div className="text-lg opacity-0 group-hover:opacity-100 transition">→</div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground text-xs">
            <p>Great job! All your wellness metrics are looking good.</p>
            <p className="mt-1">Explore more activities to continue building habits.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
