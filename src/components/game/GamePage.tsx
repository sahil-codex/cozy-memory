"use client";

import { useSearchParams } from "next/navigation";
import { Difficulty } from "@/components/types/difficulty";
import { useMemoryGame } from "@/hooks/useMemoryGame";
import GameBoard from "./GameBoard";

export default function GamePage(){
       const searchParams = useSearchParams();
       const value = searchParams.get("difficulty");
       const difficulty: Difficulty = value === "easy" ||  value === "moderate" || value === "hard" ? value : "easy";

       const {cards,flipCard,moves,gameWon,restartGame} = useMemoryGame(difficulty);
       return(
        <main className="min-h-screen bg-[#F7F1E6] flex flex-col items-center justify-center gap-8 p-8">
          <GameBoard cards = {cards} flipCard={flipCard} moves={moves}/>
          {gameWon && <p>You won! 🎉</p>}
        <button onClick={restartGame}> Restart </button>
        </main>
       );
}
