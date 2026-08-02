"use client";

import { useState } from "react";
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

  function flipCard(id: string) {
    setCards((prevCards) =>
      prevCards.map((card) =>{
       if(card.id!==id)return card;
       if(card.isMatched)return card;
       if(card.isFlipped)return card;

       return{
        ...card,
        isFlipped:true,
       };
      })
     );
  }

  function restartGame() {
    setCards(createDeck());
  }

  return {
    cards,
    flipCard,
    restartGame,
  };
}