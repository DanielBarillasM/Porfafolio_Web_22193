'use client';

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState, useRef } from "react";

export default function AnimatedMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(true);
  const firstRender = useRef(true);

  useEffect(() => {
    // No hacemos nada en el primer montaje
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Ocultamos, esperamos un tick, y luego renderizamos la nueva ruta
    setShouldRender(false);
    const timeout = setTimeout(() => setShouldRender(true), 10);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {shouldRender && (
        <motion.main
          key={pathname}              // clave única por ruta
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="pt-20 px-4 sm:px-10 min-h-screen"
        >
          {children}
        </motion.main>
      )}
    </AnimatePresence>
  );
}