import { createFileRoute } from '@tanstack/react-router';
import { GamesSection } from '@/components/GamesSection';

export const Route = createFileRoute('/games')({
  component: Games,
  head: () => ({ meta: [{ title: 'Mindful Games · MindSphere' }] }),
});

function Games() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <GamesSection />
      </div>
    </div>
  );
}
