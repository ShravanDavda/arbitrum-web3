import { motion } from "framer-motion";
import { Box } from "lucide-react";

// Decorative animated blockchain illustration for the hero.
export function BlockchainOrb() {
  const nodes = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i / 6) * Math.PI * 2;
    const r = 140;
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r, i };
  });

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* rotating rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-6 rounded-full border border-primary/25"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-16 rounded-full border border-accent/25"
      />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl animate-glow-pulse" />

      {/* SVG connections */}
      <svg viewBox="-200 -200 400 400" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.68 0.19 265)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.68 0.22 305)" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % nodes.length];
          return (
            <motion.line
              key={i}
              x1={n.x} y1={n.y} x2={next.x} y2={next.y}
              stroke="url(#line)" strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1.2, delay: 0.1 * i }}
            />
          );
        })}
        {nodes.map((n, i) => (
          <motion.line
            key={`c-${i}`}
            x1={0} y1={0} x2={n.x} y2={n.y}
            stroke="url(#line)" strokeWidth="1" opacity="0.3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.2 + 0.08 * i }}
          />
        ))}
      </svg>

      {/* center block */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent blur-2xl opacity-70" />
          <div className="relative glass rounded-2xl p-6 border-primary/40">
            <Box className="w-10 h-10 text-primary" strokeWidth={1.8} />
          </div>
        </div>
      </motion.div>

      {/* outer nodes */}
      {nodes.map((n, i) => (
        <motion.div
          key={n.i}
          className="absolute top-1/2 left-1/2"
          style={{ x: n.x, y: n.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [n.y, n.y - 6, n.y] }}
          transition={{
            scale: { delay: 0.1 * i, duration: 0.5 },
            opacity: { delay: 0.1 * i, duration: 0.5 },
            y: { duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl glass flex items-center justify-center border-primary/30">
            <Box className="w-5 h-5 text-accent" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
