"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const romanticSpring = { type: "spring" as const, stiffness: 40, damping: 20 };

function RosePetal({ delay, left, size, duration }: { delay: number; left: string; size: number; duration: number }) {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{ left }}
      initial={{ y: "-10vh", rotate: 0, opacity: 0 }}
      animate={{
        y: "110vh",
        rotate: 720,
        x: [0, 30, -20, 40, 0],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        ease: "linear",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path
          d="M20 2C20 2 8 10 8 22C8 30 13 36 20 38C27 36 32 30 32 22C32 10 20 2 20 2Z"
          fill="rgba(219, 112, 147, 0.6)"
        />
        <path
          d="M20 5C20 5 12 12 12 22C12 28 15 33 20 35C25 33 28 28 28 22C28 12 20 5 20 5Z"
          fill="rgba(219, 112, 147, 0.4)"
        />
      </svg>
    </motion.div>
  );
}

function PetalStorm() {
  const [petals, setPetals] = useState<Array<{ id: number; delay: number; left: string; size: number; duration: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      delay: Math.random() * 4,
      left: `${Math.random() * 100}%`,
      size: 15 + Math.random() * 25,
      duration: 5 + Math.random() * 6,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((p) => (
        <RosePetal key={p.id} {...p} />
      ))}
    </div>
  );
}

const svgPath = "M 10 80 Q 30 10 50 80 Q 60 10 80 80 Q 100 10 120 80 Q 140 10 160 80 Q 170 40 190 80 L 190 90 Q 170 85 160 90 Q 140 60 120 90 Q 100 60 80 90 Q 60 60 50 90 Q 30 60 10 90 Z";

export default function SectionFinale() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const pathLength = useTransform(scrollYProgress, [0.3, 0.9], [0, 1]);
  const [showPetals, setShowPetals] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.5 && !showPetals) setShowPetals(true);
    });
    return unsubscribe;
  }, [scrollYProgress, showPetals]);

  return (
    <section ref={ref} className="relative min-h-[150vh] py-32 px-6 overflow-hidden">
      {showPetals && <PetalStorm />}

      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center">
        <motion.p
          className="text-lg md:text-xl mb-4 uppercase tracking-[0.3em] opacity-60 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={romanticSpring}
        >
          The Finale
        </motion.p>

        <div className="relative z-10 mb-12">
          <svg
            viewBox="0 0 200 100"
            className="w-[300px] md:w-[500px] h-auto"
          >
            <motion.path
              d={svgPath}
              fill="none"
              stroke="var(--accent-rose)"
              strokeWidth="1.5"
              style={{ pathLength }}
            />
            <motion.path
              d={svgPath}
              fill="var(--accent-rose)"
              style={{ opacity: useTransform(pathLength, [0.8, 1], [0, 0.2]) }}
            />
          </svg>
        </div>

        <motion.h2
          className="text-5xl md:text-9xl font-light text-center leading-tight relative z-10"
          style={{ fontFamily: "var(--font-serif)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...romanticSpring, delay: 0.3 }}
        >
          Happy Birthday,
          <br />
          <span style={{ color: "var(--accent-rose)" }}>Love.</span>
        </motion.h2>

        <motion.p
          className="mt-8 text-lg md:text-xl opacity-60 text-center max-w-md relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          Here&apos;s to another year of you being the most incredible person I know.
        </motion.p>

        <motion.div
          className="mt-16 text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-sm opacity-40 tracking-widest uppercase">
            Made with love by Asher
          </p>
          <div className="mt-4 flex justify-center gap-2">
            {["🌹", "🌸", "💐", "🌺", "🌷"].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
