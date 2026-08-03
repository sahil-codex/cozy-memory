"use client";

import {motion} from "framer-motion";
import Image from "next/image";
import { Card as CardType } from "../types/card";

type CardProps = {
    card:CardType;
    onClick:(id:string) =>void;
};

export default function Card({card,onClick}:CardProps){
    return(
        <motion.button whileHover={{scale:card.isFlipped ? 1 : 1.04, y:card.isFlipped ? 0 :-4,}} whileTap={{scale:0.96,}}transition={{type:"spring",stiffness:400,damping:20,}}onClick={()=>onClick(card.id)} className="relative aspect-square w-28 [perspective:1000px]">
            <motion.div animate={{rotateY:card.isFlipped? 180:0,}}transition={{duration:0.45,}} style={{transformStyle:"preserve-3d",}} className="relative h-full w-full">
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#C58B5A] shadow-lg border-2 border-[#D8C3A5] [backface-visibility:hidden]">
                    <span className="text-4xl"> 🐾 </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white border-2 border-[#D8C3A5] shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <Image src={card.image} alt={card.animal} fill className="object-contain p-3"/>
                </div>
            </motion.div>
        </motion.button>
    );
}