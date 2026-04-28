"use client";

export default function Presentes() {
  return (
    <section className="bg-[#f4efe6] px-6 py-24 text-[#263b45]">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#6f8c96]">
          Presentes
        </p>

        <h2 className="mt-4 font-serif text-5xl md:text-7xl">
          Com carinho
        </h2>

        <p className="mt-6 text-lg text-[#435862]">
          Mais importante que qualquer presente é ter você com a gente nesse dia.
          Mas, se quiser nos presentear, preparamos algo especial.
        </p>

        <div className="mt-10">
          <a
            href="/presentes"
            className="rounded-full bg-[#263b45] px-8 py-4 text-sm uppercase tracking-[0.2em] text-white hover:bg-[#7fa6b3]"
          >
            Ver lista
          </a>
        </div>
      </div>
    </section>
  );
}