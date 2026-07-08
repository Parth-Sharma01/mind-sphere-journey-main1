import { createFileRoute } from "@tanstack/react-router";
import { WelcomeSection } from "@/components/WelcomeSection";
import {
  EnhancedStat,
  MoodTodayCard,
  WellnessScoreCard,
  XPCard,
  FocusCard,
} from "@/components/EnhancedStats";
import { InteractiveMoodTimeline } from "@/components/InteractiveMoodTimeline";
import { InteractiveMindGalaxy } from "@/components/InteractiveMindGalaxy";
import { InteractiveDailyGoals } from "@/components/InteractiveDailyGoals";
import { EnhancedAchievements } from "@/components/EnhancedAchievements";
import { SmartRecommendations } from "@/components/SmartRecommendations";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard · MindSphere AI" }] }),
});

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <WelcomeSection />

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
