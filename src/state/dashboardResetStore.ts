import { useEffect, useMemo, useState } from "react";

export type DashboardResetState = {
  xp: number;
  coins: number;
  streak: number;
  wellnessScore: number;
  moodTodayScore: number; // 0-10
  moodTodayComparison: number; // vs last week placeholder
  focusScore: number; // 0-100
};

const ZERO_STATE: DashboardResetState = {
  xp: 0,
  coins: 0,
  streak: 0,
  wellnessScore: 0,
  moodTodayScore: 0,
  moodTodayComparison: 0,
  focusScore: 0,
};

export function useDashboardResetStore() {
  // Key idea: on each mount (i.e. every page load), reset to zeros.
  const [state, setState] = useState<DashboardResetState>(ZERO_STATE);

  useEffect(() => {
    // Hard reset on every reload/navigation mount.
    setState(ZERO_STATE);
  }, []);

  const api = useMemo(
    () => ({
      getState: () => state,
      reset: () => setState(ZERO_STATE),
      setAll: (next: DashboardResetState) => setState(next),
    }),
    [state],
  );

  return { state, ...api, reset: () => setState(ZERO_STATE) };
}
