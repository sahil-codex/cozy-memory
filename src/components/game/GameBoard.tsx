"use client";

import Card from "./Cards";
import { Card as CardType } from "../types/card";

type GameBoardProps = {
    cards:CardType[];
    flipCard:(id:string) =>void;
};

export default function GameBoard({
    cards,flipCard,}:GameBoardProps){
        return (
            <div className="grid grid-cols-4 gap-4">{cards.map((card)=>(<Card key={card.id} card={card} onClick={flipCard}/>
            ))}</div>
        );
}