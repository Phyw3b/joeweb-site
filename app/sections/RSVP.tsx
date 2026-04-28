"use client";

export default function RSVP() {
  return (
    <section id="rsvp" className="bg-[#d7e8ee] px-6 py-24 text-[#263b45]">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#5f7f8c]">
          Confirmação
        </p>

        <h2 className="mt-4 font-serif text-5xl md:text-7xl">
          Confirme sua presença
        </h2>

        <p className="mt-6 text-lg text-[#435862]">
          Sua presença é muito importante para nós.
        </p>

        <div className="mt-10">
          <a
            href="#"
            className="rounded-full bg-[#263b45] px-8 py-4 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#7fa6b3]"
          >
            Confirmar agora
          </a>
        </div>
      </div>
    </section>
  );
}