"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Pull image from -10% to +10% within container during scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden w-full h-full bg-[#EAEAEA] rounded-sm",
        className
      )}
    >
      <motion.div
        className="absolute -top-[10%] left-0 w-full h-[120%] pointer-events-none"
        style={{ y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover transition-transform duration-700 ease-out hover:scale-105",
            imageClassName
          )}
        />
      </motion.div>
    </div>
  );
}
