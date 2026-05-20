"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Menu, Users, X } from "lucide-react";
import { useState } from "react";
import RsvpLookup from "../../components/RsvpLookup";
import WeddingAccessGate from "../../components/WeddingAccessGate";

const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Nossa História", href: "/#nossa-historia" },
  { label: "Evento", href: "/evento" },
  { label: "RSVP", href: "/rsvp" },
  { label: "Presentes", href: "/presentes" },
];

export default function RSVPPage() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#173447] selection:bg-[#9fc7d7]/40">
      <header className="sticky top-0 z-50 w-full bg-[#082337]/95 shadow-lg shadow-black/15 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
          <Link href="/#inicio" className="group flex items-center gap-3">
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
              <p className="[font-family:var(--font-allura)] text-3xl leading-none tracking-wide">
                Jo{" "}
                <span className="[font-family:var(--font-montserrat)] text-2xl font-light">
                  &
                </span>{" "}
                Web
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`[font-family:var(--font-montserrat)] text-sm font-semibold uppercase tracking-[0.16em] !text-white transition [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] hover:!text-[#dcecf1] ${
                  item.label === "RSVP"
                    ? "opacity-100 underline decoration-[#b8dce7] underline-offset-8"
                    : "opacity-80"
                }`}
              >
                {item.label}
              </Link>
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
            <div className="[display:grid] gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm uppercase tracking-[0.25em] ${
                    item.label === "RSVP" ? "text-white" : "text-white/75"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      <WeddingAccessGate>
        <section className="relative overflow-hidden bg-[#082337] px-6 py-20 text-white md:px-10 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,220,231,0.26),transparent_34%),linear-gradient(135deg,#082337_0%,#173447_52%,#2b5069_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f4efe6] to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative mx-auto flex max-w-4xl flex-col items-center text-center"
          >
            <p className="mb-5 text-center text-[16px] uppercase tracking-[0.38em] text-[#b8dce7]">
              RSVP
            </p>
            <h1 className="mx-auto max-w-4xl text-center font-serif text-5xl font-light italic leading-tight text-balance md:text-7xl">
              A sua presença importa.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-white/78 text-balance">
              O convite é pessoal e válido apenas para os nomes indicados.
            </p>
            <p className="mx-auto mt-8 inline-flex min-w-[min(100%,40rem)] items-center justify-center bg-transparent px-8 py-3.5 text-center text-sm font-bold uppercase tracking-[0.2em] text-[#f0b35f]">
              CONFIRMAÇÕES ATÉ • 01 DE SETEMBRO DE 2026
            </p>
          </motion.div>
        </section>

        <section className="px-6 pb-20 md:px-10 md:pb-28">
          <div className="mx-auto -mt-10 max-w-4xl">
            <RsvpLookup />
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-8 rounded-[2rem] border border-[#d8c9b0]/60 bg-white/70 p-6 shadow-xl shadow-[#173447]/8 md:p-8"
            >
              <div className="flex items-start gap-4">
                <Users className="mt-1 text-[#3f7f97]" size={26} />
                <div>
                  <h2 className="font-serif text-3xl italic text-[#173447]">
                    Sobre crianças
                  </h2>
                  <p className="mt-3 leading-7 text-[#61727a]">
                    Para que todos possam aproveitar a celebração com
                    tranquilidade, o evento será voltado ao público adulto, com
                    algumas exceções previamente combinadas.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="bg-[#082337] px-6 py-10 text-center text-white/55">
          <Heart className="mx-auto mb-3 text-[#b8dce7]" size={20} />
          <p className="[font-family:var(--font-allura)] text-4xl text-white/85">
            Jo{" "}
            <span className="[font-family:var(--font-montserrat)] text-3xl font-light">
              &
            </span>{" "}
            Web
          </p>
        </footer>
      </WeddingAccessGate>
    </main>
  );
}
