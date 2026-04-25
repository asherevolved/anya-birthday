"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const romanticSpring = { type: "spring" as const, stiffness: 40, damping: 20 };

const photos = [
  { src: "/photo-1.jpg", rotation: -6, caption: "us being us" },
  { src: "/photo-2.jpg", rotation: 4, caption: "golden hour" },
  { src: "/photo-3.jpg", rotation: -3, caption: "main characters" },
  { src: "/photo-4.jpg", rotation: 7, caption: "forever grateful" },
];

export default function SectionAnchor() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const spread = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <section ref={ref} className="relative min-h-[150vh] py-32 px-6 overflow-hidden">
      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center">
        <motion.p
          className="text-lg md:text-xl mb-4 uppercase tracking-[0.3em] opacity-60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={romanticSpring}
        >
          Chapter Four
        </motion.p>

        <motion.h2
          className="text-4xl md:text-7xl font-light mb-20 text-center leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...romanticSpring, delay: 0.2 }}
        >
          Thanks for being an<br />
          <span style={{ color: "var(--accent-rose)" }}>amazing best friend.</span>
        </motion.h2>

        <div className="relative w-full max-w-5xl h-[400px] flex items-center justify-center">
          {photos.map((photo, i) => {
            const centerOffset = i - (photos.length - 1) / 2;
            const xTarget = centerOffset * 220;
            const rotTarget = photo.rotation;

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  x: useTransform(spread, [0, 1], [0, xTarget]),
                  rotate: useTransform(spread, [0, 1], [0, rotTarget]),
                  zIndex: photos.length - Math.abs(centerOffset),
                }}
              >
                <div
                  className="bg-white p-3 pb-12 rounded shadow-xl w-[180px] md:w-[200px]"
                  style={{ boxShadow: "0 15px 50px rgba(95,75,75,0.15)" }}
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm">
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p
                    className="absolute bottom-3 left-0 right-0 text-center text-xs opacity-60 italic"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
