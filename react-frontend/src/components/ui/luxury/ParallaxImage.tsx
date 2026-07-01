import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden w-full h-full bg-[#111115] rounded-sm group",
        className
      )}
    >
      <motion.div
        className="absolute -top-[10%] left-0 w-full h-[120%]"
        style={{ y }}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
            imageClassName
          )}
        />
      </motion.div>
    </div>
  );
}
