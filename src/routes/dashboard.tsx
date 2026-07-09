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
