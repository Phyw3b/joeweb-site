"use client";

import { Calendar, ChevronDown, Heart, MapPin, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import WeddingAccessGate from "../components/WeddingAccessGate";
import infoStyles from "./HomeInfoFrame.module.css";
import eventPreviewStyles from "./EventPreview.module.css";

const WEDDING_DATE = new Date("2026-10-03T16:30:00-03:00");
const INITIAL_COUNTDOWN = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getCountdown() {
  const diff = Math.max(WEDDING_DATE.getTime() - Date.now(), 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeStory, setActiveStory] = useState(0);
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN);

  const navItems = useMemo(
    () => ["Início", "Nossa História", "O Evento", "RSVP", "Presentes"],
    []
  );

  const infoCards = useMemo(
    () => [
      {
        Icon: Calendar,
        title: "Data",
        text: "03.10.2026 às 16h30",
        note: "O sol não espera. A cerimônia exige pontualidade!",
      },
      {
        Icon: MapPin,
        title: "Local",
        text: "Espaço de Eventos Abricó",
      },
      {
        Icon: Heart,
        title: "Vibes",
        text: "Cerimônia ao pôr do sol · pé na areia · festa na sequência",
      },
    ],
    []
  );

  const storyCards = useMemo(
    () => [
      {
        chapter: "Capítulo 01",
        title: "O encontro",
        text: "Toda história grande começa com um detalhe pequeno: um olhar, uma conversa, uma coincidência que depois parece destino.",
        image: "/historia/01.jpg",
      },
      {
        chapter: "Capítulo 02",
        title: "A conexão",
        text: "Entre risadas, afinidades e planos surgindo sem pressa, a vida começou a mostrar que tinha algo especial ali.",
        image: "/historia/02.jpg",
      },
      {
        chapter: "Capítulo 03",
        title: "As memórias",
        text: "Viagens, família, amigos e pequenos rituais foram virando a base de tudo que somos juntos.",
        image: "/historia/03.jpg",
      },
      {
        chapter: "Capítulo 04",
        title: "O sim",
        text: "O momento em que a escolha virou promessa. Não como ponto final, mas como início de uma fase ainda mais bonita.",
        image: "/historia/04.jpg",
      },
      {
        chapter: "Capítulo 05",
        title: "O nosso para sempre",
        text: "Agora chegou a hora de celebrar com quem fez parte da caminhada. Esse dia também é sobre vocês conosco.",
        image: "/historia/05.jpg",
      },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateCountdown = () => setCountdown(getCountdown());
    const initialTimer = window.setTimeout(updateCountdown, 0);
    const timer = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStory((current) => (current + 1) % storyCards.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, [storyCards.length]);

  const getAnchor = (item: string) =>
    item === "Presentes"
      ? "/presentes"
      : item === "O Evento"
        ? "/evento"
      :
    `#${item
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replaceAll(" ", "-")}`;

  const currentStory = storyCards[activeStory];

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#173447] selection:bg-[#9fc7d7]/40">
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrollY > 30
            ? "bg-[#082337]/90 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "bg-[#082337]/55 shadow-lg shadow-black/10 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
          <a href="#inicio" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/35 bg-white/10 p-1 backdrop-blur-md">
              <Image
                src="/media/gflor-logo.svg"
                alt="G Flor"
                fill
                className="object-contain p-1"
                sizes="40px"
              />
            </div>
            <div className="hidden leading-none text-white sm:block">
              <p className="[font-family:var(--font-great-vibes)] text-3xl leading-none tracking-wide">
                Jo e Web
              </p>
            </div>
          </a>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Navegação principal"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={getAnchor(item)}
                className="[font-family:var(--font-montserrat)] text-sm font-semibold uppercase tracking-[0.16em] !text-white opacity-100 transition [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] hover:!text-[#dcecf1]"
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-white/25 bg-white/10 p-3 text-white backdrop-blur-md md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-5 mb-5 rounded-[2rem] border border-white/15 bg-[#173447]/95 p-5 text-white backdrop-blur-xl md:hidden"
          >
            <div className="grid gap-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={getAnchor(item)}
                  onClick={() => setOpen(false)}
                  className="text-sm uppercase tracking-[0.25em] text-white/80"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      <section id="inicio" className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="h-full w-full scale-105 bg-cover bg-[position:42%_center] md:bg-center"
            style={{
              backgroundImage: "url('/hero/hero.jpg')",
              transform: `scale(1.08) translateY(${scrollY * 0.08}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-[#d8c9b0]/95" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pb-16 pt-28 text-center text-white md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.18, ease: "easeOut" }}
              className="[font-family:var(--font-great-vibes)] pb-8 text-7xl font-light leading-[1.08] md:pb-10 md:text-9xl lg:pb-12 lg:text-[11rem]"
            >
              Jo e Web
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.38, ease: "easeOut" }}
              className="mx-auto mt-0 max-w-3xl text-lg font-light leading-8 text-white/85 md:text-2xl md:leading-10"
            >
              Duas histórias, um destino e o começo de um novo capítulo diante
              do mar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.58, ease: "easeOut" }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a
                href="/rsvp"
                className="[font-family:var(--font-montserrat)] inline-flex h-16 w-72 items-center justify-center rounded-full border border-white/35 bg-[#173447]/60 px-8 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-2xl shadow-black/25 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-[#173447] sm:w-80"
              >
                Confirmar presença
              </a>
              <a
                href="#o-evento"
                className="[font-family:var(--font-montserrat)] inline-flex h-16 w-72 items-center justify-center rounded-full border border-white/35 bg-[#173447]/60 px-8 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-2xl shadow-black/25 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-[#173447] sm:w-80"
              >
                Ver detalhes
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-white/65"
          >
            <p className="text-[10px] uppercase tracking-[0.38em]">
              Role para sentir
            </p>
            <ChevronDown className="animate-bounce" size={20} />
          </motion.div>
        </div>
      </section>

      <WeddingAccessGate>
      <section className={infoStyles.section}>
        <div className={infoStyles.layout}>
          <div className={infoStyles.leftStack}>
            {[infoCards[0], infoCards[2]].map(({ Icon, title, text, note }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={infoStyles.card}
              >
                <div className={infoStyles.panel}>
                  <Icon className={infoStyles.icon} size={28} />
                  <h3
                    className={`${infoStyles.title} ${
                      title === "Data" ? infoStyles.dataTitle : ""
                    }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`${infoStyles.text} ${
                      title === "Data" ? infoStyles.dataText : ""
                    }`}
                  >
                    {text}
                  </p>
                  {note && (
                    <p
                      className={`${infoStyles.note} ${
                        title === "Data" ? infoStyles.dataNote : ""
                      }`}
                    >
                      {note}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className={`${infoStyles.card} ${infoStyles.localCard}`}
          >
            <div className={`${infoStyles.panel} ${infoStyles.localPanel}`}>
              <MapPin className={infoStyles.icon} size={28} />
              <h3 className={infoStyles.title}>Local</h3>
              <p className={infoStyles.text}>
                Espaço de Eventos Abricó
              </p>
              <a
                href="/evento#mapa"
                className={infoStyles.localImageFrame}
                aria-label="Ver mapa do Espaço de Eventos Abricó"
              >
                <Image
                  src="/evento/abrico-cerimonia.jpg"
                  alt="Cerimônia no Espaço de Eventos Abricó"
                  fill
                  sizes="(min-width: 900px) 520px, 100vw"
                  className={infoStyles.localImage}
                />
                <div className={infoStyles.localImageShade} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="nossa-historia"
        className="bg-[#f4efe6] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="mb-5 text-xs uppercase tracking-[0.38em] text-[#3f7f97]">
                Nossa história
              </p>
              <h2 className="font-serif text-5xl font-light italic leading-tight text-[#173447] md:text-7xl">
                Cinco momentos que viraram caminho.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hidden"
            >
              Um carrossel para contar a história de vocês com calma, beleza e
              emoção. Aqui depois entram fotos reais, datas e textos mais
              pessoais.
            </motion.p>
          </div>

          <div className="mx-auto mt-14 max-w-6xl">
            <motion.div
              key={currentStory.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="relative overflow-hidden rounded-[2rem] bg-[#d8c9b0] shadow-2xl shadow-[#173447]/15 md:rounded-[2.5rem]"
            >
              <div className="relative h-[520px] w-full md:h-[680px] lg:h-[760px]">
                <Image
                  src={currentStory.image}
                  alt={currentStory.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1100px"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#082337]/88 via-[#173447]/24 to-transparent" />
              <motion.div
                key={`${currentStory.title}-overlay`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute bottom-0 left-0 right-0 p-7 text-white md:p-12"
              >
                <p className="mb-3 text-xs uppercase tracking-[0.36em] text-[#b8dce7]">
                  {currentStory.chapter}
                </p>
                <h3 className="font-serif text-5xl italic leading-none md:text-6xl">
                  {currentStory.title}
                </h3>
                <p className="mt-5 max-w-3xl text-base leading-7 text-white/86 md:text-lg md:leading-8">
                  {currentStory.text}
                </p>
              </motion.div>
            </motion.div>

            <div
              className="mt-8 flex items-center justify-center gap-3 sm:gap-5"
              role="tablist"
              aria-label="CapÃ­tulos da nossa histÃ³ria"
            >
              {storyCards.map((card, index) => {
                const active = index === activeStory;

                return (
                  <button
                    key={card.title}
                    type="button"
                    onClick={() => setActiveStory(index)}
                    role="tab"
                    aria-selected={active}
                    aria-label={`${card.chapter}: ${card.title}`}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300 sm:h-14 sm:w-14 ${
                      active
                        ? "border-[#173447] bg-[#173447] text-white shadow-xl shadow-[#173447]/18"
                        : "border-[#d8c9b0] bg-white/70 text-[#3f7f97] hover:border-[#9fc7d7] hover:bg-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="sr-only" role="tabpanel">
              {currentStory.chapter}: {currentStory.title}. {currentStory.text}
            </div>
          </div>
        </div>
      </section>

      <section id="o-evento" className={eventPreviewStyles.section}>
        <div className={eventPreviewStyles.content}>
          <p className={eventPreviewStyles.eyebrow}>
            O evento
          </p>
          <h2 className={eventPreviewStyles.title}>
            Um encontro à beira-mar.
          </h2>
          <p className={eventPreviewStyles.text}>
            Cerimônia ao pôr do sol, festa e uma noite pra celebrar.
          </p>
          <a
            href="/evento"
            className={eventPreviewStyles.button}
          >
            Ver evento completo
          </a>
        </div>
      </section>

      <section id="rsvp" className="bg-[#173447] px-6 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-black/20 md:p-14">
          <p className="mb-5 text-xs uppercase tracking-[0.38em] text-[#b8dce7]">
            RSVP
          </p>
          <h2 className="font-serif text-5xl font-light italic md:text-7xl">
            A sua presença importa.
          </h2>
          <a
            href="/rsvp"
            className="[font-family:var(--font-montserrat)] mt-10 inline-flex h-16 w-72 items-center justify-center rounded-full border border-white/35 bg-[#173447]/60 px-8 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-2xl shadow-black/25 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-[#173447] sm:w-80"
          >
            Quero confirmar
          </a>
        </div>
      </section>

      <section id="presentes" className="bg-[#f4efe6] px-6 py-24 text-center md:px-10 md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs uppercase tracking-[0.38em] text-[#3f7f97]">
            Presentes
          </p>
          <h2 className="font-serif text-5xl font-light italic md:text-7xl">
            Mais que presentes, histórias.
          </h2>
          <a
            href="/presentes"
            className="[font-family:var(--font-montserrat)] mt-10 inline-flex h-16 w-72 items-center justify-center rounded-full border border-white/35 bg-[#173447]/60 px-8 text-sm font-semibold uppercase tracking-[0.22em] !text-[#f4efe6] shadow-2xl shadow-black/25 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-[#173447] hover:!text-white sm:w-80"
          >
            Ver presentes
          </a>
        </div>
      </section>

      <section className="bg-[#173447] px-6 py-16 text-white md:px-10">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4efe6]/85">
            Contagem regressiva para o grande dia
          </p>
          <div className="relative mx-auto mt-8 flex min-h-36 w-full max-w-6xl flex-nowrap overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.06] shadow-[0_28px_70px_rgba(0,0,0,0.22)]">
            {[
              { label: "dias", value: countdown.days },
              { label: "horas", value: countdown.hours },
              { label: "minutos", value: countdown.minutes },
              { label: "segundos", value: countdown.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="relative min-w-0 flex-1 px-1 py-4 sm:px-3 sm:py-5 md:py-7"
              >
                <p className="font-serif text-2xl leading-none text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.25)] sm:text-3xl md:text-5xl">
                  {String(item.value)}
                </p>
                <p className="mt-2 truncate text-[8px] font-semibold uppercase tracking-[0.08em] text-white/88 drop-shadow-[0_1px_7px_rgba(0,0,0,0.22)] sm:mt-3 sm:text-[10px] sm:tracking-[0.12em] md:text-xs">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#082337] px-6 py-10 text-center text-white/50">
        <p className="[font-family:var(--font-great-vibes)] text-4xl text-white/80">
          Jo e Web
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.32em]">
          feito para virar memória
        </p>
      </footer>
      </WeddingAccessGate>
    </main>
  );
}
