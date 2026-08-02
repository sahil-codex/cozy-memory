"use client";

import {motion} from "framer-motion";

export default function Glow(){
    return (
        <>
        <motion.div animate= {{
            x:[0,40,0],y:[0,-30,0],}}
            transition={{duration:12,repeat:Infinity,ease:"easeInOut"}}
            className="absolute left-20 top-24 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"
            />
        <motion.div animate={{x:[0,-60,0],y:[0,40,0],}}
        transition={{duration:15,repeat:Infinity,ease:"easeInOut"}}
        className="absolute right-16 bottom-20 h-96 w-96 rounded-full bg-yellow-200/20 blur-3xl"/>
            </>
    );
}