import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowRight, TrendingUp, Brain, Target, Zap } from "lucide-react";
import { getAssessmentHistory } from "@/lib/storage-utils";
import { loadMelodyOfLifeData } from "@/lib/storage-utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export function EnhancedDashboard() {
  type AssessmentHistoryEntry = {
    scores: {
      emotional_resilience: number;
      focus_clarity: number;
      stress_balance: number;
      social_harmony: number;
    };
  };

  type MelodyOfLifeData = {
    examType?: string;
    preprationWhy?: string;
    trueAmbition?: string;
  };

  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentHistoryEntry[]>([]);
  const [melodyData, setMelodyData] = useState<MelodyOfLifeData | null>(null);
  const [latestScores, setLatestScores] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    const history = getAssessmentHistory();
    setAssessmentHistory(history);

    if (history.length > 0) {
      setLatestScores(history[history.length - 1].scores);
    }

    const melody = loadMelodyOfLifeData();
    if (melody) {
      setMelodyData(melody);
    }
  }, []);

  // Prepare chart data
  const chartData = assessmentHistory.slice(-10).map((entry, idx) => ({
    index: idx + 1,
    "Emotional Resilience": entry.scores.emotional_resilience,
    "Focus & Clarity": entry.scores.focus_clarity,
    "Stress Balance": entry.scores.stress_balance,
    "Social Harmony": entry.scores.social_harmony,
  }));

  const dimensionColors = {
    "Emotional Resilience": "#ef4444",
    "Focus & Clarity": "#3b82f6",
    "Stress Balance": "#10b981",
    "Social Harmony": "#a855f7",
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Wellness Dashboard</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your mental health journey and witness your growth over time.
        </p>
      </motion.div>

      {/* Latest Scores Summary */}
      {latestScores && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800">Your Latest Mind Score</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(latestScores).map(([key, value]) => {
                const formatted = key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                const getColor = (v: number) => {
                  if (v < 35) return "from-red-400 to-rose-500";
                  if (v < 55) return "from-yellow-400 to-orange-500";
                  if (v < 75) return "from-blue-400 to-cyan-500";
                  return "from-green-400 to-emerald-500";
                };

                return (
                  <motion.div
                    key={key}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`bg-gradient-to-br ${getColor(value)} rounded-lg p-4 text-white shadow-lg`}
                  >
                    <p className="text-sm opacity-90 mb-2">{formatted}</p>
                    <p className="text-3xl font-bold">{value}</p>
                  </motion.div>
                );
              })}
            </div>

            <Link
              to="/mind-score"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Retake Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>
        </motion.div>
      )}

      {/* Progress Chart */}
      {chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Score Progression</h2>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Emotional Resilience"
                  stroke={dimensionColors["Emotional Resilience"]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Focus & Clarity"
                  stroke={dimensionColors["Focus & Clarity"]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Stress Balance"
                  stroke={dimensionColors["Stress Balance"]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Social Harmony"
                  stroke={dimensionColors["Social Harmony"]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      )}

      {/* MeLodY OfLife Summary */}
      {melodyData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-pink-600" />
              <h2 className="text-2xl font-bold text-gray-800">Your Path</h2>
            </div>

            <div className="space-y-4">
              {melodyData.examType && melodyData.examType !== "None" && (
                <div>
                  <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Preparation</p>
                  <p className="text-lg font-semibold text-gray-800">{melodyData.examType}</p>
                </div>
              )}

              {melodyData.preprationWhy && (
                <div>
                  <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Your Why</p>
                  <p className="text-base text-gray-700 italic">"{melodyData.preprationWhy}"</p>
                </div>
              )}

              {melodyData.trueAmbition && (
                <div>
                  <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">
                    Your Ambition
                  </p>
                  <p className="text-base text-gray-700">"{melodyData.trueAmbition}"</p>
                </div>
              )}
            </div>

            <Link
              to="/melody-of-life"
              className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Update Your Journey <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>
        </motion.div>
      )}

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-8 border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Access</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Link
              to="/mind-score"
              className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:shadow-lg transition-all group"
            >
              <Brain className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-800 mb-1">Mind Score</h3>
              <p className="text-sm text-gray-600">Take the assessment</p>
            </Link>

            <Link
              to="/melody-of-life"
              className="p-6 rounded-lg bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 hover:shadow-lg transition-all group"
            >
              <Target className="w-8 h-8 text-pink-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-800 mb-1">MeLodY OfLife</h3>
              <p className="text-sm text-gray-600">Explore your path</p>
            </Link>

            <Link
              to="/games"
              className="p-6 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 hover:shadow-lg transition-all group"
            >
              <Zap className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-800 mb-1">Mindful Games</h3>
              <p className="text-sm text-gray-600">Play & practice focus</p>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Motivation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
          <h2 className="text-2xl font-bold mb-4">Remember</h2>
          <p className="text-lg leading-relaxed opacity-95">
            "Every score is a snapshot, not a sentence. What matters most is the direction you're
            heading. Be patient with yourself. Your mental health is a journey, not a destination."
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
