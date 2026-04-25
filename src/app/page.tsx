"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import MusicToggle from "@/components/MusicToggle";
import PasswordGate from "@/components/PasswordGate";
import SectionEncounter from "@/components/SectionEncounter";
import SectionSpark from "@/components/SectionSpark";
import SectionDuality from "@/components/SectionDuality";
import SectionAnchor from "@/components/SectionAnchor";
import SectionFinale from "@/components/SectionFinale";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {!unlocked && <PasswordGate onUnlock={() => setUnlocked(true)} />}
      </AnimatePresence>

      {unlocked && (
        <LenisProvider>
          <MusicToggle />
          <main>
            <SectionEncounter />
            <SectionSpark />
            <SectionDuality />
            <SectionAnchor />
            <SectionFinale />
          </main>
        </LenisProvider>
      )}
    </>
  );
}
