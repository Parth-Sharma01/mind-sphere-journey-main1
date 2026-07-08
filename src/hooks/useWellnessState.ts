import { useState, useCallback } from "react";
import {
  detailedDailyGoals,
  getTodayXPEarned,
  getTodayProgressPercentage,
  getSmartRecommendations,
  getTodayMood,
  calculateWellnessScore,
  moodLogs,
  userProfile,
} from "@/lib/mock-data";

export type DailyGoal = (typeof detailedDailyGoals)[0];
export type MoodLog = (typeof moodLogs)[0];

interface WellnessState {
  dailyGoals: DailyGoal[];
  moodLogs: MoodLog[];
  completedToday: number;
  xpEarned: number;
  todayProgress: number;
  wellnessScore: number;
  currentStreak: number;
}

export function useWellnessState() {
  // Initialize with default data
  const [state, setState] = useState<WellnessState>({
    dailyGoals: detailedDailyGoals,
    moodLogs: [...moodLogs],
    completedToday: detailedDailyGoals.filter((g) => g.done).length,
    xpEarned: getTodayXPEarned(),
    todayProgress: getTodayProgressPercentage(),
    wellnessScore: calculateWellnessScore(),
    currentStreak: userProfile.currentStreak,
  });

  /**
   * Toggle a daily goal as complete/incomplete
   */
  const toggleGoal = useCallback((goalId: number) => {
    setState((prev) => {
      const updatedGoals = prev.dailyGoals.map((g) =>
        g.id === goalId ? { ...g, done: !g.done } : g,
      );
      const completed = updatedGoals.filter((g) => g.done).length;
      const xp = updatedGoals.filter((g) => g.done).reduce((sum, g) => sum + g.xp, 0);
      const progress = Math.floor((completed / updatedGoals.length) * 100);

      return {
        ...prev,
        dailyGoals: updatedGoals,
        completedToday: completed,
        xpEarned: xp,
        todayProgress: progress,
      };
    });
  }, []);

  /**
   * Log a mood check-in
   */
  const logMood = useCallback(
    (
      moodScore: number,
      stressLevel: number,
      energyLevel: number,
      sleepQuality: number,
      focusLevel: number,
    ) => {
      setState((prev) => {
        const newMoodLog: MoodLog = {
          date: new Date(),
          mood: moodScore,
          stress: stressLevel,
          energy: energyLevel,
          sleep: sleepQuality,
          focus: focusLevel,
          notes: "Logged today",
        };

        return {
          ...prev,
          moodLogs: [...prev.moodLogs, newMoodLog],
        };
      });
    },
    [],
  );

  /**
   * Update wellness score (recalculate based on current state)
   */
  const updateWellnessScore = useCallback(() => {
    setState((prev) => ({
      ...prev,
      wellnessScore: calculateWellnessScore(),
    }));
  }, []);

  /**
   * Update streak if all goals completed
   */
  const updateStreakIfComplete = useCallback(() => {
    setState((prev) => {
      if (prev.todayProgress === 100 && prev.currentStreak > 0) {
        return { ...prev, currentStreak: prev.currentStreak + 1 };
      }
      return prev;
    });
  }, []);

  /**
   * Get all daily goals
   */
  const getDailyGoals = useCallback((): DailyGoal[] => {
    return state.dailyGoals;
  }, [state.dailyGoals]);

  /**
   * Get today's completed goals count
   */
  const getCompletedCount = useCallback((): number => {
    return state.completedToday;
  }, [state.completedToday]);

  /**
   * Get total XP earned today
   */
  const getXPEarned = useCallback((): number => {
    return state.xpEarned;
  }, [state.xpEarned]);

  /**
   * Get today's progress percentage
   */
  const getProgress = useCallback((): number => {
    return state.todayProgress;
  }, [state.todayProgress]);

  /**
   * Get wellness score
   */
  const getWellnessScore = useCallback((): number => {
    return Math.round(state.wellnessScore);
  }, [state.wellnessScore]);

  /**
   * Get current streak
   */
  const getStreak = useCallback((): number => {
    return state.currentStreak;
  }, [state.currentStreak]);

  return {
    // State
    state,
    // Actions
    toggleGoal,
    logMood,
    updateWellnessScore,
    updateStreakIfComplete,
    // Getters
    getDailyGoals,
    getCompletedCount,
    getXPEarned,
    getProgress,
    getWellnessScore,
    getStreak,
  };
}
