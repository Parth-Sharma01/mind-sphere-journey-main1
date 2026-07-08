import { motion } from "framer-motion";
import { CountUp } from "./AnimatedNumber";
import { InfoButton } from "./InfoButton";
import {
  getTodayMood,
  calculateWellnessScore,
  calculateFocusScore,
  getXPToNextLevel,
  userProfile,
} from "@/lib/mock-data";

interface EnhancedStatProps {
  title: string;
  value: number | string;
  trend?: number;
  subtitle?: string;
  emoji: string;
  onClick?: () => void;
  description?: string;
  howCalculated?: string;
  tips?: string[];
  animateValue?: boolean;
  suffix?: string;
}

export function EnhancedStat({
  title,
  value,
  trend,
  subtitle,
  emoji,
  onClick,
  description,
  howCalculated,
  tips = [],
  animateValue = true,
  suffix = "",
}: EnhancedStatProps) {
  const isNumeric = typeof value === "number";

  return (
    <motion.div
      whileHover={{ y: -3 }}
      onClick={onClick}
      className={`glass rounded-3xl p-5 ${onClick ? "cursor-pointer hover:bg-white/10 transition-colors" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">{title}</div>
          {description && (
            <InfoButton
              title={title}
              description={description}
              howCalculated={howCalculated || ""}
              tips={tips}
            />
          )}
        </div>
        <div className="text-lg">{emoji}</div>
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">
        {animateValue && isNumeric ? (
          <CountUp
            end={value as number}
            duration={1.5}
            suffix={suffix}
            decimalPlaces={typeof value === "number" && value % 1 !== 0 ? 1 : 0}
          />
        ) : (
          value
        )}
      </div>
      {trend !== undefined && (
        <div
          className={`text-xs mt-1 ${trend > 0 ? "text-emerald-300" : trend < 0 ? "text-red-300" : "text-muted-foreground"}`}
        >
          {trend > 0 ? "+" : ""}
          {trend} vs last week
        </div>
      )}
      {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
    </motion.div>
  );
}

export function MoodTodayCard() {
  const mood = getTodayMood();
  const explanation = getMoodExplanation(mood.score);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="glass rounded-3xl p-6 cursor-pointer hover:bg-white/10 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-muted-foreground">Mood Today</div>
          <div className="font-medium mt-0.5">How are you feeling?</div>
        </div>
        <InfoButton
          title="Mood Score"
          description="Based on your daily mood check-in. Ranges from 1 (very low) to 10 (excellent)."
          howCalculated="Average of your mood ratings throughout the day"
          tips={[
            "Complete daily mood check-ins for accurate tracking",
            "Notice patterns between mood and your activities",
            "Use breathing exercises when mood dips",
          ]}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="text-5xl">{mood.emoji}</div>
          <div>
            <div className="text-2xl font-bold">
              <CountUp end={Math.round(mood.score * 10)} duration={1.5} decimalPlaces={0} />
              <span className="text-lg text-muted-foreground">/10</span>
            </div>
            <div
              className={`text-xs font-medium mt-1 ${mood.comparison > 0 ? "text-emerald-300" : mood.comparison < 0 ? "text-red-300" : "text-muted-foreground"}`}
            >
              {mood.comparison > 0 ? "+" : ""}
              {mood.comparison} from yesterday
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10">
          <p className="text-xs text-muted-foreground italic">"{explanation}"</p>
        </div>
      </div>
    </motion.div>
  );
}

export function WellnessScoreCard() {
  const score = calculateWellnessScore();
  const interpretation = getScoreInterpretation(score);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="glass rounded-3xl p-6 cursor-pointer hover:bg-white/10 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-muted-foreground">Overall Wellness</div>
          <div className="font-medium mt-0.5">Your wellness score</div>
        </div>
        <InfoButton
          title="Wellness Score"
          description="A holistic measurement of your mental and physical wellbeing"
          howCalculated="Calculated from mood (25%), sleep (20%), focus (20%), stress (15%), energy (10%), and motivation (10%)"
          tips={[
            "Complete assessments regularly for accuracy",
            "Maintain consistent sleep schedule",
            "Take breaks to maintain focus",
          ]}
        />
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-4xl font-bold">
            <CountUp end={Math.round(score)} duration={1.5} />
            <span className="text-lg text-muted-foreground">/100</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`h-full rounded-full ${getScoreColor(score)}`}
          />
        </div>

        <div className="pt-2 border-t border-white/10">
          <p className="text-xs text-muted-foreground">{interpretation}</p>
          <p className="text-xs text-muted-foreground mt-2 italic">
            "This score is educational, not a medical diagnosis. For health concerns, consult a
            professional."
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function XPCard() {
  const xp = userProfile.totalXP;
  const level = userProfile.level;
  const xpToNext = getXPToNextLevel();
  const totalXPForLevel = level * 200;
  const currentLevelXP = xp % 200;
  const progressPercent = (currentLevelXP / totalXPForLevel) * 100;

  return (
    <motion.div whileHover={{ y: -3 }} className="glass rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-muted-foreground">Experience Points</div>
          <div className="font-medium mt-0.5">Level {level}</div>
        </div>
        <InfoButton
          title="XP & Levels"
          description="Earn XP by completing activities and reaching wellness goals"
          howCalculated="Gained from mood check-ins, meditations, gaming, journaling, and coaching sessions"
          tips={[
            "Complete daily goals for consistent XP",
            "Try new activities to earn bonus XP",
            "Maintain streaks for XP multipliers",
          ]}
        />
      </div>

      <div className="space-y-3">
        <div className="text-3xl font-bold">
          <CountUp end={xp} duration={1.5} />
          <span className="text-sm text-muted-foreground ml-2">XP</span>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress to Level {level + 1}</span>
            <span className="text-emerald-300">{xpToNext} to go</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FocusCard() {
  const focus = calculateFocusScore();
  const focusExplanation = getFocusExplanation(focus);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="glass rounded-3xl p-6 cursor-pointer hover:bg-white/10 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-muted-foreground">Focus Score</div>
          <div className="font-medium mt-0.5">Concentration level</div>
        </div>
        <InfoButton
          title="Focus Score"
          description="Measures your ability to concentrate and maintain attention"
          howCalculated="Based on focus games, weekly consistency patterns, and meditation sessions"
          tips={[
            "Play focus games daily",
            "Take regular breaks",
            "Practice meditation for better concentration",
          ]}
        />
      </div>

      <div className="space-y-3">
        <div className="text-3xl font-bold">
          <CountUp end={Math.round(focus)} duration={1.5} suffix="%" />
        </div>

        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${focus}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
          />
        </div>

        <p className="text-xs text-muted-foreground">{focusExplanation}</p>
      </div>
    </motion.div>
  );
}

// Helper functions
function getMoodExplanation(mood: number): string {
  if (mood < 3)
    return "You might be struggling right now. Consider a breathing exercise or reaching out.";
  if (mood < 5) return "You're going through some challenges. Small self-care moments can help.";
  if (mood < 7) return "You're doing okay! Building on this is a great step forward.";
  if (mood < 8.5) return "Great! You're in a good place. Keep up the positive momentum.";
  return "Excellent! You're thriving. This is the energy to maintain and share with others!";
}

function getScoreInterpretation(score: number): string {
  if (score < 40)
    return "Your wellness needs attention. Focus on basics: sleep, movement, and self-compassion.";
  if (score < 60)
    return "You're building a foundation. Consistency in daily habits will strengthen your wellness.";
  if (score < 75) return "Good progress! You're managing stress and maintaining balance well.";
  if (score < 90) return "You're in a strong place. Keep reinforcing these healthy patterns.";
  return "Outstanding wellness level! You're a great example of balanced living.";
}

function getScoreColor(score: number): string {
  if (score < 40) return "bg-gradient-to-r from-red-500 to-red-600";
  if (score < 60) return "bg-gradient-to-r from-orange-500 to-yellow-500";
  if (score < 75) return "bg-gradient-to-r from-yellow-500 to-emerald-500";
  if (score < 90) return "bg-gradient-to-r from-emerald-500 to-teal-600";
  return "bg-gradient-to-r from-emerald-500 to-cyan-500";
}

function getFocusExplanation(focus: number): string {
  if (focus < 40) return "Your focus is scattered. Try a focus game or meditation session.";
  if (focus < 60) return "Decent concentration. Games can help sharpen your focus further.";
  if (focus < 80) return "Good focus! You're maintaining attention well.";
  return "Excellent focus! You're in peak concentration mode. Maintain this!";
}
