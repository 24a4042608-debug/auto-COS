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
    <section className="py-24 md:py-32 bg-[#08080C] relative overflow-hidden border-t border-white/[0.05]">
      {/* Translucent Editorial Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="font-serif text-[12vw] tracking-[0.35em] text-white uppercase">
          ATELIER
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 block">
            Craftsmanship Indices
          </span>
          <h2 className="font-serif text-white text-3xl tracking-wide uppercase">
            Atelier Metrics
          </h2>
          <div className="flex justify-center pt-2">
            <div className="w-16 h-[1px] bg-[#E50914]" />
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
              className="relative p-8 md:p-10 bg-white/[0.01] border border-white/[0.06] hover:border-[#E50914]/55 hover:bg-white/[0.02] transition-all duration-500 rounded-none group flex flex-col justify-between h-[260px] md:h-[300px]"
            >
              {/* Subtle gold shadow hover filter */}
              <div className="absolute inset-0 bg-[#E50914]/[0.005] group-hover:bg-[#E50914]/[0.02] transition-colors duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest font-sans block group-hover:text-zinc-400 transition-colors">
                  {metric.label}
                </span>
                
                <h3 className="font-serif text-4xl md:text-5xl text-white group-hover:text-[#E50914] transition-colors duration-300 tracking-wide">
                  {metric.value}
                </h3>
              </div>
              
              <p className="relative z-10 text-xs text-zinc-400 font-sans leading-relaxed pt-4 border-t border-white/[0.06] group-hover:text-zinc-300 transition-colors">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

