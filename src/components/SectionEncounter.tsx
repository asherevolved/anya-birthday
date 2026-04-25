"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const romanticSpring = { type: "spring" as const, stiffness: 40, damping: 20 };

export default function SectionEncounter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showHalo, setShowHalo] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y: yPos });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden">
      <motion.div style={{ y, opacity }} className="max-w-4xl w-full text-center">
        <motion.p
          className="text-lg md:text-xl mb-4 uppercase tracking-[0.3em] opacity-60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={romanticSpring}
        >
          Chapter One
        </motion.p>

        <motion.h2
          className="text-4xl md:text-7xl font-light mb-16 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...romanticSpring, delay: 0.2 }}
        >
          it started off with an<br />
          <span style={{ color: "var(--accent-rose)" }}>Instagram comment.</span>
        </motion.h2>

        <motion.div
          className="relative inline-block mx-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...romanticSpring, delay: 0.4 }}
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 15}deg) rotateX(${-mousePos.y * 15}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{ boxShadow: "0 25px 80px rgba(219,112,147,0.25)" }}
          >
            <Image
              src="/first-comment.jpg"
              alt="The first Instagram comment"
              width={500}
              height={600}
              className="w-full max-w-md"
            />

            <div
              className="absolute top-4 left-4 w-12 h-12 rounded-full cursor-pointer"
              onMouseEnter={() => setShowHalo(true)}
              onMouseLeave={() => setShowHalo(false)}
            >
              {showHalo && (
                <motion.svg
                  className="absolute -top-3 -left-3 w-18 h-18"
                  viewBox="0 0 72 72"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ellipse
                    cx="36" cy="16" rx="20" ry="8"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2.5"
                    opacity="0.8"
                  />
                  <ellipse
                    cx="36" cy="16" rx="24" ry="10"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                </motion.svg>
              )}
            </div>
          </div>

          <motion.p
            className="mt-6 text-sm opacity-50 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            hover the profile picture for a surprise ✨
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
