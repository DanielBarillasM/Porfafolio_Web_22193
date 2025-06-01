'use client';

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Fnaf8BitGameElaborate() {
  type Phase = "waiting" | "alert" | "survived" | "dead";

  const [phase, setPhase] = useState<Phase>("waiting");
  const [countdown, setCountdown] = useState(0);
  const [round, setRound] = useState(0);
  const [battery, setBattery] = useState(5);
  const [clicksRequired] = useState(2); // Siempre requerimos 2 clics
  const [animImage, setAnimImage] = useState<string>(""); // URL a mostrar
  const [imgError, setImgError] = useState(false); // Para mostrar placeholder si hay error

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const clickRef = useRef(0);

  // 1) Cuando phase === "waiting", reiniciamos todo y luego lanzamos el timer aleatorio
  useEffect(() => {
    if (phase === "waiting") {
      setBattery(5);
      clickRef.current = 0;
      setImgError(false);
      setAnimImage(""); // Limpio la imagen para forzar nueva carga en la próxima alerta

      const delay = 2000 + Math.random() * 3000; // 2s – 5s
      timerRef.current = setTimeout(() => {
        setPhase("alert");
        setCountdown(7); // 7 segundos para reaccionar
      }, delay);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase]);

  // 2) Cuenta regresiva durante phase === "alert"
  useEffect(() => {
    if (phase === "alert" && countdown > 0) {
      // Si aún no tenemos URL de imagen, solicitamos una de Picsum
      if (!animImage) {
        // Picsum Photos genera una imagen random cada vez que cambian los parámetros.
        // Usamos un tamaño cercano al contenedor (96×76) y un seed aleatorio.
        const randomSeed = Math.floor(Math.random() * 10000);
        setAnimImage(`https://picsum.photos/seed/horror${randomSeed}/96/76`);
      }

      const id = setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 1000);
      return () => clearTimeout(id);
    }

    if (phase === "alert" && countdown === 0) {
      // Se acabó el tiempo sin cerrar correctamente
      setPhase("dead");
    }
  }, [phase, countdown, animImage, clicksRequired]);

  // 3) Al hacer clic en “Cerrar puerta”, consumimos batería y contamos clicks
  const handleInteract = () => {
    if (phase !== "alert") return;

    setBattery((b) => Math.max(b - 1, 0));
    clickRef.current += 1;

    // Si ya dio al menos clicksRequired antes de quedarse sin batería y aún hay tiempo:
    if (
      clickRef.current >= clicksRequired &&
      countdown > 0 &&
      battery > 0
    ) {
      if (round + 1 >= 3) {
        setPhase("survived");
      } else {
        setRound((r) => r + 1);
        setPhase("waiting");
      }
    }
  };

  // 4) Si la batería llega a 0 antes de completar los clicks, muere
  useEffect(() => {
    if (
      phase === "alert" &&
      battery === 0 &&
      clickRef.current < clicksRequired
    ) {
      setPhase("dead");
    }
  }, [battery, phase, clicksRequired]);

  // 5) Reiniciar todo para jugar de nuevo
  const restartGame = () => {
    setRound(0);
    setPhase("waiting");
    setCountdown(0);
    setBattery(5);
    setImgError(false);
    setAnimImage("");
    clickRef.current = 0;
  };

  return (
    <div className="container">
      <div className="screen">
        {/* --- FASE “WAITING” --- */}
        {phase === "waiting" && (
          <div className="content">
            <h2 className="title">NOCHE {round + 1}</h2>
            <p className="text">MANTENTE ALERTA… ALGO SE ACERCA.</p>
            <div className="pixel-box idle-box">...</div>
            <p className="subtext">Recargando batería...</p>
            <div className="battery-bar">
              <div
                className="battery-level recharge"
                style={{ width: `${(5 - battery) * 20}%` }}
              />
            </div>
          </div>
        )}

        {/* --- FASE “ALERT” --- */}
        {phase === "alert" && (
          <div className="content">
            <h2 className="title danger">¡FREDDY APARECE!</h2>

            <div className="anim-container">
              {/*
                Sólo renderizamos <Image> si:
                 1) animImage !== "" (ya se solicitó una URL),
                 OR 2) imgError === true (fallback al placeholder).
              */}
              {(animImage !== "" || imgError) && (
                <Image
                  src={imgError ? "/placeholder.png" : animImage}
                  alt="Animatrónico"
                  width={96}
                  height={76}
                  className="anim-image"
                  onError={() => setImgError(true)}
                  priority
                />
              )}
            </div>

            <p className="text">CIERRA LA PUERTA EN: {countdown}s</p>

            <div className="battery-container">
              <div className="battery-info">Batería: {battery} ⚡</div>
              <div className="battery-bar">
                <div
                  className="battery-level"
                  style={{ width: `${battery * 20}%` }}
                />
              </div>
            </div>

            <button className="pixel-btn danger-btn" onClick={handleInteract}>
              CERRAR PUERTA
            </button>
            <p className="subtext small">
              Necesitas {clicksRequired} clics para asegurar la puerta.
            </p>
          </div>
        )}

        {/* --- FASE “DEAD” --- */}
        {phase === "dead" && (
          <div className="content">
            <h2 className="title danger">¡GAME OVER!</h2>
            <p className="text">FREDDY TE ATRAPÓ EN LA NOCHE {round + 1}.</p>
            <button className="pixel-btn ok-btn" onClick={restartGame}>
              REINTENTAR
            </button>
          </div>
        )}

        {/* --- FASE “SURVIVED” --- */}
        {phase === "survived" && (
          <div className="content">
            <h2 className="title success">¡SOBREVIVISTE!</h2>
            <p className="text">
              HAS LLEGADO HASTA LA MAÑANA {round + 1}. FREDDY RETROCEDE… POR AHORA.
            </p>
            <button className="pixel-btn ok-btn" onClick={restartGame}>
              JUGAR DE NUEVO
            </button>
          </div>
        )}
      </div>

      {/* ================= Estilos 8-bit embebidos ================= */}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #000;
        }
        .screen {
          width: 320px;
          height: 260px;
          background: #111;
          border: 8px solid #444;
          box-shadow: 0 0 0 4px #222 inset, 0 0 0 8px #000;
          position: relative;
        }
        .screen,
        .screen * {
          font-family: "Courier New", Courier, monospace;
          color: #fff;
        }
        .content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          line-height: 1.2;
        }
        .title {
          font-size: 20px;
          margin: 4px 0;
          text-shadow: 2px 2px 0 #000;
        }
        .danger {
          color: #f00;
        }
        .success {
          color: #0f0;
        }
        .text {
          font-size: 12px;
          margin-bottom: 6px;
          letter-spacing: 1px;
          text-shadow: 1px 1px 0 #000;
        }
        .subtext {
          font-size: 10px;
          margin-top: 6px;
          color: #aaa;
          text-shadow: 1px 1px 0 #000;
        }
        .small {
          font-size: 9px;
        }

        .idle-box {
          width: 60px;
          height: 30px;
          background: #008;
          border: 2px solid #00f;
          margin: 8px auto;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          animation: blink 1s infinite steps(1);
          text-shadow: 1px 1px 0 #000;
        }
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }

        .anim-container {
          width: 100px;
          height: 80px;
          margin: 0 auto 4px;
          border: 2px solid #f00;
          background: #000;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .anim-image {
          object-fit: cover;
          image-rendering: pixelated;
        }

        .battery-container {
          margin: 4px 0 8px;
        }
        .battery-info {
          font-size: 10px;
          margin-bottom: 2px;
          text-shadow: 1px 1px 0 #000;
        }
        .battery-bar {
          width: 100px;
          height: 8px;
          background: #333;
          border: 2px solid #555;
          margin: 0 auto;
        }
        .battery-level {
          height: 100%;
          background: #0f0;
        }
        .recharge {
          background: #08f;
        }

        .pixel-btn {
          display: inline-block;
          padding: 6px 12px;
          background: #222;
          border: 4px solid #555;
          box-shadow: 0 0 0 2px #000 inset;
          cursor: pointer;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: transform 0.1s ease-in-out;
        }
        .pixel-btn:active {
          transform: translate(1px, 1px);
          box-shadow: none;
        }

        .danger-btn {
          background: #800;
          border-color: #f00;
          color: #fff;
        }
        .danger-btn:active {
          background: #600;
        }
        .ok-btn {
          background: #080;
          border-color: #0f0;
          color: #000;
        }
        .ok-btn:active {
          background: #060;
        }
      `}</style>
    </div>
  );
}