'use client';

import PageWrapper from "@/components/PageWrapper";
import ParticlesBackground from "@/components/ParticlesBackground";
import { motion } from "framer-motion";

export default function LabsPage() {
  // Animación “glow” para el título
  const titleVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Lista de trabajos
  const labs = [
    { title: "El internet antes de la web", url: "https://danielbarillasm.github.io/Lab-1-El-internet-antes-de-la-web/" },
    { title: "Administración de servidores remotos", url: "https://danielbarillasm.github.io/Lab-2-Administraci-n-de-servidores-remotos/" },
    { title: "HTML only", url: "https://danielbarillasm.github.io/22193.devng.online-lab3/" },
    { title: "CSS only", url: "https://danielbarillasm.github.io/Lab-4-CSS-only/" },
    { title: "JS only", url: "https://danielbarillasm.github.io/Lab5_JSOnly_22193/" },
    { title: "Backend only - Parte 1", url: "https://github.com/DanielBarillasM/Lab6_BackendOnly-Parte_1_22193.git" },
    { title: "Backend only - Parte 2", url: "https://github.com/DanielBarillasM/Lab6_BackendOnly-Parte_1_22193/tree/Lab6_BackendOnly-Parte_2_22193" },
    { title: "React only", url: "https://danielbarillasm.github.io/" },
  ];

  return (
    <>
      {/* Fondo de partículas en z-0 */}
      <ParticlesBackground />

      <PageWrapper>
        <main className="relative z-10 min-h-screen px-6 py-16 sm:px-10 lg:px-20 flex flex-col">
          {/* 1) Título principal animado */}
          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold text-center text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] tracking-wider mb-6"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
           Trabajos 
          </motion.h1>

          {/* 2) Subtítulo opcional animado */}
          <motion.p
            className="text-center text-gray-300 mb-12 sm:mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.8 } }}
          >
            Aquí encontrarás todos los trabajos que he desarrollado.<br />
            Haz clic en cada uno para consultar el ejercicio correspondiente y/o el repositorio.
          </motion.p>

          {/* 3) Grid de tarjetas “glassmorphism” */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {labs.map((lab, idx) => (
              <motion.a
                key={lab.title}
                href={lab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group h-40 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 + idx * 0.2, duration: 0.6 } }}
                whileHover={{ scale: 1.03 }}
              >
                {/* Fondo difuminado (glass) */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-blue-300/40 rounded-xl transition-colors group-hover:bg-white/20" />

                {/* Contenido de la tarjeta */}
                <div className="relative z-10 flex h-full items-center justify-center px-4">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white drop-shadow-md group-hover:text-blue-300 transition-colors text-center">
                    {lab.title}
                  </h2>
                </div>

                {/* Bordes neón animados en hover */}
                <span className="pointer-events-none absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            ))}
          </div>
        </main>
      </PageWrapper>
    </>
  );
}