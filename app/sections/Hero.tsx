"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[calc(100vh-68px)] w-full overflow-hidden bg-[#eef3f5] text-[#1f2f38]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#d7e8ee] via-[#f4efe6] to-[#b7cbd6]" />

      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-[-8%] top-[8%] h-96 w-96 rounded-full bg-[#8fb6c3] blur-3xl" />
        <div className="absolute right-[-8%] bottom-[-8%] h-[34rem] w-[34rem] rounded-full bg-[#d8c7aa] blur-3xl" />
      </div>

      <div className="relative z-10 grid min-h-[calc(100vh-68px)] w-full items-center gap-10 px-8 py-16 md:grid-cols-2 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          className="max-w-3xl"
        >
          <p className="mb-5 text-sm uppercase tracking-[0.45em] text-[#5f7f8c]">
            Save the date
          </p>

          <h1 className="font-serif text-[5.5rem] leading-[0.85] text-[#263b45] md:text-[8rem] lg:text-[10rem]">
            Jo
            <span className="block text-[#7fa6b3]">& Web</span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#435862] md:text-2xl">
            Um encontro leve, elegante e cheio de amor para celebrar nossa
            história à beira-mar.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#rsvp"
              className="rounded-full bg-[#263b45] px-9 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#7fa6b3]"
            >
              Confirmar presença
            </a>

            <a
              href="#evento"
              className="rounded-full border border-[#263b45]/30 bg-white/20 px-9 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#263b45] transition hover:bg-white/70"
            >
              Ver evento
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[3.5rem] border border-white/70 bg-white/35 p-4 shadow-2xl"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[2.8rem] bg-[#d7e8ee]">
            <Image
              src="/hero.jpg"
              alt="Jo e Web"
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1f2f38]/35 via-transparent to-transparent" />

            <div className="absolute bottom-7 left-7 right-7 rounded-[2rem] bg-white/78 p-6 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.3em] text-[#6f8c96]">
                Nosso dia
              </p>
              <p className="mt-2 text-3xl font-semibold text-[#263b45]">
                2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}