"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

const romanticSpring = { type: "spring" as const, stiffness: 40, damping: 20 };

function DigitalCounter({ target, inView }: { target: string; inView: boolean }) {
  const [display, setDisplay] = useState("00:00");

  useEffect(() => {
    if (!inView) return;

    const targetMinutes = 23 * 60 + 2;
    const duration = 2500;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentMinutes = Math.floor(eased * targetMinutes);

      const hours = Math.floor(currentMinutes / 60);
      const mins = currentMinutes % 60;
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

      setDisplay(`${displayHours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")} ${period}`);

      if (progress >= 1) {
        clearInterval(interval);
        setDisplay(target);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [inView, target]);

  return (
    <span className="font-mono text-5xl md:text-8xl tracking-wider" style={{ color: "var(--accent-rose)" }}>
      {display}
    </span>
  );
}

export default function SectionSpark() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y: yPos });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent, #FFD5C8, transparent)",
          opacity: bgOpacity,
        }}
      />

      <div ref={ref} className="relative z-10 max-w-4xl w-full text-center">
        <motion.p
          className="text-lg md:text-xl mb-4 uppercase tracking-[0.3em] opacity-60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={romanticSpring}
        >
          Chapter Two
        </motion.p>

        <motion.h2
          className="text-4xl md:text-6xl font-light mb-16 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...romanticSpring, delay: 0.2 }}
        >
          We started talking on<br />
          <span style={{ color: "var(--accent-rose)" }}>15th March, 11:02 PM.</span>
        </motion.h2>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...romanticSpring, delay: 0.4 }}
        >
          <DigitalCounter target="11:02 PM" inView={isInView} />
        </motion.div>

        <motion.div
          className="relative inline-block mx-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...romanticSpring, delay: 0.6 }}
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{ boxShadow: "0 25px 80px rgba(219,112,147,0.25)" }}
          >
            <Image
              src="/first-chat.jpg"
              alt="Our first chat"
              width={400}
              height={700}
              className="w-full max-w-sm"
            />
          </div>

          <motion.p
            className="mt-6 text-sm opacity-50 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            the message that started it all
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
