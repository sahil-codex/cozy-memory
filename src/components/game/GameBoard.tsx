"use client";

import { difficulties } from "@/constants/difficulties";
import { Difficulty } from "@/components/types/difficulty";
import Card from "./Cards";
import { Card as CardType } from "../types/card";

type GameBoardProps = {
  cards: CardType[];
  flipCard: (id: string) => void;
  moves: number;
  difficulty: Difficulty;
};

const gridColsClass: Record<number, string> = {
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const cardSizeClass: Record<Difficulty, string> = {
  easy: "w-28",
  moderate: "w-28",
  hard: "w-28",
};

export default function GameBoard({
  cards,
  flipCard,
  moves,
  difficulty,
}: GameBoardProps) {
  const { columns } = difficulties[difficulty];

  return (
    <div>
      <div className="flex items-center gap-8 text-2xl font-bold mb-6">
        <div>🎯 Moves : {moves}</div>
      </div>

      <div className={`grid gap-4 ${gridColsClass[columns]}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={flipCard}
            className={cardSizeClass[difficulty]}
          />
        ))}
      </div>
    </div>
  );
}
