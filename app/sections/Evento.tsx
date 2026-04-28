"use client";

export default function Evento() {
  return (
    <section id="evento" className="bg-[#f4efe6] px-6 py-24 text-[#263b45]">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#6f8c96]">
          O Evento
        </p>

        <h2 className="mt-4 font-serif text-5xl md:text-7xl">
          Nosso grande dia
        </h2>

        <p className="mt-6 text-lg text-[#435862]">
          Um momento pensado para ser leve, elegante e inesquecível.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-white/60 p-6 shadow-xl">
          <h3 className="text-xl font-semibold">Cerimônia</h3>
          <p className="mt-2 text-[#435862]">
            Pés na areia, ao pôr do sol.
          </p>
        </div>

        <div className="rounded-3xl bg-white/60 p-6 shadow-xl">
          <h3 className="text-xl font-semibold">Festa</h3>
          <p className="mt-2 text-[#435862]">
            Música, comida boa e muita energia.
          </p>
        </div>
      </div>
    </section>
  );
}