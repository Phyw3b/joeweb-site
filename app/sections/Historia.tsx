"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

type StoryItem = {
  title: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
};

export default function Historia() {
  const [active, setActive] = useState(0);

  const items: StoryItem[] = useMemo(
    () => [
      {
        title: "Onde tudo começou",
        imageSrc: "/historia/01.jpg",
        imageAlt: "Jo & Web — onde tudo começou",
        text: "Nos conhecemos no lugar mais improvável: no trabalho. Entre conversas despretensiosas, festas, churrascos, futebol e viagens, fomos nos descobrindo — sem pressa, sem roteiro, só vivendo.",
      },
      {
        title: "O primeiro sim",
        imageSrc: "/historia/02.jpg",
        imageAlt: "Jo & Web — o primeiro sim",
        text: "No meio da alegria, da bagunça boa e dos brindes de fim de ano, veio o primeiro grande passo: um pedido de namoro em pleno Réveillon.",
      },
      {
        title: "Vida real, amor real",
        imageSrc: "/historia/03.jpg",
        imageAlt: "Jo & Web — vida real",
        text: "Um ano depois, o noivado. Planos, contratos, primeiro apartamento, reforma… e a Luiza chegou, mudando tudo — e deixando tudo ainda mais certo.",
      },
      {
        title: "Família, planos e estrada",
        imageSrc: "/historia/04.jpg",
        imageAlt: "Jo & Web — família e planos",
        text: "Entre viagens, aprendizados, rotina, conquistas e desafios, fomos construindo uma história com base no que mais importa: parceria, amor e verdade.",
      },
      {
        title: "O encontro marcado",
        imageSrc: "/historia/05.jpg",
        imageAlt: "Jo & Web — casamento na praia",
        text: "Agora chegou a hora de celebrar do nosso jeito: com os pés na areia, coração tranquilo e as pessoas que fazem parte da nossa vida.",
      },
    ],
    []
  );

  const current = items[active];

  function prev() {
    setActive((value) => (value === 0 ? items.length - 1 : value - 1));
  }

  function next() {
    setActive((value) => (value === items.length - 1 ? 0 : value + 1));
  }

  return (
    <section
      id="historia"
      className="relative overflow-hidden bg-[#f4efe6] px-6 py-24 text-[#263b45]"
    >
      <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-[#9bbdca]/40 blur-3xl" />
      <div className="absolute bottom-0 right-[-10%] h-96 w-96 rounded-full bg-[#d7c3a3]/45 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#6f8c96]">
            Nossa história
          </p>

          <h2 className="font-serif text-5xl leading-tight text-[#263b45] md:text-7xl">
            Um amor com cheiro de mar
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-[#536872]">
            Cinco momentos para contar, com leveza, como chegamos até aqui.
          </p>
        </div>

        <div className="grid items-center gap-10 rounded-[2.5rem] border border-white/70 bg-white/45 p-4 shadow-2xl backdrop-blur-md md:grid-cols-[1.05fr_0.95fr] md:p-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#d7e8ee] shadow-xl md:aspect-[5/4]">
            <Image
              src={current.imageSrc}
              alt={current.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 92vw, 620px"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1f2f38]/45 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 rounded-full bg-white/75 px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#5f7f8c] backdrop-blur-md">
              Momento {active + 1} de {items.length}
            </div>
          </div>

          <div className="px-2 py-6 md:px-6">
            <h3 className="font-serif text-4xl leading-tight text-[#263b45] md:text-6xl">
              {current.title}
            </h3>

            <p className="mt-6 text-lg leading-relaxed text-[#435862]">
              {current.text}
            </p>

            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={prev}
                className="grid h-12 w-12 place-items-center rounded-full border border-[#263b45]/20 bg-white/50 text-2xl text-[#263b45] transition hover:bg-white"
                aria-label="História anterior"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={next}
                className="grid h-12 w-12 place-items-center rounded-full bg-[#263b45] text-2xl text-white transition hover:bg-[#7fa6b3]"
                aria-label="Próxima história"
              >
                ›
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {items.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={[
                    "h-2.5 rounded-full transition-all",
                    active === index
                      ? "w-10 bg-[#263b45]"
                      : "w-2.5 bg-[#9bbdca]",
                  ].join(" ")}
                  aria-label={`Ir para ${item.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}