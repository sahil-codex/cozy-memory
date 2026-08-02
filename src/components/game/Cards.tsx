"use client";

import Image from "next/image";
import { Card as CardType } from "../types/card";

type CardProps = {
    card:CardType;
    onClick:(id:string) =>void;
};

export default function Card({card,onClick}:CardProps){
    return(
        <button onClick={()=>onClick(card.id)} className="aspect-square rounded-2xl border-2 border-[#D8C3A5] bg-white shadow-md hover:shadow-lg transition flex items-center justify-center overflow-hidden"
            >{card.isFlipped?(
                <Image src={card.image} alt = {card.animal} width={100} height={100} className="object-contain"/>):(
                    <span className="text-4xl">❓</span>
                )}
        </button>
    );
}