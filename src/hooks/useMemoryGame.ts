"use client";

import { useEffect, useRef, useState } from "react";

import { animals } from "../constants/animals";
import { shuffle } from "../utils/shuffle";
import { Card } from "../components/types/card";

type SelectedCard = {
  id: string;
  image: string;
};

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

  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);

  const [moves, setMoves] = useState(0);

  const [isLocked, setIsLocked] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function canSelect(card: Card) {
    if (isLocked) return false;

    if (card.isMatched) return false;

    if (card.isFlipped) return false;

    return true;
  }

  function flipCard(id: string) {
    const clickedCard = cards.find((card) => card.id === id);

    if (!clickedCard) return;

    if (!canSelect(clickedCard)) return;

    // Flip visually
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

    // Save selection
    setSelectedCards((prev) => [
      ...prev,
      {
        id: clickedCard.id,
        image: clickedCard.image,
      },
    ]);
  }

  useEffect(() => {
    if (selectedCards.length !== 2) return;

    compareCards();
  }, [selectedCards]);

  function compareCards() {
    setIsLocked(true);

    const [first, second] = selectedCards;

    setMoves((prev) => prev + 1);

    if (first.image === second.image) {
      handleMatch(first.id, second.id);
    } else {
      handleMismatch(first.id, second.id);
    }
  }

  function handleMatch(firstId: string, secondId: string) {
    setCards((prev) =>
      prev.map((card) =>
        card.id === firstId || card.id === secondId
          ? {
              ...card,
              isMatched: true,
            }
          : card
      )
    );

    resetSelection();
  }

  function handleMismatch(firstId: string, secondId: string) {
    timeoutRef.current = setTimeout(() => {
      setCards((prev) =>
        prev.map((card) =>
          card.id === firstId || card.id === secondId
            ? {
                ...card,
                isFlipped: false,
              }
            : card
        )
      );

      resetSelection();
    }, 1800);
  }

  function resetSelection() {
    setSelectedCards([]);

    setIsLocked(false);
  }

  const gameWon =
    cards.length > 0 && cards.every((card) => card.isMatched);

  function restartGame() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setCards(createDeck());

    setSelectedCards([]);

    setMoves(0);

    setIsLocked(false);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    cards,
    moves,
    gameWon,
    flipCard,
    restartGame,
  };
}