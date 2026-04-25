"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const romanticSpring = { type: "spring" as const, stiffness: 40, damping: 20 };

function TraitCard({
  index,
  title,
  description,
  icon,
  delay,
}: {
  index: number;
  title: string;
  description: string;
  icon: string;
  delay: number;
}) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ ...romanticSpring, delay }}
    >
      <div
        className="rounded-3xl p-8 md:p-10 backdrop-blur-sm border"
        style={{
          backgroundColor: "rgba(255, 240, 245, 0.6)",
          borderColor: "rgba(219, 112, 147, 0.15)",
        }}
      >
        <div className="flex items-start gap-5">
          <motion.span
            className="text-4xl md:text-5xl flex-shrink-0"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, delay: index * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {icon}
          </motion.span>
          <div>
            <h3
              className="text-2xl md:text-3xl font-light mb-3"
              style={{ fontFamily: "var(--font-serif)", color: "var(--accent-rose)" }}
            >
              {title}
            </h3>
            <p className="text-base md:text-lg leading-relaxed opacity-80">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function VersatilityMorph() {
  const morphRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: morphRef,
    offset: ["start 80%", "end 20%"],
  });

  const chaosOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1, 1, 0, 0]);
  const elegantOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0, 1, 1]);
  const chaosScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.8]);
  const elegantScale = useTransform(scrollYProgress, [0.4, 0.7], [0.8, 1]);

  return (
    <div ref={morphRef} className="max-w-3xl mx-auto mb-16">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ ...romanticSpring, delay: 0.2 }}
      >
        <div
          className="rounded-3xl p-8 md:p-10 backdrop-blur-sm border"
          style={{
            backgroundColor: "rgba(255, 240, 245, 0.6)",
            borderColor: "rgba(219, 112, 147, 0.15)",
          }}
        >
          <div className="flex items-start gap-5 mb-8">
            <motion.span
              className="text-4xl md:text-5xl flex-shrink-0"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              🎭
            </motion.span>
            <div>
              <h3
                className="text-2xl md:text-3xl font-light mb-3"
                style={{ fontFamily: "var(--font-serif)", color: "var(--accent-rose)" }}
              >
                Your versatility.
              </h3>
              <p className="text-base md:text-lg leading-relaxed opacity-80">
                How you can switch so seamlessly between two completely different energies — and both feel so authentically you.
              </p>
            </div>
          </div>

          <div className="relative h-[180px] md:h-[140px]">
            {/* State 1: Chaotic */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: chaosOpacity, scale: chaosScale }}
            >
              <div
                className="relative text-2xl md:text-4xl font-bold py-5 px-8 rounded-2xl text-white text-center"
                style={{
                  background: "linear-gradient(135deg, #FF69B4, #FF1493, #FF69B4)",
                  fontFamily: "var(--font-serif)",
                }}
              >
                <motion.span
                  className="absolute -top-2 -left-2 text-xl"
                  animate={{ rotate: [0, 20, -20, 0], y: [0, -5, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💀
                </motion.span>
                <motion.span
                  className="absolute -top-2 -right-2 text-xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  😭
                </motion.span>
                <motion.span
                  className="absolute -bottom-2 -left-1 text-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  🤪
                </motion.span>
                <motion.span
                  className="absolute -bottom-2 -right-1 text-xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.span>
                Brainrotted 12yr old
              </div>
            </motion.div>

            {/* State 2: Elegant */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: elegantOpacity, scale: elegantScale }}
            >
              <div
                className="text-2xl md:text-4xl font-light py-5 px-8 rounded-2xl border-2 text-center"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--text-main)",
                  borderColor: "var(--accent-rose)",
                  backgroundColor: "rgba(255, 240, 245, 0.9)",
                }}
              >
                Mature 25yr old Woman
              </div>
            </motion.div>
          </div>

          <p className="text-center text-sm opacity-40 italic mt-4">
            (keep scrolling to witness the transformation)
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function SectionDuality() {
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });

  const lightLeakX = useTransform(scrollYProgress, [0.1, 0.5], ["-100%", "200%"]);

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Section Header */}
      <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-24">
        <motion.p
          className="text-lg md:text-xl mb-4 uppercase tracking-[0.3em] opacity-60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={romanticSpring}
        >
          Chapter Three
        </motion.p>

        <div className="relative overflow-hidden inline-block">
          <motion.h2
            className="text-5xl md:text-8xl font-light leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...romanticSpring, delay: 0.2 }}
          >
            What I like about{" "}
            <span style={{ color: "var(--accent-rose)" }}>you.</span>
          </motion.h2>

          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              x: lightLeakX,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
              width: "50%",
            }}
          />
        </div>
      </div>

      {/* Trait 1: Faith */}
      <div className="max-w-3xl mx-auto mb-16">
        <TraitCard
          index={0}
          icon="✝️"
          title="Your faith in God."
          description="The way you carry your belief — quietly, beautifully, unapologetically. It's one of the most admirable things about you. There's something so grounding about someone who holds their faith close."
          delay={0.1}
        />
      </div>

      {/* Trait 2: Versatility / Duality Morph */}
      <VersatilityMorph />

      {/* Trait 3: Kind & Empathetic */}
      <div className="max-w-3xl mx-auto mb-16">
        <TraitCard
          index={2}
          icon="💗"
          title="How kind and empathetic you are."
          description="You feel things deeply and you care so genuinely. The way you show up for people, the way you listen — it's rare and it's beautiful. The world could use a thousand more of you."
          delay={0.3}
        />
      </div>

      {/* Trait 4: Peaceful Presence */}
      <div className="max-w-3xl mx-auto">
        <TraitCard
          index={3}
          icon="🕊️"
          title="Your presence — so peaceful."
          description="There's this calm that comes with just being around you. No chaos, no pretense. Just this warm, peaceful energy that makes everything feel okay. It's your superpower."
          delay={0.4}
        />
      </div>
    </section>
  );
}
