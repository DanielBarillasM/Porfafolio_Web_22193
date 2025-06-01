'use client';

import ParticlesBackground from '../../components/ParticlesBackground';
import PageWrapper from '../../components/PageWrapper';
import FnafMiniGame from '../../components/FnafMiniGame';
import { motion } from 'framer-motion';

export default function EasterEggsPage() {
  return (
    <>
      {/* Partículas de fondo, montadas en z-index 0 */}
      <ParticlesBackground />

      <PageWrapper>
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 sm:px-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400 drop-shadow-lg mb-8 animate-glow">
            ¡Easter Eggs / Mini-Juego!
          </h1>
          <p className="text-gray-300 mb-6">
            Sobrevive a Freddy cerrando la puerta a tiempo…  
            ¿Puedes llegar hasta la mañana 4?
          </p>

          {/* Aquí se monta tu mini-juego. Verifica que la ruta y nombre coincidan */}
          <FnafMiniGame />
        </main>
      </PageWrapper>
    </>
  );
}
