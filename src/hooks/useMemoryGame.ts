"use client";

import { useEffect, useState } from "react";
import { animals } from "../constants/animals";
import { shuffle } from "../utils/shuffle";
import { Card } from "../components/types/card";

export function createDeck(): Card[] {
  const duplicatedCards = animals.flatMap((animal) => [
    {
      id: crypto.randomUUID(),
      ...animal,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: crypto.randomUUID(),
      ...animal,
      isFlipped: false,
      isMatched: false,
    },
  ]);

  return shuffle(duplicatedCards);
}

export function useMemoryGame() {
  const [cards, setCards] = useState<Card[]>(createDeck);

  const [firstCard, setFirstCard] = useState<string | null>(null);
  const [secondCard, setSecondCard] = useState<string | null>(null);

  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);

  function flipCard(id: string) {
    if (isLocked) return;

    const clickedCard = cards.find((card) => card.id === id);

    if (!clickedCard) return;
    if (clickedCard.isMatched) return;
    if (clickedCard.isFlipped) return;

    setCards((prev) =>
      prev.map((card) =>
        card.id === id
          ? {
              ...card,
              isFlipped: true,
            }
          : card
      )
    );

    if (!firstCard) {
      setFirstCard(id);
      return;
    }

    setSecondCard(id);
  }

  useEffect(() => {
    if (!firstCard || !secondCard) return;

    setIsLocked(true);
    setMoves((prev) => prev + 1);

    checkMatch();
  }, [firstCard, secondCard]);

  function checkMatch() {
    const first = cards.find((card) => card.id === firstCard);
    const second = cards.find((card) => card.id === secondCard);

    if (!first || !second) {
      resetTurn();
      return;
    }

    // Replace "image" with your matching property if needed
    if (first.image === second.image) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === first.id || card.id === second.id
            ? {
                ...card,
                isMatched: true,
              }
            : card
        )
      );

      resetTurn();
      return;
    }

    setTimeout(() => {
      setCards((prev) =>
        prev.map((card) =>
          card.id === first.id || card.id === second.id
            ? {
                ...card,
                isFlipped: false,
              }
            : card
        )
      );

      resetTurn();
    }, 800);
  }

  function resetTurn() {
    setFirstCard(null);
    setSecondCard(null);
    setIsLocked(false);
  }

  const gameWon =
    cards.length > 0 && cards.every((card) => card.isMatched);

  function restartGame() {
    setCards(createDeck());
    setMoves(0);
    resetTurn();
  }

  return {
    cards,
    moves,
    gameWon,
    flipCard,
    restartGame,
  };
}