// src/components/IntroScreen.tsx
'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroScreenProps {
  onFinish: () => void;
}

export default function IntroScreen({ onFinish }: IntroScreenProps) {
  useEffect(() => {
    // 7 s de animación antes de cerrar
    const timer = setTimeout(onFinish, 7000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  // Variantes para el contenedor
  const wrapperVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit:    { opacity: 0, transition: { duration: 1 } },
  };

  // Animaciones de los círculos concéntricos
  const circleVariants = {
    hidden:  { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.5, duration: 2, ease: 'easeInOut' },
    }),
    exit:    { opacity: 0, transition: { duration: 1 } },
  };

  // Animación del título
  const titleVariants = {
    hidden:  { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 1.5, duration: 1 } },
    exit:    { opacity: 0, transition: { duration: 0.5 } },
  };

  // Animación del subtítulo
  const subtitleVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 2.5, duration: 1 } },
    exit:    { opacity: 0, transition: { duration: 0.5 } },
  };

  // Tres tamaños de círculos
  const sizes = [240, 300, 360];

  return (
    <motion.div
      className="introScreen"
      variants={wrapperVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* NO montamos Particles acá, solo círculos y texto */}
      <div className="introContent">
        {sizes.map((sz, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={circleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="runeCircle"
            style={{
              width:      `${sz}px`,
              height:     `${sz}px`,
              top:        '50%',
              left:       '50%',
              marginTop:  `-${sz / 2}px`,
              marginLeft: `-${sz / 2}px`,
            }}
          />
        ))}

        <motion.h1
          className="introTitle"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          “En ocasiones un software termina siendo un jardín abandonado lleno de malas hierbas”
        </motion.h1>

        <motion.h1
          className="introTitle"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          - Rafael Gómez
        </motion.h1>

        <motion.p
          className="introSubtitle"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          Portafolio by: Daniel Barillas
        </motion.p>
      </div>

      {/* Viñeta radial para oscurecer bordes */}
      <div className="vignette" />

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;700&display=swap');

        .introScreen {
          position: fixed;
          inset: 0;
          background: #0d0d0d;
          overflow: hidden;
          z-index: 20; /* Por encima de todo */
        }
        .introContent {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        .runeCircle {
          position: absolute;
          border-radius: 50%;
          border: 3px solid #f39c12;
          box-shadow:
            0 0 20px rgba(243,156,18,0.6),
            inset 0 0 10px rgba(211,84,0,0.6);
        }
        .introTitle {
          margin: 0;
          font-family: 'Rajdhani', sans-serif;
          font-size: 4rem;
          color: #f39c12;
          letter-spacing: 0.5rem;
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(243,156,18,0.8);
          z-index: 11;
        }
        .introSubtitle {
          margin-top: 1rem;
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.25rem;
          color: #ecf0f1;
          letter-spacing: 0.2rem;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
          z-index: 11;
        }
        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 60%, #0d0d0d 100%);
          pointer-events: none;
          z-index: 5;
        }
      `}</style>
    </motion.div>
  );
}