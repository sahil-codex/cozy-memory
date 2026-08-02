"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Leaf = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
};

export default function FloatingLeaves(){
    const [leaves,setLeaves] = useState<Leaf[]>([]);
    useEffect(
  () =>{
    setLeaves(
    Array.from({ length: 8 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      duration: 18 + Math.random() * 10,
      delay: Math.random() * 8,
      size: 18 + Math.random() * 10,
    }))
    );
   },
  []);

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {leaves.map((leaf)=>(
                    <motion.div key={leaf.id} initial = {{y:-100,x:`${leaf.left}vw`,rotate:0,opacity:0,}}
                    animate={{y:"110vh",x:[`${leaf.left}vw`,`${leaf.left+4}vw`,`${leaf.left-3}vw`,`${leaf.left+2}vw`,],rotate:[0,40,-40,25],opacity:[0,1,1,0],}}
                    transition={{duration:leaf.duration,delay:leaf.delay,repeat: Infinity,ease: "linear",}}
                    style={{width:leaf.size,height:leaf.size,}}
                className="absolute">
                    <svg viewBox="0 0 24 24" fill="#C58B5A" className="w-full h-full opacity-60">
                        <path d = "M12 2C6 5 4 10 5 14c1.5 5 6 8 7 8s5.5-3 7-8c1-4-1-9-7-12z"/>
                    </svg>
                    </motion.div>
            ))}
        </div>
    );
}