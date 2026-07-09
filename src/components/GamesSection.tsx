import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wind, RotateCcw, Zap, Target } from 'lucide-react';
import { saveGamePerformance } from '@/lib/storage-utils';

/**
 * Flower Breathing Game - Visual breathing guide
 */
function FlowerBreathingGame() {
  const [isActive, setIsActive] = useState(false);
  const [completions, setCompletions] = useState(0);

  const handleStart = () => {
    setIsActive(true);
    setCompletions(0);
  };

  const handleComplete = () => {
    setCompletions((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        saveGamePerformance('flower_breathing', {
          score: newCount * 20,
          time: Date.now(),
          accuracy: 100,
        });
        setIsActive(false);
      }
      return newCount;
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-4">
          Follow the flower as it expands and contracts. Breathe with the rhythm: Inhale (4s) →
          Hold (4s) → Exhale (6s)
        </p>
      </div>

      {!isActive ? (
        <div className="flex justify-center">
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white gap-2"
          >
            <Wind className="w-5 h-5" />
            Start Breathing Exercise
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-green-300 to-emerald-500 rounded-full opacity-80"
                animate={{
                  scale: [0.8, 1.4, 1.4, 0.8],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  times: [0, 0.3, 0.7, 1],
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <motion.p
                    key={completions}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-sm font-semibold"
                  >
                    Round {completions + 1}/5
                  </motion.p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <BreathingPhases />
            <Button
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Mark Round Complete
            </Button>
          </motion.div>

          <div className="text-center text-sm text-gray-600">
            Progress: {completions}/5 rounds complete. Wonderful progress!
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Breathing phase indicator
 */
function BreathingPhases() {
  const phases = [
    { label: 'Inhale', duration: 4, color: 'from-blue-400' },
    { label: 'Hold', duration: 4, color: 'from-purple-400' },
    { label: 'Exhale', duration: 6, color: 'from-green-400' },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {phases.map((phase, index) => (
        <motion.div
          key={phase.label}
          className={`px-4 py-2 rounded-lg bg-gradient-to-r ${phase.color} to-transparent text-white text-sm font-semibold`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: phase.duration,
            repeat: Infinity,
            delay: phases.slice(0, index).reduce((sum, p) => sum + p.duration, 0),
          }}
        >
          {phase.label} ({phase.duration}s)
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Anti-Stress Stroop Test Game
 */
function StroopTestGame() {
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#C7CEEA', '#FF9999'];
  const colorNames = ['Red', 'Teal', 'Yellow', 'Mint', 'Lavender', 'Pink'];

  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [current, setCurrent] = useState<{ text: string; color: string; correct: number }>({
    text: '',
    color: '',
    correct: -1,
  });

  const generateQuestion = () => {
    const textIdx = Math.floor(Math.random() * colorNames.length);
    const colorIdx = Math.floor(Math.random() * colors.length);
    const isCorrectMatch = Math.random() > 0.5;

    const correctIdx = isCorrectMatch ? colorIdx : (colorIdx + 1) % colors.length;

    return {
      text: colorNames[textIdx],
      color: colors[colorIdx],
      correct: correctIdx,
    };
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setCurrent(generateQuestion());
  };

  const handleAnswer = (selected: number) => {
    if (current.correct === selected) {
      setScore((prev) => prev + 1);
      setCurrent(generateQuestion());
    }
  };

  React.useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          saveGamePerformance('stroop_test', {
            score,
            time: 30,
            accuracy: Math.round((score / 15) * 100), // Rough estimate
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, score]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-4">
          Click the button that matches the COLOR of the text (not the word itself). This tests
          your cognitive control and focus!
        </p>
      </div>

      {!gameActive ? (
        <div className="flex justify-center">
          <Button
            onClick={startGame}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white gap-2"
          >
            <Zap className="w-5 h-5" />
            Start Stroop Test
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold text-gray-700">Score: {score}</div>
            <div
              className={`text-lg font-semibold ${timeLeft > 10 ? 'text-green-600' : 'text-red-600'}`}
            >
              Time: {timeLeft}s
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="text-6xl font-bold mb-8 p-6 rounded-lg"
              style={{ color: current.color }}
            >
              {current.text}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {colors.map((color, idx) => (
              <motion.button
                key={idx}
                onClick={() => handleAnswer(idx)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                style={{ backgroundColor: color, opacity: 0.8 }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Focus Maze Game
 */
function FocusMazeGame() {
  const [gameActive, setGameActive] = useState(false);
  const [time, setTime] = useState(0);
  const [completed, setCompleted] = useState(false);

  const startGame = () => {
    setGameActive(true);
    setTime(0);
    setCompleted(false);
  };

  const completeGame = () => {
    setGameActive(false);
    setCompleted(true);
    saveGamePerformance('focus_maze', {
      score: Math.max(0, 100 - time),
      time,
      accuracy: 95,
    });
  };

  React.useEffect(() => {
    if (!gameActive) return;
    const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [gameActive]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-4">
          Navigate through the maze by clicking the next step. This measures your steady
          attention and patience.
        </p>
      </div>

      {!gameActive ? (
        <div className="flex justify-center">
          <Button
            onClick={startGame}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white gap-2"
          >
            <Target className="w-5 h-5" />
            Start Focus Maze
          </Button>
        </div>
      ) : completed ? (
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-800">Maze Complete!</h3>
          <p className="text-lg text-gray-600">Time: {time} seconds</p>
          <p className="text-gray-600 mt-4">
            Your patience and focus are impressive. Great job maintaining steady attention!
          </p>
          <Button
            onClick={startGame}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center text-xl font-semibold text-gray-700">Time: {time}s</div>

          <SimpleMaze onComplete={completeGame} />
        </div>
      )}
    </div>
  );
}

/**
 * Simple interactive maze component
 */
function SimpleMaze({ onComplete }: { onComplete: () => void }) {
  const [position, setPosition] = useState(0);
  const mazeLength = 10;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-8 rounded-lg">
        <div className="space-y-3">
          {Array.from({ length: mazeLength }).map((_, i) => (
            <motion.div
              key={i}
              className={`h-12 rounded-lg cursor-pointer transition-all ${
                i === position
                  ? 'bg-blue-600 text-white flex items-center justify-center font-bold'
                  : i < position
                    ? 'bg-green-300'
                    : 'bg-gray-200 hover:bg-gray-300'
              }`}
              whileHover={i === position || i === position + 1 ? { scale: 1.05 } : {}}
              onClick={() => {
                if (i === position + 1) {
                  setPosition(i);
                  if (i === mazeLength - 1) {
                    onComplete();
                  }
                }
              }}
            >
              {i === position && '→'}
              {i < position && '✓'}
              {i > position + 1 && i + 1}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        Click the next step in sequence. Progress: {position + 1}/{mazeLength}
      </div>
    </div>
  );
}

/**
 * Games Hub Component
 */
export function GamesSection() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Mindful Games</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Scientifically-proven games designed to enhance focus, calm, and self-awareness. Play to
          track your mental state and improve cognitive control.
        </p>
      </div>

      <Tabs defaultValue="breathing" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="breathing" className="gap-2">
            <Wind className="w-4 h-4" />
            <span className="hidden sm:inline">Breathing</span>
          </TabsTrigger>
          <TabsTrigger value="stroop" className="gap-2">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Stroop</span>
          </TabsTrigger>
          <TabsTrigger value="maze" className="gap-2">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">Maze</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="breathing">
          <Card className="p-8 border-2 border-green-200">
            <FlowerBreathingGame />
          </Card>
        </TabsContent>

        <TabsContent value="stroop">
          <Card className="p-8 border-2 border-orange-200">
            <StroopTestGame />
          </Card>
        </TabsContent>

        <TabsContent value="maze">
          <Card className="p-8 border-2 border-blue-200">
            <FocusMazeGame />
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200">
        <h3 className="font-semibold text-gray-800 mb-3">About These Games</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            <strong>Flower Breathing:</strong> Proven to reduce anxiety and activate the
            parasympathetic nervous system
          </li>
          <li>
            <strong>Stroop Test:</strong> Measures executive function and cognitive control
          </li>
          <li>
            <strong>Focus Maze:</strong> Develops sustained attention and patience
          </li>
        </ul>
      </Card>
    </div>
  );
}
