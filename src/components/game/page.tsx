"use client";

import { useMemoryGame } from "@/hooks/useMemoryGame";
import GameBoard from "./GameBoard";

export default function GamePage(){
       const {cards,flipCard} = useMemoryGame();
       return(
        <main className="min-h-screen bg-[#F7F1E6] flex items-center justify-center p-8">
          <GameBoard cards = {cards} flipCard={flipCard}/>
        </main>
       );
}