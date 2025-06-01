// src/app/ClientLayoutWrapper.tsx
'use client';

import { ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroScreen from '../components/IntroScreen';
import ParticlesBackground from '../components/ParticlesBackground';
import Nav from './nav';

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);

  const handleFinishIntro = () => {
    setEntered(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* 1) Mostrar IntroScreen al inicio (sin Partículas) */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="intro-wrapper"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="absolute inset-0"
          >
            {/* PASAMOS handleFinishIntro como onFinish */}
            <IntroScreen onFinish={handleFinishIntro} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2) Una vez 'entered' sea true, renderizamos el portafolio completo */}
      {entered && (
        <>
          {/* Montamos las Partículas SÓLO tras la intro */}
          <ParticlesBackground />

          <div className="relative z-20">
            <Nav />
          </div>
          <main className="relative z-10 pt-20 px-4 sm:px-10">
            {children}
          </main>
        </>
      )}
    </div>
  );
}