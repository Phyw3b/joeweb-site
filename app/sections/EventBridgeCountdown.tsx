"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Props = {
  weddingDateISO: string;
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

  return { days, hours, minutes, seconds };
}

export default function EventBridgeCountdown({ weddingDateISO }: Props) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const parts = useMemo(
    () => diffToParts(weddingDateISO),
    [weddingDateISO, tick]
  );

  return (
    <section
      id="evento"
      className="relative overflow-hidden bg-[#d7e8ee] px-6 py-24 text-[#263b45]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#b7cbd6] via-[#f4efe6] to-[#e8dcc8]" />

      <div className="absolute left-[-8%] top-[-10%] h-80 w-80 rounded-full bg-[#7fa6b3]/40 blur-3xl" />
      <div className="absolute right-[-8%] bottom-[-10%] h-96 w-96 rounded-full bg-[#d8c7aa]/55 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#5f7f8c]">
            O evento
          </p>

          <h2 className="font-serif text-5xl leading-tight md:text-7xl">
            A contagem oficial começou.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-[#435862]">
            Um encontro marcado, com pés na areia e coração leve.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: parts.days, label: "dias" },
            { value: pad2(parts.hours), label: "horas" },
            { value: pad2(parts.minutes), label: "min" },
            { value: pad2(parts.seconds), label: "seg" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[2rem] border border-white/70 bg-white/45 p-6 text-center shadow-xl backdrop-blur-md"
            >
              <span className="block font-serif text-5xl text-[#263b45] md:text-7xl">
                {item.value}
              </span>
              <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.3em] text-[#6f8c96]">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 rounded-[2.5rem] border border-white/70 bg-white/45 p-6 shadow-2xl backdrop-blur-md md:grid-cols-[1fr_1.2fr] md:p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#6f8c96]">
              Resumo do dia
            </p>

            <h3 className="mt-3 font-serif text-4xl text-[#263b45]">
              Nosso grande encontro
            </h3>
          </div>

          <div>
            <div className="space-y-2 text-base leading-relaxed text-[#435862]">
              <p>
                <strong>Data:</strong> {weddingDateISO}
              </p>
              <p>
                <strong>Local:</strong> em breve
              </p>
              <p>
                <strong>Horário:</strong> em breve
              </p>
              <p>
                <strong>Dress code:</strong> em breve
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/evento"
                className="rounded-full bg-[#263b45] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#7fa6b3]"
              >
                Ver evento
              </Link>

              <Link
                href="/evento#mapa"
                className="rounded-full border border-[#263b45]/25 bg-white/35 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#263b45] transition hover:bg-white"
              >
                Como chegar
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3">
          {[
            ["Local", "/evento#local"],
            ["Horário", "/evento#horario"],
            ["Dress Code", "/evento#dresscode"],
            ["Hospedagens", "/evento#hospedagens"],
            ["Mapa", "/evento#mapa"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="rounded-full border border-[#263b45]/15 bg-white/35 px-5 py-3 text-sm text-[#435862] backdrop-blur-md transition hover:bg-white"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}