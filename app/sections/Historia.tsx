"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

/* =========================
   TIPOS
========================= */
type StoryItem = {
  title: string;
  text: string;
  imageSrc: string; // caminho em /public
  imageAlt: string;
};

/* =========================
   HOOK: IN VIEW (SCROLL)
========================= */
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      options
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

/* =========================
   STORY CARD
========================= */
function StoryCard({
  item,
  index,
}: {
  item: StoryItem;
  index: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.18 });
  const sideClass = index % 2 === 0 ? "story-left" : "story-right";

  return (
    <div
      ref={ref}
      className={[
        "story-item",
        sideClass,
        inView ? "reveal-in" : "reveal",
      ].join(" ")}
    >
      {/* IMAGEM */}
      <div className="story-media">
        <div className="story-image">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            priority={index === 0}
            sizes="(max-width: 860px) 92vw, 520px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* TEXTO */}
      <div className="story-content">
        <span className="story-chip">Momento {index + 1}</span>
        <h3 className="story-title">{item.title}</h3>
        <p className="story-text">{item.text}</p>
      </div>
    </div>
  );
}

/* =========================
   HISTORIA (SECTION)
========================= */
export default function Historia() {
  const items: StoryItem[] = useMemo(
    () => [
      {
        title: "Onde tudo começou",
        imageSrc: "/historia/01.jpg",
        imageAlt: "Jo & Web — onde tudo começou",
        text:
          "Nos conhecemos no lugar mais improvável: no trabalho. " +
          "Se alguém apostasse que daria certo… provavelmente perderia. " +
          "Mas, entre conversas despretensiosas, festas, churrascos, futebol e viagens, " +
          "fomos nos descobrindo — sem pressa, sem roteiro, só vivendo.",
      },
      {
        title: "O primeiro “sim”",
        imageSrc: "/historia/02.jpg",
        imageAlt: "Jo & Web — o primeiro sim",
        text:
          "O tempo fez o que só ele sabe fazer. " +
          "No meio da alegria, da bagunça boa e dos brindes de fim de ano, veio o primeiro grande passo: " +
          "um pedido de namoro em pleno Réveillon. " +
          "Ali, sem perceber, começava uma nova contagem.",
      },
      {
        title: "Vida real, amor real",
        imageSrc: "/historia/03.jpg",
        imageAlt: "Jo & Web — vida real, amor real",
        text:
          "Um ano depois, o noivado. Planos, contratos, nosso primeiro apartamento, reforma… " +
          "E, no meio de tudo isso, a vida resolveu acelerar: " +
          "a Luiza chegou, mudando tudo — e deixando tudo ainda mais certo. " +
          "Casamento civil, família formada, amor testado e fortalecido a cada ciclo.",
      },
      {
        title: "O encontro marcado",
        imageSrc: "/historia/04.jpg",
        imageAlt: "Jo & Web — o encontro marcado",
        text:
          "Depois de tantas etapas, aprendizados e transformações, entendemos: era hora de celebrar do nosso jeito. " +
          "Com os pés na areia, olho no olho e o coração tranquilo. " +
          "Um encontro marcado para dizer, mais uma vez — e para sempre — sim.",
      },
    ],
    []
  );

  return (
    <div className="story-wrap">
      {/* HEADER */}
      <div className="story-head">
        <h2 className="story-h2">Nossa História</h2>
        <p className="story-sub">
          Quem rola a página tem que sentir o tempo passando. 🌊
        </p>
      </div>

      {/* LINHA DA TIMELINE */}
      <div className="story-timeline" aria-hidden />

      {/* ITENS */}
      <div className="story-list">
        {items.map((item, idx) => (
          <StoryCard key={item.title} item={item} index={idx} />
        ))}
      </div>

      {/* FECHAMENTO */}
      <p className="story-end">
        Porque todo ciclo merece ser celebrado.
      </p>
    </div>
  );
}
