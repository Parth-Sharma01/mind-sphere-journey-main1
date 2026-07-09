import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wind, RotateCcw, Zap, Target, Brain, Hand } from "lucide-react";
import { saveGamePerformance } from "@/lib/storage-utils";

/**
 * Flower Breathing Game - Visual breathing guide
 */
function FlowerBreathingGame() {
  const BREATHING_CYCLE = 14; // 4s inhale + 4s hold + 6s exhale
  const TOTAL_ROUNDS = 5;

  const [isActive, setIsActive] = useState(false);
  const [completions, setCompletions] = useState(0);
  const [phase, setPhase] = useState("Inhale");

  const handleStart = () => {
    setIsActive(true);
    setCompletions(0);
    setPhase("Inhale");
  };

  useEffect(() => {
    if (!isActive) return;

    const startTime = Date.now();
    let lastRound = -1;

    const timer = setInterval(() => {
      const elapsedSeconds = (Date.now() - startTime) / 1000;
      const cycleElapsed = elapsedSeconds % BREATHING_CYCLE;

      // Determine current phase based on elapsed time
      if (cycleElapsed < 4) {
        setPhase("Inhale");
      } else if (cycleElapsed < 8) {
        setPhase("Hold");
      } else {
        setPhase("Exhale");
      }

      // Update round completions
      const currentRound = Math.floor(elapsedSeconds / BREATHING_CYCLE);
      if (currentRound > lastRound) {
        lastRound = currentRound;
        setCompletions(currentRound);
      }

      // Check for game completion
      if (currentRound >= TOTAL_ROUNDS) {
        saveGamePerformance("flower_breathing", {
          score: TOTAL_ROUNDS * 20,
          time: Date.now(),
          accuracy: 100,
        });
        setIsActive(false);
      }
    }, 100); // Update frequently for smooth text transitions

    return () => {
      clearInterval(timer);
    };
  }, [isActive]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-4">
          Follow the flower as it expands and contracts. Breathe with the rhythm: Inhale (4s) → Hold
          (4s) → Exhale (6s)
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
                  scale: [0.8, 1.4, 1.4, 0.8, 0.8],
                }}
                transition={{
                  duration: BREATHING_CYCLE,
                  repeat: Infinity,
                  times: [0, 4 / 14, 8 / 14, 1, 1],
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
                    Round {completions + 1}/{TOTAL_ROUNDS}
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
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-lg font-medium"
              >
                {phase}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="text-center text-sm text-gray-600">
            Progress: {completions}/{TOTAL_ROUNDS} rounds complete. Wonderful progress!
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Anti-Stress Stroop Test Game
 */
function StroopTestGame() {
  const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#C7CEEA", "#FF9999"];
  const colorNames = ["Red", "Teal", "Yellow", "Mint", "Lavender", "Pink"];

  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [current, setCurrent] = useState<{ text: string; color: string; correctColorIndex: number }>({
    text: "",
    color: "",
    correctColorIndex: -1,
  });

  const generateQuestion = useCallback(() => {
    const textIdx = Math.floor(Math.random() * colorNames.length);
    const colorIdx = Math.floor(Math.random() * colors.length);

    return {
      text: colorNames[textIdx],
      color: colors[colorIdx],
      correctColorIndex: colorIdx,
    };
  }, [colors.length, colorNames.length]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setCurrent(generateQuestion());
    setFeedback(null);
  };

  const handleAnswer = (selected: number) => {
    if (current.correctColorIndex === selected) {
      setScore((prev) => prev + 1);
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }
    setTimeout(() => setFeedback(null), 200);
    setCurrent(generateQuestion());
  };

  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          saveGamePerformance("stroop_test", {
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
          Click the button that matches the COLOR of the text (not the word itself). This tests your
          cognitive control and focus!
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
              className={`text-lg font-semibold ${timeLeft > 10 ? "text-green-600" : "text-red-600"}`}
            >
              Time: {timeLeft}s
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className={`text-6xl font-bold mb-8 p-6 rounded-lg transition-all ${
                feedback === "correct" ? "bg-green-500/20" : feedback === "incorrect" ? "bg-red-500/20" : ""
              }`}
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
  const MAZE_SIZE = 10;
  const [gameActive, setGameActive] = useState(false);
  const [time, setTime] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [maze, setMaze] = useState<number[]>([]);

  const startGame = () => {
    setGameActive(true);
    setTime(0);
    setCompleted(false);
    setMaze(Array.from({ length: MAZE_SIZE }, (_, i) => i + 1).sort(() => Math.random() - 0.5));
  };

  const completeGame = () => {
    setGameActive(false);
    setCompleted(true);
    saveGamePerformance("focus_maze", {
      score: Math.max(0, 100 - time * 2),
      time,
      accuracy: 95,
    });
  };

  useEffect(() => {
    if (!gameActive) return;
    const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [gameActive]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-4">
          Navigate through the maze by clicking the next step. This measures your steady attention
          and patience.
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
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl mb-4">
            🎉
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-800">Maze Complete!</h3>
          <p className="text-lg text-gray-600">Time: {time} seconds</p>
          <p className="text-gray-600 mt-4">
            Your patience and focus are impressive. Great job maintaining steady attention!
          </p>
          <Button onClick={startGame} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center text-xl font-semibold text-gray-700">Time: {time}s</div>

          <SimpleMaze maze={maze} onComplete={completeGame} />
        </div>
      )}
    </div>
  );
}

/**
 * Simple interactive maze component
 */
function SimpleMaze({ maze, onComplete }: { maze: number[]; onComplete: () => void }) {
  const [position, setPosition] = useState(0);
  const mazeLength = maze.length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-lg grid grid-cols-5 gap-2">
        {maze.map((value, i) => (
          <motion.div
            key={i}
            className={`h-12 w-12 rounded-lg cursor-pointer transition-all flex items-center justify-center font-bold text-gray-800 ${
              value <= position + 1
                ? "bg-blue-400 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              if (value === position + 1) {
                const newPosition = position + 1;
                setPosition(newPosition);
                if (newPosition === mazeLength) {
                  onComplete();
                }
              }
            }}
          >
            {value}
          </motion.div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-600">
        Click the next step in sequence. Progress: {position + 1}/{mazeLength}
      </div>
    </div>
  );
}

/**
 * Memory Matrix Game
 */
function MemoryMatrixGame() {
  const [level, setLevel] = useState(3);
  const [tiles, setTiles] = useState<number[]>([]);
  const [gameState, setGameState] = useState<"idle" | "memorize" | "recall" | "result">("idle");
  const [userSelection, setUserSelection] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startGame = () => {
    const newTiles = Array.from({ length: 25 }, (_, i) => i);
    const activeTiles = newTiles.sort(() => 0.5 - Math.random()).slice(0, level);
    setTiles(activeTiles);
    setUserSelection([]);
    setIsCorrect(null);
    setGameState("memorize");

    setTimeout(() => {
      setGameState("recall");
    }, 2000);
  };

  const handleTileClick = (index: number) => {
    if (gameState !== "recall" || userSelection.includes(index)) return;

    const newSelection = [...userSelection, index];
    setUserSelection(newSelection);

    if (newSelection.length === level) {
      const correct = tiles.every((tile) => newSelection.includes(tile));
      setIsCorrect(correct);
      setGameState("result");
      if (correct) {
        setLevel((l) => l + 1);
      } else {
        setLevel((l) => Math.max(3, l - 1));
      }
    }
  };

  return (
    <div className="space-y-6 text-center">
      <p className="text-gray-600 mb-4">Memorize the highlighted tiles. Click them back in any order.</p>
      <div className="text-lg font-semibold">Level: {level - 2}</div>

      {gameState === "idle" && (
        <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
          <Brain className="w-5 h-5" /> Start Memory Test
        </Button>
      )}

      <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
        {Array.from({ length: 25 }, (_, i) => (
          <motion.div
            key={i}
            onClick={() => handleTileClick(i)}
            className={`h-12 w-12 rounded-lg cursor-pointer transition-all ${
              gameState === "memorize" && tiles.includes(i) ? "bg-cyan-400" : "bg-gray-200"
            } ${gameState === "recall" && userSelection.includes(i) ? (tiles.includes(i) ? "bg-cyan-400" : "bg-red-400") : ""}`}
          />
        ))}
      </div>

      {gameState === "result" && (
        <div className="space-y-4">
          <h3 className={`text-2xl font-bold ${isCorrect ? "text-green-500" : "text-red-500"}`}>
            {isCorrect ? "Correct!" : "Try Again!"}
          </h3>
          <Button onClick={startGame} variant="outline">
            Next Level
          </Button>
        </div>
      )}
    </div>
  );
}

/**
 * Reaction Time Game
 */
function ReactionTimeGame() {
  const [gameState, setGameState] = useState<"idle" | "waiting" | "ready" | "result">("idle");
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const startGame = () => {
    setGameState("waiting");
    timerRef.current = setTimeout(() => {
      setGameState("ready");
      setStartTime(Date.now());
    }, 1000 + Math.random() * 3000);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      clearTimeout(timerRef.current);
      setReactionTime(0);
      setGameState("result");
    } else if (gameState === "ready") {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      setGameState("result");
      saveGamePerformance("reaction_time", { score: Math.max(0, 500 - time), time, accuracy: 100 });
    } else {
      startGame();
    }
  };

  return (
    <div className="space-y-6 text-center">
      <p className="text-gray-600 mb-4">When the box turns green, click it as fast as you can.</p>
      <div
        onClick={handleClick}
        className={`h-64 w-full rounded-lg cursor-pointer flex items-center justify-center text-white font-bold text-2xl transition-colors ${
          gameState === "idle" || gameState === "result" ? "bg-blue-500" : ""
        } ${gameState === "waiting" ? "bg-red-500" : ""} ${gameState === "ready" ? "bg-green-500" : ""}`}
      >
        {gameState === "idle" && "Click to Start"}
        {gameState === "waiting" && "Wait for green..."}
        {gameState === "ready" && "Click!"}
        {gameState === "result" && (
          <div>
            {reactionTime > 0 ? `${reactionTime} ms` : "Too soon!"}
            <div className="text-sm font-normal mt-2">Click to play again</div>
          </div>
        )}
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
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="breathing" className="gap-2">
            <Wind className="w-4 h-4" />
            <span className="hidden sm:inline">Breathing</span>
          </TabsTrigger>
          <TabsTrigger value="stroop" className="gap-2">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Stroop Test</span>
          </TabsTrigger>
          <TabsTrigger value="maze" className="gap-2">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">Focus Maze</span>
          </TabsTrigger>
          <TabsTrigger value="memory" className="gap-2">
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">Memory</span>
          </TabsTrigger>
          <TabsTrigger value="reaction" className="gap-2">
            <Hand className="w-4 h-4" />
            <span className="hidden sm:inline">Reaction</span>
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

        <TabsContent value="memory">
          <Card className="p-8 border-2 border-purple-200">
            <MemoryMatrixGame />
          </Card>
        </TabsContent>

        <TabsContent value="reaction">
          <Card className="p-8 border-2 border-yellow-200">
            <ReactionTimeGame />
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
          <li>
            <strong>Memory Matrix:</strong> Tests and improves short-term spatial memory.
          </li>
          <li>
            <strong>Reaction Time:</strong> Measures and trains your reaction speed.
          </li>
        </ul>
      </Card>
    </div>
  );
}
