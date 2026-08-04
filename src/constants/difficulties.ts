import { Difficulty } from "@/components/types/difficulty";

export type DifficultyConfig = {
  name: string;
  pairs: number;
  columns: number;
  rows: number;
};

export const difficulties: Record<Difficulty, DifficultyConfig> = {
  easy: {
    name: "Easy",
    pairs: 8,
    columns: 4,
    rows: 4,
  },
  moderate: {
    name: "Moderate",
    pairs: 12,
    columns: 6,
    rows: 4,
  },
  hard: {
    name: "Hard",
    pairs: 15,
    columns: 6,
    rows: 5,
  },
};