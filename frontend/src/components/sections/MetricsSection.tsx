"use client";

import { motion } from "framer-motion";

export default function MetricsSection() {
  const metrics = [
    {
      label: "Establishment",
      value: "2025",
      description: "Year of our digital Atelier foundation",
    },
    {
      label: "Fibre Traceability",
      value: "98%",
      description: "Organic wool and linen sourced from certified regenerative lands",
    },
    {
      label: "Bespoke Geometry",
      value: "40",
      description: "Limited-run structural silhouettes produced per season",
    },
    {
      label: "Natural Initiatives",
      value: "100%",
      description: "Zero-Dye Mongolian cashmere knits preserving original hues",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const } },
  };

  return (
    <section className="py-32 md:py-44 bg-[#FAF8F5] relative overflow-hidden border-t border-luxury-border/40">
      {/* Translucent Editorial Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span className="font-serif text-[12vw] tracking-[0.35em] text-luxury-text-primary uppercase">
          ATELIER
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-20 text-center space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-text-secondary block">
            Craftsmanship Indices
          </span>
          <h2 className="font-serif text-luxury-heading text-luxury-text-primary tracking-wide uppercase">
            Atelier Metrics
          </h2>
          <div className="flex justify-center pt-2">
            <div className="w-16 h-[1px] bg-luxury-gold" />
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative p-8 md:p-10 bg-white border border-luxury-border/60 hover:border-luxury-gold transition-colors duration-500 rounded-none group flex flex-col justify-between h-[280px] md:h-[320px]"
            >
              {/* Subtle gold shadow hover filter */}
              <div className="absolute inset-0 bg-luxury-gold/[0.01] group-hover:bg-luxury-gold/[0.03] transition-colors duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <span className="text-[9px] text-luxury-text-secondary font-bold uppercase tracking-widest font-sans block">
                  {metric.label}
                </span>
                
                <h3 className="font-serif text-4xl md:text-5xl text-luxury-gold tracking-wide">
                  {metric.value}
                </h3>
              </div>
              
              <p className="relative z-10 text-xs text-luxury-text-secondary font-sans leading-relaxed pt-4 border-t border-luxury-border/30">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
