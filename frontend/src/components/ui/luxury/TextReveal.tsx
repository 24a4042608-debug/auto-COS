"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function TextReveal({
  text,
  className,
  once = true,
  delay = 0,
  tag: Tag = 'h2',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
      transition: { ease: [0.215, 0.61, 0.355, 1] as const, duration: 0.6 },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: [0.215, 0.61, 0.355, 1] as const, duration: 0.8 },
    },
  };

  return (
    <Tag ref={ref as any} className={cn("overflow-hidden flex flex-wrap", className)}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap gap-x-[0.2em] gap-y-0.5"
      >
        {words.map((word, index) => (
          <span key={index} className="relative overflow-hidden inline-block py-[0.05em]">
            <motion.span
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
