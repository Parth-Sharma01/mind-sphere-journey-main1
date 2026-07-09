import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, CheckCircle } from 'lucide-react';
import {
  getUniqueAssessmentQuestions,
  calculateMentalScores,
  getDimensionInterpretation,
} from '@/lib/assessment-questions';
import { saveAssessmentResult } from '@/lib/storage-utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export const Route = createFileRoute('/mind-score')({
  component: MindScoreAssessment,
  head: () => ({ meta: [{ title: 'Mind Score Assessment · MindSphere' }] }),
});

type ViewMode = 'questions' | 'results';

interface DimensionScore {
  name: string;
  value: number;
  color: string;
  icon: string;
}

function MindScoreAssessment() {
  const [viewMode, setViewMode] = useState<ViewMode>('questions');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  // Initialize assessment
  useEffect(() => {
    const uniqueQuestions = getUniqueAssessmentQuestions();
    setQuestions(uniqueQuestions);
  }, []);

  const progress = useMemo(
    () => (questions.length > 0 ? (answers.length / questions.length) * 100 : 0),
    [answers, questions]
  );

  const isComplete = answers.length === questions.length;

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ((p) => p + 1), 250);
    } else {
      // Calculate scores
      const calculatedScores = calculateMentalScores(questions, newAnswers);
      setScores(calculatedScores);
      saveAssessmentResult(calculatedScores);
      setViewMode('results');
    }
  };

  const handleReset = () => {
    setViewMode('questions');
    setCurrentQ(0);
    setAnswers([]);
    setScores(null);
    const newQuestions = getUniqueAssessmentQuestions();
    setQuestions(newQuestions);
  };

  const dimensionScores: DimensionScore[] = useMemo(() => {
    if (!scores) return [];
    return [
      {
        name: 'Emotional Resilience',
        value: scores.emotional_resilience || 0,
        color: 'from-red-400 to-pink-500',
        icon: '💫',
      },
      {
        name: 'Focus & Clarity',
        value: scores.focus_clarity || 0,
        color: 'from-blue-400 to-cyan-500',
        icon: '🎯',
      },
      {
        name: 'Stress Balance',
        value: scores.stress_balance || 0,
        color: 'from-green-400 to-emerald-500',
        icon: '🌿',
      },
      {
        name: 'Social Harmony',
        value: scores.social_harmony || 0,
        color: 'from-purple-400 to-indigo-500',
        icon: '🤝',
      },
    ];
  }, [scores]);

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading assessment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {viewMode === 'questions' ? (
          <>
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Mind Score</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A scientifically-designed assessment measuring your emotional resilience, focus,
                stress balance, and social harmony.
              </p>
            </div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Question {answers.length + 1}/{questions.length}
                </span>
                <span className="text-sm font-medium text-purple-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </motion.div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 mb-6 border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
                    {questions[currentQ]?.question}
                  </h2>

                  <div className="space-y-3">
                    {questions[currentQ]?.options.map((option: string, idx: number) => (
                      <motion.button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        whileHover={{ scale: 1.02, x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 text-left rounded-lg border-2 border-gray-200 bg-white hover:border-purple-400 hover:bg-purple-50 transition-all font-medium text-gray-700"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-purple-600 font-bold">{String.fromCharCode(65 + idx)}.</span>
                          <span>{option}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center mt-8">
              <p className="text-sm text-gray-500">
                Your answers are saved automatically. Take your time.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Results View */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Mind Score Results</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Here's a comprehensive look at your mental wellbeing across four key dimensions.
                </p>
              </div>

              {/* Scores Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {dimensionScores.map((dim, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card
                      className={`p-6 border-2 bg-gradient-to-br ${dim.color} border-opacity-20 relative overflow-hidden`}
                    >
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{dim.name}</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{dim.value}/100</p>
                          </div>
                          <span className="text-4xl">{dim.icon}</span>
                        </div>
                        <Progress value={dim.value} className="h-2 mb-4" />
                        <p className="text-sm text-gray-700">
                          {getScoreLabel(dim.value)}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Detailed Interpretations */}
              <div className="space-y-6 mb-8">
                {dimensionScores.map((dim, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <Card className="p-6 border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">{dim.name}</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {getDimensionInterpretation(
                          dim.name
                            .toLowerCase()
                            .replace(/\s+/g, '_'),
                          dim.value
                        )}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="p-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Next Steps</h3>
                  <p className="text-gray-700 mb-6">
                    Explore your journey with our MeLodY OfLife section to set intentions based on
                    your assessment, or try our mindful games to practice focus and calm.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retake Assessment
                    </Button>
                    <Button
                      onClick={() => (window.location.href = '/melody-of-life')}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white gap-2"
                    >
                      Explore Your Path
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

function getScoreLabel(score: number): string {
  if (score < 35) return 'Needs attention and support';
  if (score < 55) return 'Developing, with room for growth';
  if (score < 75) return 'Good foundation, keep building';
  return 'Strong and healthy';
}
