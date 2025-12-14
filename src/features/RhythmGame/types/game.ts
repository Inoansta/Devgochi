export type Judge = "Perfect" | "Good" | "Miss";

export interface JudgeResult {
  judge: Judge;
  deltaMs: number;
}
