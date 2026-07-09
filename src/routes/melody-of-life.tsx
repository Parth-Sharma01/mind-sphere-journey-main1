import { createFileRoute } from "@tanstack/react-router";
import { MeLodyOfLifeSection } from "@/components/MeLodyOfLifeSection";

export const Route = createFileRoute("/melody-of-life")({
  component: MeLodyOfLife,
  head: () => ({ meta: [{ title: "MeLodY OfLife · MindSphere" }] }),
});

function MeLodyOfLife() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            MeLodY OfLife
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Your journey. Your why. Your true ambition. Let's explore what drives you and what you
            truly want to become.
          </p>
        </div>

        {/* Main Content */}
        <MeLodyOfLifeSection />

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>
            This information is saved securely to your browser and helps us personalize your
            experience.
          </p>
        </div>
      </div>
    </div>
  );
}
