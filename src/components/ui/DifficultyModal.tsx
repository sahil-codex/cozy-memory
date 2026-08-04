"use client";

import {motion,AnimatePresence} from "framer-motion";
import { Difficulty } from "@/components/types/difficulty";
import { difficulties } from "@/constants/difficulties";

type DifficultyModalProps = {
    open:boolean;
    onClose:() =>void;
    onSelect:(difficulty:Difficulty) =>void;

};

const difficultyIcons:Record<Difficulty, string> = {
    easy:"🌱",
    moderate:"🍂",
    hard:"🔥",
};

const difficultyDescriptions:Record<Difficulty, string> = {
    easy:"Perfect for relaxing",
    moderate:"A nice challenge",
    hard:"Test your memory",
};

export default function DifficultyModal({
    open,
    onClose,
    onSelect,
}:DifficultyModalProps){
    return(
        <AnimatePresence>
            {open &&(
                <>
                <motion.div initial ={{opacity:0}}
                 animate={{opacity:1}}
                 exit={{opacity:0}}
                 onClick={onClose}
                 className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                 />
                 <motion.div initial={{opacity:0,
                 scale:0.8,y:40,}}
                 animate={{opacity:1,scale:1,y:0,}}
                 exit={{
                    opacity:0,scale:0.8,}}
                    transition={{
                        type:"spring",
                        stiffness:300,
                        damping:24,
                    }}
                    className="fixed left-1/2 top-1/2
                    z-50 w-[90%]
                    max-w-lg
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-3xl
                    bg-[#FFF8F2] p-8 shadow-2xl"
                    >
                        <h2 className="mb-6 text-center text-3xl font-bold text-[#5A3E2B]">Choose Difficulty</h2>
                        <div className="space-y-4">
                            <div className="space-y-4">
                                {( Object.keys(difficulties) as Difficulty[]).map((difficulty)=>(
                                    <motion.button key={difficulty}
                                    whileHover={{scale:1.02,y:-2,}}
                                    whileTap={{scale:0.98,}}
                                    onClick={()=>onSelect(difficulty)}className="w-full rounded-2xl border border-[#E7D7C5] bg-white p-5 text-left transition hover:shadow-lg">
                                    <div className="flex items-center gap-4">
                                    <div className="text-4xl">{difficultyIcons[difficulty]}</div>
                                    <div>
                                    <h3 className="text-xl font-bold text-[#5A3E2B]">{difficulties[difficulty].name}</h3>
                                    <p className="text-sm text-[#7A5A42]">{difficulties[difficulty].pairs * 2} Cards •{" "}
                                     {difficultyDescriptions[difficulty]}
                                     </p>
                                     </div>
                                     </div>
                                     </motion.button>
                                ))}</div>
                                </div>
                                <button onClick={onClose}
                                className="mt-6 w-full rounded-xl py-3 text-[#7A5A42] hover:bg-[#F4ECE3]">
                                Cancel</button>
                                </motion.div>
                                </>
                            )}
                            </AnimatePresence>
    );
}