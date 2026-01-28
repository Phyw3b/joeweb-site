// app/page.tsx
"use client";

import Link from "next/link";

function daysUntil(dateStr: string) {
  const target = new Date(dateStr + "T00:00:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function Home() {
  const weddingDate = "2026-10-03";
  const days = daysUntil(weddingDate);

  // “CINEMA MODE”: quebra o container do layout e vira full-bleed na tela toda
  const fullBleed: React.CSSProperties = {
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
  };

  const accent = "#7dd3fc"; // azul céu (praia elegante)
  const glassBg = "rgba(255,255,255,0.10)";
  const glassBorder = "1px solid rgba(255,255,255,0.18)";

  return (
    <div style={{ background: "#0b0f14", color: "#fff" }}>
      {/* HERO CINEMA */}
      <section
        style={{
          ...fullBleed,
          position: "relative",
          height: "92vh",
          minHeight: 640,
          overflow: "hidden",
        }}
      >
        {/* Background */}
        <img
          src="/hero/hero.jpg"
          alt="Jo & Web"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            transform: "scale(1.04)",
            filter: "saturate(1.05) contrast(1.05)",
          }}
        />

        {/* Overlay (cinema) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(3,7,12,0.82) 0%, rgba(3,7,12,0.55) 45%, rgba(3,7,12,0.35) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(80% 70% at 20% 30%, rgba(125,211,252,0.10) 0%, rgba(0,0,0,0) 55%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 24px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                border: glassBorder,
                background: glassBg,
                padding: "10px 14px",
                borderRadius: 999,
                width: "fit-content",
                fontSize: 12,
                letterSpacing: 0.8,
                textTransform: "uppercase",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: accent,
                  display: "inline-block",
                  boxShadow: `0 0 18px ${accent}`,
                }}
              />
              Site oficial
            </div>

            <h1
              style={{
                margin: "18px 0 0 0",
                fontSize: "clamp(44px, 6.2vw, 84px)",
                lineHeight: 1.02,
                letterSpacing: -1,
                fontWeight: 800,
              }}
            >
              Jo <span style={{ opacity: 0.7 }}>&</span> Web
            </h1>

            <p
              style={{
                margin: "14px 0 0 0",
                maxWidth: 760,
                opacity: 0.92,
                fontSize: "clamp(16px, 1.6vw, 20px)",
                lineHeight: 1.45,
              }}
            >
              Estamos contando os dias para celebrar nosso amor à beira-mar.
              <br />
              Aqui você encontra todos os detalhes para viver esse momento com a gente.
            </p>

            {/* Quick info chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 18,
              }}
            >
              {[
                { t: `📅 ${weddingDate}` },
                { t: `⏳ Faltam ${days} dias` },
                { t: "🏖️ Casamento na praia" },
              ].map((item) => (
                <span
                  key={item.t}
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    padding: "8px 12px",
                    borderRadius: 999,
                    fontSize: 14,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {item.t}
                </span>
              ))}
            </div>

            {/* CTA row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
              <Link
                href="/rsvp"
                style={{
                  background: "#fff",
                  color: "#0b0f14",
                  padding: "12px 16px",
                  borderRadius: 14,
                  fontWeight: 800,
                  textDecoration: "none",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
                }}
              >
                Confirmar Presença
              </Link>

              <Link
                href="/evento"
                style={{
                  border: "1px solid rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.10)",
                  color: "#fff",
                  padding: "12px 16px",
                  borderRadius: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                }}
              >
                Ver detalhes do evento
              </Link>

              <Link
                href="/presentes"
                style={{
                  border: "1px solid rgba(255,255,255,0.22)",
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.92)",
                  padding: "12px 16px",
                  borderRadius: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                }}
              >
                Presentes (Histórias)
              </Link>
            </div>

            {/* subtle hint */}
            <div
              style={{
                marginTop: 26,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                opacity: 0.75,
                fontSize: 13,
              }}
            >
              <span
                style={{
                  width: 44,
                  height: 1,
                  background: "rgba(255,255,255,0.35)",
                }}
              />
              Role para ver mais
            </div>
          </div>
        </div>
      </section>

      {/* INFO (auto-fit: responsivo sem media query) */}
      <section
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "64px 24px 28px",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 18,
              padding: 22,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 22, letterSpacing: -0.2 }}>
              Em breve
            </h2>
            <p style={{ marginTop: 10, opacity: 0.80, lineHeight: 1.6 }}>
              Este site será atualizado com fotos, horários, mapa e todos os detalhes do dia.
              Por enquanto, já deixamos a estrutura oficial no ar.
            </p>
            <p style={{ marginTop: 10, opacity: 0.80, lineHeight: 1.6 }}>
              Salve este link — ele será o ponto oficial do nosso casamento.
            </p>
          </div>

          <div
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 18,
              padding: 22,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 22, letterSpacing: -0.2 }}>
              O que você encontra aqui
            </h2>

            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              {[
                "Data, local, mapa e dress code",
                "RSVP simples e rápido",
                "Álbum interativo de histórias (presentes)",
                "Contato para dúvidas",
              ].map((t) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    opacity: 0.82,
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      background: accent,
                      marginTop: 6,
                      boxShadow: `0 0 14px ${accent}`,
                      flex: "0 0 auto",
                    }}
                  />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* micro-footer (o footer principal já existe no layout) */}
        <div
          style={{
            marginTop: 26,
            borderTop: "1px solid rgba(255,255,255,0.10)",
            paddingTop: 18,
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            opacity: 0.65,
            fontSize: 14,
          }}
        >
          <span>© 2026 Jo & Web</span>
          <span style={{ opacity: 0.85 }}>Casamento na praia — informações oficiais</span>
        </div>
      </section>
    </div>
  );
}
