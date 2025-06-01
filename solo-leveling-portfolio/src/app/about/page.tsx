'use client';

import PageWrapper from "@/components/PageWrapper";
import ParticlesBackground from "@/components/ParticlesBackground";
import { motion } from "framer-motion";

export default function AboutPage() {
  // Variantes de animación para el título y subtítulos
  const titleVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const subtitleVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.6, duration: 0.8 } },
  };

  return (
    <>
      {/* Fondo de partículas en z-0 */}
      <ParticlesBackground />

      <PageWrapper>
        <main className="relative z-10 min-h-screen flex flex-col items-center px-6 py-16 sm:px-10 lg:px-20">
          {/* 1) Título “Sobre mí” animado */}
          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold text-center text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)] tracking-wider mb-6"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            Sobre mí
          </motion.h1>

          {/* 2) Subtítulo o descripción breve */}
          <motion.p
            className="text-center text-gray-300 mb-12 sm:mb-16 max-w-2xl"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            ¡Hola! Soy <span className="font-semibold text-cyan-300">Pablo Daniel Barillas Moreno</span>, estudiante
            de la Universidad del Vallle de Guatemala. <br />
            En este portafolio podrás ver mis trabajos y proyectos.
          </motion.p>

          {/* 3) Contenedor “glass” con información detallada */}
          <motion.div
            className="mx-auto w-full max-w-2xl bg-white/10 backdrop-blur-md border border-cyan-300/30 rounded-2xl p-8 sm:p-12 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.0, duration: 0.8 } }}
          >
            <p className="mb-4 text-lg leading-relaxed text-gray-200">
              Soy un apasionado del desarrollo web y la ciberseguridad, con especial interés en animaciones e interactividad. 
              Me encanta experimentar con tecnologías modernas de Front-end como React, Next.js y Tailwind CSS, y crear efectos
              visuales de vanguardia.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-gray-200">
              Este portafolio recoge mis trabajos. Desde trabajos de HTML hasta proyectos más complejos con React y APIs, 
              encontrarás cada ejercicio reflejado aquí.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-gray-200">
              ¡Gracias por visitar mi sitio! Si tienes alguna duda o propuesta de colaboración, no dudes en contactarme.
            </p>
            <p className="text-lg leading-relaxed text-gray-200">
              Contacto vía correo: bar22193@uvg.edu.gt
            </p>
          </motion.div>
        </main>
      </PageWrapper>
    </>
  );
}