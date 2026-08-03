"use client";

import Card from "./Cards";
import { Card as CardType } from "../types/card";

type GameBoardProps = {
  cards: CardType[];
  flipCard: (id: string) => void;
  moves: number;
};

export default function GameBoard({
  cards,
  flipCard,
  moves,
}: GameBoardProps) {
  return (
    <div>
      <div className="flex items-center gap-8 text-2xl font-bold mb-6">
        <div>🎯 Moves : {moves}</div>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={flipCard}
          />
        ))}
      </div>
    </div>
  );
}