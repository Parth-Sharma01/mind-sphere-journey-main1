import { createFileRoute } from "@tanstack/react-router";
import { EnhancedDashboard } from "@/components/EnhancedDashboard";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard · MindSphere" }] }),
});

function Dashboard() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        <EnhancedDashboard />
      </div>
    </div>
  );
}

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MoodTodayCard />
        <WellnessScoreCard />
        <XPCard />
        <FocusCard />
      </div>

      {/* Mood Timeline and Mind Galaxy */}
      <div className="grid lg:grid-cols-3 gap-4">
        <InteractiveMoodTimeline />
        <InteractiveMindGalaxy />
      </div>

      {/* Daily Goals, Achievements, Recommendations */}
      <div className="grid lg:grid-cols-3 gap-4">
        <InteractiveDailyGoals />
        <EnhancedAchievements />
        <SmartRecommendations />
      </div>
    </div>
  );
}

