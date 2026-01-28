"use client";

import React from "react";

type StoryItem = {
  title: string;
  text: string;
  photoHint: string; // placeholder (sem imagem por enquanto)
};

const items: StoryItem[] = [
  {
    title: "Onde tudo começou",
    photoHint: "Foto 1 (trabalho / descontraído)",
    text:
      "Nos conhecemos no lugar mais improvável: no trabalho. " +
      "Se alguém apostasse que daria certo… provavelmente perderia. " +
      "Mas, entre conversas despretensiosas, festas, churrascos, futebol e viagens, " +
      "fomos nos descobrindo — sem pressa, sem roteiro, só vivendo.",
  },
  {
    title: "O primeiro “sim”",
    photoHint: "Foto 2 (Réveillon / celebração)",
    text:
      "O tempo fez o que só ele sabe fazer. " +
      "No meio da alegria, da bagunça boa e dos brindes de fim de ano, veio o primeiro grande passo: " +
      "um pedido de namoro em pleno Réveillon. " +
      "Ali, sem perceber, começava uma nova contagem.",
  },
  {
    title: "Vida real, amor real",
    photoHint: "Foto 3 (apartamento / família / intimista)",
    text:
      "Um ano depois, o noivado. Planos, contratos, nosso primeiro apartamento, reforma… " +
      "E, no meio de tudo isso, a vida resolveu acelerar: " +
      "a Luiza chegou, mudando tudo — e deixando tudo ainda mais certo. " +
      "Casamento civil, família formada, amor testado e fortalecido a cada ciclo.",
  },
  {
    title: "O encontro marcado",
    photoHint: "Foto 4 (praia / vocês hoje)",
    text:
      "Depois de tantas etapas, aprendizados e transformações, entendemos: era hora de celebrar do nosso jeito. " +
      "Com os pés na areia, olho no olho e o coração tranquilo. " +
      "Um encontro marcado para dizer, mais uma vez — e para sempre — sim.",
  },
];

export default function Historia() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
        <span style={{ opacity: 0.65, fontSize: 13 }}>4 momentos • uma linha do tempo</span>
      </div>

      <p style={{ marginTop: 10, opacity: 0.8, lineHeight: 1.7, maxWidth: 980 }}>
        Quem rola a página tem que sentir o tempo passando. 🌊
      </p>

      {/* Timeline */}
      <div style={{ marginTop: 18, position: "relative" }}>
        {/* Linha */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 16,
            top: 6,
            bottom: 6,
            width: 2,
            background: "rgba(255,255,255,0.10)",
          }}
        />

        <div style={{ display: "grid", gap: 14 }}>
          {items.map((item, idx) => (
            <div
              key={item.title}
              style={{
                position: "relative",
                display: "grid",
                gap: 14,
                gridTemplateColumns: "1fr",
                paddingLeft: 44,
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: 8,
                  top: 18,
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "rgba(125,211,252,0.95)",
                    boxShadow: "0 0 14px rgba(125,211,252,0.55)",
                  }}
                />
              </div>

              {/* Card */}
              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(0,0,0,0.18)",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                {/* “Foto” placeholder */}
                <div
                  style={{
                    height: 190,
                    background:
                      "linear-gradient(135deg, rgba(217,199,161,0.10), rgba(125,211,252,0.10))",
                    borderBottom: "1px solid rgba(255,255,255,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 16,
                    textAlign: "center",
                  }}
                >
                  <span style={{ opacity: 0.75, fontSize: 13 }}>{item.photoHint}</span>
                </div>

                <div style={{ padding: 18 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: 12,
                        padding: "6px 10px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.06)",
                        opacity: 0.85,
                      }}
                    >
                      Momento {idx + 1}
                    </span>

                    <h3 style={{ margin: 0, fontSize: 18, letterSpacing: -0.1 }}>
                      {item.title}
                    </h3>
                  </div>

                  <p style={{ marginTop: 10, opacity: 0.82, lineHeight: 1.75 }}>
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 16, opacity: 0.7, fontSize: 13 }}>
          Porque todo ciclo merece ser celebrado.
        </p>
      </div>
    </div>
  );
}
