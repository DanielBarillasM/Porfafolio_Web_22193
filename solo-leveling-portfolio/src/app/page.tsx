// src/app/page.tsx
'use client';

import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Home() {
  // =============================================
  // 1) VARIANTES DE FRAMER MOTION PARA LOS "CARDS"
  // =============================================
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.5 + i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
    hover: { scale: 1.05, boxShadow: "0 0 15px rgba(59,130,246,0.5)" },
  };

  // =============================================
  // 2) FRASES ALEATORIAS (CAMBIAN AL HACER CLIC)
  // =============================================
  const frases = [
    "“El código es poesía; mantenlo limpio.”",
    "“La simplicidad es la máxima sofisticación.”",
    "“Aprende de tus errores, no los repitas.”",
    "“La mejor manera de predecir el futuro es crearlo.”",
    "“Siempre en modo creativo, nunca en modo copia.”",
  ];
  const [fraseActual, setFraseActual] = useState(
    frases[Math.floor(Math.random() * frases.length)]
  );
  const cambiarFrase = () => {
    const indice = Math.floor(Math.random() * frases.length);
    setFraseActual(frases[indice]);
  };

  // =============================================
  // 3) RENDER DEL COMPONENTE
  // =============================================
  return (
    <>
      {/* Partículas de fondo (siempre en z-0) */}
      <ParticlesBackground />

      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 text-center overflow-hidden bg-transparent">
        {/* Contenedor principal (primera capa, z-10) */}
        <div className="z-10 flex flex-col items-center justify-center space-y-6">
          {/* Texto animado tipo “typing” */}
          <TypeAnimation
            sequence={[
              "Bienvenido a mi portafolio",
              2000,
              "Soy Daniel Barillas",
              2000,
              "¡Descubre más de mis trabajos y proyectos!",
              2000,
              "Se dice que: No documentes el problema; arréglalo",
              2000,
            ]}
            wrapper="h1"
            cursor={true}
            repeat={Infinity}
            className="text-4xl sm:text-6xl font-extrabold text-blue-500 drop-shadow-lg animate-glow"
          />

          {/* Nombre y descripción */}
          <motion.p
            className="text-lg sm:text-xl text-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Pablo Daniel Barillas Moreno
          </motion.p>
          <motion.p
            className="text-sm sm:text-base text-gray-300 max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Estudiante de la Universidad del Valle de Guatemala. explora mi portafolio
            y descubre mis proyectos favoritos.
          </motion.p>

          {/* Grid de “cards” dinámicos (z-20) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* 1) CARD: MENSAJE ESTÁTICO */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="relative group bg-white/10 backdrop-blur-md rounded-xl border border-blue-400/30 p-6 flex flex-col items-center justify-center cursor-default transition-colors"
            >
              <span className="text-sm text-blue-400 uppercase tracking-wide">
                ¡Bienvenido!
              </span>
              <p className="mt-2 text-center text-white">
                {"¡Explora mi portafolio y descubre mis proyectos favoritos!"}
              </p>
            </motion.div>

            {/* 2) CARD: FRASE ALEATORIA */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={cambiarFrase}
              className="relative group bg-white/10 backdrop-blur-md rounded-xl border border-green-400/30 p-6 flex flex-col items-center justify-center cursor-pointer transition-colors"
            >
              <span className="text-sm text-green-400 uppercase tracking-wide">
                Haz clic para cambiar frase
              </span>
              <p className="mt-2 text-center text-white italic">
                “{fraseActual}”
              </p>
            </motion.div>
          </div>
        </div>

        {/* Indicador de scroll (z-10) */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center space-y-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <div className="w-1 h-6 bg-blue-400 rounded-full animate-bounce" />
          <span className="text-xs text-gray-300">Desplázate</span>
        </motion.div>
      </main>
    </>
  );
}