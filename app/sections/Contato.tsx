"use client";

export default function Contato() {
  return (
    <section className="bg-[#d7e8ee] px-6 py-24 text-[#263b45]">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#5f7f8c]">
          Contato
        </p>

        <h2 className="mt-4 font-serif text-5xl md:text-7xl">
          Fale com a gente
        </h2>

        <p className="mt-6 text-lg text-[#435862]">
          Qualquer dúvida, estamos por aqui.
        </p>

        <div className="mt-10 space-y-3">
          <p>Email: contato@joweb.com</p>
          <p>WhatsApp: (11) 99999-9999</p>
        </div>
      </div>
    </section>
  );
}
