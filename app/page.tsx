// app/page.tsx
"use client";

import Link from "next/link";
import Historia from "./sections/Historia";

function daysUntil(dateStr: string) {
  const target = new Date(dateStr + "T00:00:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

type CardProps = {
  title: string;
  children: React.ReactNode;
};

function Card({ title, children }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.06)",
        borderRadius: 18,
        padding: 22,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 24, letterSpacing: -0.2 }}>{title}</h2>
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

export default function Home() {
  const weddingDate = "2026-10-03";
  const days = daysUntil(weddingDate);

  const accent = "#7dd3fc"; // azul céu (praia elegante)
  const glassBg = "rgba(255,255,255,0.10)";
  const glassBorder = "1px solid rgba(255,255,255,0.18)";

  const sectionWrap: React.CSSProperties = {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "56px 24px",
  };

  return (
    <div style={{ background: "#0b0f14", color: "#fff" }}>
      {/* =========================
          INÍCIO (HERO CINEMA)
         ========================= */}
      <section
        id="inicio"
        className="full-bleed"
        style={{
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

            {/* CTA row (âncoras) */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
              <Link
                href="/#rsvp"
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
                href="/#evento"
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
                href="/#presentes"
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
                Presentes 
              </Link>
            </div>

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

      {/* =========================
          BOAS-VINDAS
         ========================= */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px 28px" }}>
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
            <h2 style={{ margin: 0, fontSize: 22, letterSpacing: -0.2 }}>Em breve</h2>
            <p style={{ marginTop: 10, opacity: 0.8, lineHeight: 1.6 }}>
              Este site será atualizado com fotos, horários, mapa e todos os detalhes do dia.
              Por enquanto, já deixamos a estrutura oficial no ar.
            </p>
            <p style={{ marginTop: 10, opacity: 0.8, lineHeight: 1.6 }}>
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
      </section>

      {/* =========================
          NOSSA HISTÓRIA (componente)
         ========================= */}
      <section id="historia" style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 24px" }}>
  <Historia />
</section>


      {/* =========================
          O EVENTO
         ========================= */}
      <section id="evento" style={sectionWrap}>
        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          <Card title="O Evento">
            <p style={{ margin: 0, opacity: 0.82, lineHeight: 1.7 }}>
              Data: <strong style={{ color: "#fff" }}>{weddingDate}</strong>
              <br />
              Local: <span style={{ opacity: 0.9 }}>(em breve)</span>
              <br />
              Dress code: <span style={{ opacity: 0.9 }}>(em breve)</span>
            </p>
            <p style={{ marginTop: 10, opacity: 0.72, lineHeight: 1.7 }}>
              Assim que fecharmos os detalhes, colocamos mapa, horários e recomendações.
            </p>
          </Card>

          <Card title="Dicas rápidas">
            <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.82, lineHeight: 1.8 }}>
              <li>Chegue com antecedência para estacionar / acessar o local</li>
              <li>Considere calçado confortável (areia + festa)</li>
              <li>Se for viajar, reserve hospedagem com antecedência</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* =========================
          RSVP
         ========================= */}
      <section id="rsvp" style={sectionWrap}>
        <Card title="RSVP">
          <p style={{ margin: 0, opacity: 0.82, lineHeight: 1.7, maxWidth: 900 }}>
            Aqui vamos colocar o formulário de confirmação de presença. Por enquanto,
            deixamos o espaço preparado.
          </p>

          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a href="mailto:contato@joeweb.com.br" className="btn btn-primary">
              Falar com a gente
            </a>
            <Link href="/#contato" className="btn">
              Ver contato
            </Link>
          </div>
        </Card>
      </section>

      {/* =========================
          PRESENTES
         ========================= */}
      <section id="presentes" style={sectionWrap}>
        <Card title="Presentes">
          <p style={{ margin: 0, opacity: 0.82, lineHeight: 1.7, maxWidth: 900 }}>
            Em vez de lista tradicional, a ideia aqui é um álbum interativo: você escolhe uma
            foto, contribui (mínimo de R$ 0) e desbloqueia uma história nossa.
          </p>
          <p style={{ marginTop: 10, opacity: 0.72, lineHeight: 1.7 }}>
            (A tela final revela o destino da lua de mel — com liberação manual nossa 😉)
          </p>

          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 10 }}>
            <span className="badge">Mínimo: R$ 100</span>
            <span className="badge">Pix / Cartão (Mercado Pago)</span>
            <span className="badge">Nome do apoiador aparece</span>
          </div>
        </Card>
      </section>

      {/* =========================
          CONTATO
         ========================= */}
      <section id="contato" style={{ ...sectionWrap, paddingBottom: 64 }}>
        <Card title="Contato">
          <p style={{ margin: 0, opacity: 0.82, lineHeight: 1.7 }}>
            Tem alguma dúvida? Fala com a gente.
          </p>

          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a className="btn btn-primary" href="mailto:contato@joeweb.com.br">
              contato@joeweb.com.br
            </a>
            <a
              className="btn"
              href="https://wa.me/5511994626085"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>

          <p style={{ marginTop: 12, opacity: 0.65, fontSize: 13 }}>
            * Depois a gente troca e-mail/WhatsApp pelos contatos reais.
          </p>
        </Card>
      </section>
    </div>
  );
}
