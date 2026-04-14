"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Props = {
  weddingDateISO: string; // "2026-10-03"
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function diffToParts(targetISO: string) {
  const target = new Date(`${targetISO}T00:00:00`);
  const now = new Date();
  const ms = Math.max(0, target.getTime() - now.getTime());

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { ms, days, hours, minutes, seconds };
}

export default function EventBridgeCountdown({ weddingDateISO }: Props) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const parts = useMemo(() => diffToParts(weddingDateISO), [weddingDateISO, tick]);

  return (
    <section id="evento" className="event-bridge full-bleed">
      {/* Fundo */}
      <div className="event-bridge-bg" aria-hidden />

      {/* Overlay cinema */}
      <div className="event-bridge-overlay" aria-hidden />

      <div className="event-bridge-inner">
        <div className="event-bridge-head">
          <span className="badge">O EVENTO</span>
          <h2 className="event-bridge-title">A contagem oficial começou.</h2>
          <p className="event-bridge-sub">
            Um encontro marcado, com pés na areia e coração leve.
          </p>
        </div>

        {/* Countdown */}
        <div className="countdown">
          <div className="countdown-item">
            <span className="countdown-num">{parts.days}</span>
            <span className="countdown-label">dias</span>
          </div>

          <div className="countdown-sep" aria-hidden>:</div>

          <div className="countdown-item">
            <span className="countdown-num">{pad2(parts.hours)}</span>
            <span className="countdown-label">horas</span>
          </div>

          <div className="countdown-sep" aria-hidden>:</div>

          <div className="countdown-item">
            <span className="countdown-num">{pad2(parts.minutes)}</span>
            <span className="countdown-label">min</span>
          </div>

          <div className="countdown-sep" aria-hidden>:</div>

          <div className="countdown-item">
            <span className="countdown-num">{pad2(parts.seconds)}</span>
            <span className="countdown-label">seg</span>
          </div>
        </div>

        {/* Resumo leve */}
        <div className="event-teaser">
          <div className="event-teaser-card">
            <h3 className="event-teaser-h3">Resumo do dia</h3>
            <p className="event-teaser-p">
              <strong>Data:</strong> {weddingDateISO}
              <br />
              <strong>Local:</strong> (em breve)
              <br />
              <strong>Horário:</strong> (em breve)
              <br />
              <strong>Dress code:</strong> (em breve)
            </p>

            <div className="event-teaser-cta">
              <Link className="btn btn-primary" href="/evento">
                Ver página do evento
              </Link>
              <Link className="btn" href="/evento#mapa">
                Como chegar
              </Link>
            </div>
          </div>

          {/* Botões “atalhos” (não carrega conteúdo pesado na home) */}
          <div className="pill-nav" aria-label="Atalhos do evento">
            <Link className="pill" href="/evento#local">Local</Link>
            <Link className="pill" href="/evento#horario">Horário</Link>
            <Link className="pill" href="/evento#dresscode">Dress Code</Link>
            <Link className="pill" href="/evento#hospedagens">Hospedagens Parceiras</Link>
            <Link className="pill" href="/evento#mapa">Mapa</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
