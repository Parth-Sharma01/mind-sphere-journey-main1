import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

// --- 1. Define Wellness Dimensions & Questions ---

const wellnessDimensions = {
  emotionalRegulation: "Emotional Regulation",
  socialConnection: "Social Connection",
  stressManagement: "Stress Management",
  selfEsteem: "Self-Esteem",
  mindfulness: "Mindfulness",
  purpose: "Purpose & Meaning",
  physicalWellbeing: "Physical Well-being",
  cognitiveFocus: "Cognitive Focus",
};

type DimensionKey = keyof typeof wellnessDimensions;

const assessmentQuestions = [
  {
    question: "When facing a setback, how often do you feel you can manage your emotions?",
    dimension: "emotionalRegulation" as DimensionKey,
  },
  {
    question: "How connected and supported do you feel by the people in your life?",
    dimension: "socialConnection" as DimensionKey,
  },
  {
    question: "How effectively can you relax and de-stress after a challenging day?",
    dimension: "stressManagement" as DimensionKey,
  },
  {
    question: "How often do you feel confident in your own abilities and worth?",
    dimension: "selfEsteem" as DimensionKey,
  },
  {
    question: "How often do you find yourself present and engaged in the current moment?",
    dimension: "mindfulness" as DimensionKey,
  },
  {
    question: "How clear is your sense of direction or purpose in your daily life?",
    dimension: "purpose" as DimensionKey,
  },
  {
    question: "How satisfied are you with your current sleep quality and energy levels?",
    dimension: "physicalWellbeing" as DimensionKey,
  },
  {
    question: "How easily can you concentrate on a single task without getting distracted?",
    dimension: "cognitiveFocus" as DimensionKey,
  },
];

const answerOptions = [
  { text: "Rarely", value: 1 },
  { text: "Sometimes", value: 2 },
  { text: "Often", value: 3 },
  { text: "Usually", value: 4 },
  { text: "Almost Always", value: 5 },
];

// --- 2. Scoring Algorithm & Analysis ---

interface AnalysisResult {
  overallScore: number;
  dimensionalScores: { dimension: string; score: number }[];
  detailedAnalysis: { dimension: string; insight: string }[];
  chartData: { dimension: string; score: number }[];
}

function getInsightForScore(dimension: string, score: number): string {
  const lowScoreInsights: Record<DimensionKey, string> = {
    emotionalRegulation: "You may find emotions overwhelming at times. Exploring techniques to observe and name your feelings could be a gentle first step.",
    socialConnection: "It seems like you might be feeling a bit isolated. Small acts of connection, even a brief chat, can start to rebuild that sense of belonging.",
    stressManagement: "Stress appears to be taking a significant toll. Integrating short, 5-minute relaxation exercises into your day could offer moments of relief.",
    selfEsteem: "Your confidence might be fluctuating. It can be helpful to acknowledge one small achievement each day, no matter how minor it seems.",
    mindfulness: "It sounds like your mind is often busy with the past or future. Practicing simple grounding techniques, like focusing on your breath, can help anchor you in the present.",
    purpose: "You may be searching for a clearer sense of direction. Reflecting on activities that genuinely spark your interest could reveal clues about your path.",
    physicalWellbeing: "Your body's core needs, like sleep and energy, might not be fully met. Prioritizing a consistent sleep schedule could be highly beneficial.",
    cognitiveFocus: "Concentration seems to be a challenge right now. The 'Pomodoro Technique' (25 mins on, 5 mins off) can be a great way to train your focus muscle.",
  };

  const midScoreInsights: Record<DimensionKey, string> = {
    emotionalRegulation: "You have a foundational ability to manage emotions, though some situations are tougher than others. Identifying specific triggers could be the next step.",
    socialConnection: "You have some supportive connections, but there's room for more depth. Consider investing a little more time in the relationships that energize you.",
    stressManagement: "You have some coping strategies for stress, but they may not always be enough. Expanding your toolkit of relaxation techniques could provide more resilience.",
    selfEsteem: "Your self-worth is present but can be shaken. Building a habit of positive self-talk can help strengthen your inner foundation.",
    mindfulness: "You experience moments of presence, but also periods of distraction. A brief daily mindfulness practice could help make that presence more consistent.",
    purpose: "You have a general sense of what's important to you, but it could be clearer. Journaling about your values might bring more clarity.",
    physicalWellbeing: "You're taking some steps to care for your physical health. Fine-tuning your routine, perhaps with nutrition or exercise, could boost your vitality.",
    cognitiveFocus: "You can focus when needed, but it requires effort. Minimizing digital distractions during work periods can help conserve your mental energy.",
  };

  const highScoreInsights: Record<DimensionKey, string> = {
    emotionalRegulation: "You show strong emotional resilience and awareness. Continue to trust your ability to navigate your feelings with grace.",
    socialConnection: "You've cultivated a strong and supportive social network. Nurturing these bonds continues to be a source of strength.",
    stressManagement: "You have effective and healthy strategies for managing stress. Sharing these techniques with others could even reinforce your own practice.",
    selfEsteem: "You have a solid sense of self-worth and confidence. This is a powerful asset for navigating life's challenges.",
    mindfulness: "You demonstrate a strong ability to remain present and engaged. Your awareness is a skill that enhances all areas of your life.",
    purpose: "You are guided by a clear sense of purpose and meaning. This provides you with motivation and direction.",
    physicalWellbeing: "You are highly in-tune with your body's needs and actively support your physical health. This is the foundation of your overall wellness.",
    cognitiveFocus: "You possess a strong ability to direct your attention and concentrate. This allows you to engage deeply and effectively with your tasks.",
  };

  if (score <= 2) return lowScoreInsights[dimension as DimensionKey];
  if (score <= 3.5) return midScoreInsights[dimension as DimensionKey];
  return highScoreInsights[dimension as DimensionKey];
}

function analyzeResponses(responses: { [key: number]: number }): AnalysisResult {
  const dimensionalScores: { [key in DimensionKey]: { total: number; count: number } } = Object.keys(wellnessDimensions).reduce((acc, key) => ({ ...acc, [key]: { total: 0, count: 0 } }), {} as any);

  assessmentQuestions.forEach((q, index) => {
    const score = responses[index] || 0;
    dimensionalScores[q.dimension].total += score;
    dimensionalScores[q.dimension].count += 1;
  });

  const averagedScores = Object.entries(dimensionalScores).map(([key, { total, count }]) => ({
    dimension: wellnessDimensions[key as DimensionKey],
    score: count > 0 ? total / count : 0,
  }));

  const overallScore = Math.round((averagedScores.reduce((sum, item) => sum + item.score, 0) / (averagedScores.length * 5)) * 100);

  const detailedAnalysis = averagedScores.map(({ dimension, score }) => ({
    dimension,
    insight: getInsightForScore(Object.keys(wellnessDimensions).find(key => wellnessDimensions[key as DimensionKey] === dimension)!, score),
  }));

  const chartData = averagedScores.map(item => ({ dimension: item.dimension.split(' ')[0], score: item.score }));

  return { overallScore, dimensionalScores: averagedScores, detailedAnalysis, chartData };
}

// --- 3. React Component for Assessment & Results ---

function AssessmentComponent() {
  const navigate = useNavigate({ from: "/assessment" });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: number }>({});
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnswer = (value: number) => {
    const newResponses = { ...responses, [currentQuestion]: value };
    setResponses(newResponses);

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        const analysisResults = analyzeResponses(newResponses);
        setResults(analysisResults);
        setIsAnalyzing(false);
      }, 2000); // Simulate analysis time
    }
  };

  if (isAnalyzing) {
    return (
      <div className="text-center">
        <LoaderCircle className="mx-auto h-12 w-12 animate-spin text-fuchsia-400" />
        <h2 className="mt-4 text-2xl font-semibold">Analyzing your responses...</h2>
        <p className="text-muted-foreground">Unlocking your Mind-Sphere profile.</p>
      </div>
    );
  }

  if (results) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Your Mind Score</h1>
          <p className="text-7xl font-bold text-gradient mt-2">{results.overallScore}</p>
          <p className="text-muted-foreground mt-2">A holistic snapshot of your current mental wellness.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="glass rounded-xl p-4 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={results.chartData}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'white', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">Detailed Analysis</h3>
            {results.detailedAnalysis.map(item => (
              <div key={item.dimension}>
                <h4 className="font-medium">{item.dimension}</h4>
                <p className="text-sm text-muted-foreground">{item.insight}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
            <button onClick={() => navigate({ to: '/dashboard' })} className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:opacity-90 transition">
                Continue to Dashboard <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
            </button>
        </div>
      </motion.div>
    );
  }

  const progress = (currentQuestion / assessmentQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
        <motion.div className="bg-gradient-to-r from-fuchsia-500 to-cyan-400 h-2 rounded-full" style={{ width: `${progress}%` }} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-center text-2xl sm:text-3xl font-semibold leading-tight">
            {assessmentQuestions[currentQuestion].question}
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-5 gap-3">
            {answerOptions.map(opt => (
              <motion.button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="glass p-4 rounded-xl text-center transition hover:bg-white/10"
              >
                {opt.text}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export const Route = createFileRoute("/assessment")({
  component: AssessmentComponent,
});