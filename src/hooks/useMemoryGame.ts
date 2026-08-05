"use client";

import { useEffect, useRef, useState } from "react";
import { Difficulty } from "@/components/types/difficulty";
import { difficulties } from "@/constants/difficulties";
import { animals } from "../constants/animals";
import { shuffle } from "../utils/shuffle";
import { Card } from "../components/types/card";

type SelectedCard = {
  id: string;
  image: string;
};

export function createDeck(pairCount: number): Card[] {
  const selectedAnimals = shuffle([...animals]).slice(0, pairCount);
  const duplicatedCards = selectedAnimals.flatMap((animal) => [
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

export function useMemoryGame( 
  difficulty: Difficulty,
) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [hasStarted,setHasStarted] = useState(false);
  useEffect(() => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  } setCards(createDeck(difficulties[difficulty].pairs)); setSelectedCards([]); setMoves(0); setIsLocked(false);
},[difficulty]);
  function canSelect(card: Card) {
    if (isLocked) return false;

    if (card.isMatched) return false;

    if (card.isFlipped) return false;

    return true;
  }

  function flipCard(id: string) {
    const clickedCard = cards.find((card) => card.id === id);
    if(!hasStarted){setHasStarted(true);}
    if (!clickedCard) return;

    if (!canSelect(clickedCard)) return;
  
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

    setCards(createDeck(difficulties[difficulty].pairs));
    setSelectedCards([]);
    setMoves(0);
    setIsLocked(false);
    setHasStarted(false);
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
    difficulty,
    hasStarted,
    flipCard,
    restartGame,
  };
}
