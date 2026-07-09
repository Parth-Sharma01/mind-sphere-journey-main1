/**
 * Creates a seeded pseudo-random number generator (PRNG).
 * This ensures that the "random" values are the same every time the code runs with the same seed,
 * which is useful for creating deterministic, repeatable animations or procedural content.
 *
 * @param seed The seed for the random number generator.
 */
export function seededRandom(seed: number) {
  let state = seed;
  return () => (state = (state * 9301 + 49297) % 233280) / 233280;
}