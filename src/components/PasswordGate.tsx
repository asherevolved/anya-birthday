"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const romanticSpring = { type: "spring" as const, stiffness: 40, damping: 20 };

export default function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === "1503") {
      setUnlocked(true);
      setTimeout(onUnlock, 1200);
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <AnimatePresence>
      {!unlocked ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "var(--bg-primary)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full opacity-20"
                style={{
                  backgroundColor: "var(--accent-rose)",
                  width: 200 + i * 80,
                  height: 200 + i * 80,
                  left: `${15 + i * 12}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          <motion.div
            className="relative z-10 text-center px-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={romanticSpring}
          >
            <motion.div
              className="text-6xl mb-8"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🌹
            </motion.div>

            <h1
              className="text-4xl md:text-6xl font-light mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-serif)", color: "var(--text-main)" }}
            >
              The Petals of Us
            </h1>

            <p className="text-lg mb-10 opacity-70" style={{ color: "var(--text-main)" }}>
              Enter the date we first crossed paths.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
              <motion.input
                data-hover
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="DD / MM"
                className="w-48 text-center text-3xl py-4 bg-transparent border-b-2 tracking-[0.5em] placeholder:tracking-normal placeholder:text-lg"
                style={{
                  color: "var(--text-main)",
                  borderColor: error ? "#e74c3c" : "var(--accent-rose)",
                  fontFamily: "var(--font-serif)",
                }}
                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              />

              <motion.button
                data-hover
                type="submit"
                className="mt-6 px-10 py-3 rounded-full text-white text-sm tracking-widest uppercase"
                style={{ backgroundColor: "var(--accent-rose)" }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(219,112,147,0.4)" }}
                whileTap={{ scale: 0.95 }}
                transition={romanticSpring}
              >
                Unlock
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      ) : (
        <>
          <motion.div
            className="fixed top-0 left-0 right-0 z-[100]"
            style={{ backgroundColor: "var(--bg-primary)", height: "50vh" }}
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[100]"
            style={{ backgroundColor: "var(--bg-primary)", height: "50vh" }}
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
