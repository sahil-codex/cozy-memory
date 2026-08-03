"use client";

import { useMemoryGame } from "@/hooks/useMemoryGame";
import GameBoard from "./GameBoard";

export default function GamePage(){
       const {cards,flipCard,moves} = useMemoryGame();
       return(
        <main className="min-h-screen bg-[#F7F1E6] flex flex-col items-center justify-center gap-8 p-8">
          <GameBoard cards = {cards} flipCard={flipCard} moves={moves}/>
        </main>
       );
}
