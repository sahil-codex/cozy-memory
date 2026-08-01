"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

type AnimatedButtonProps = {
    children:ReactNode;
    onClick?:()=>void;
    className?:string;
};

export default function AnimatedButton({
    children,
    onClick,
    className,
}:AnimatedButtonProps){
    return(
        <motion.button
        whileHover = {{
            scale:1.05,
            y:-2,
        }}
        transition={{
            type:"spring",
            stiffness:450,
            damping:18,
        }}
        onClick={onClick}
        className={clsx(
            "rounded-2xl",
            "bg-[#C58B5A]",
            "px-8",
            "py-4",
            "text-lg",
            "font-bold",
            "text-white",
            "shadow-lg",
            "shadow-orange-200/40",
            "transition-colors",
            "hover:bg-[#B87A45]",
            className
        )}
        >
            {children}
        </motion.button>
    );
}