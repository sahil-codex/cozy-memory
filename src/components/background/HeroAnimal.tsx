"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroAnimal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: [1, 1.03, 1],
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.6 },
        scale: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="flex justify-center mb-8"
    >
      <Image
        src="/animals/Hero.png"
        alt="Cozy Reindeer"
        width={220}
        height={220}
        priority
        className="w-auto h-80"
      />
    </motion.div>
  );
}