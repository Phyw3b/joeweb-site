import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Car,
  Clock,
  Hotel,
  MapPin,
  Shirt,
  Sparkles,
} from "lucide-react";

const details = [
  {
    Icon: CalendarDays,
    title: "Data e horário",
    text: "03.10.2026, às 17 horas. Chegue com antecedência para viver a cerimônia com calma.",
    note: "O sol não espera. A cerimônia exige pontualidade!",
  },
  {
    Icon: MapPin,
    title: "Local",
    text: "Espaço de Eventos Abricó. Rod. Dr. Manoel Hipólito do Rêgo, 2354 - Praia do Arrastão, São Sebastião - SP, CEP: 11605-136.",
    note: "Cerimônia ao pôr do sol, pé na areia e festa na sequência.",
  },
  {
    Icon: Shirt,
    title: "Dress Code",
    text: "Praia elegante: tecidos leves, tons claros e sapatos confortáveis para areia.",
    note: "Evite salto fino e roupas muito escuras.",
  },
  {
    Icon: Hotel,
    title: "Hospedagem",
    text: "Em breve vamos indicar opções próximas ao Espaço de Eventos Abricó para facilitar a logística.",
    note: "Sugestões e contatos serão atualizados aqui.",
  },
  {
    Icon: Car,
    title: "Como chegar",
    text: "Organize seu deslocamento considerando trânsito, estacionamento e horário do pôr do sol.",
    note: "Recomendamos chegar pelo menos 40 minutos antes.",
  },
  {
    Icon: Sparkles,
    title: "Regras",
    text: "Celebre muito, mas preserve o espaço, respeite a cerimônia e aproveite cada momento.",
    note: "Durante a entrada, pedimos celulares discretos para manter a emoção do momento.",
  },
];

export default function EventoPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#173447]">
      <header className="bg-[#082337] px-6 py-5 text-white md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/#inicio" className="flex items-center gap-3">
            <span className="relative block h-10 w-10 overflow-hidden rounded-full border border-white/35 bg-white/10">
              <Image
                src="/media/gflor-logo.svg"
                alt="G Flor"
                fill
                className="object-contain p-1"
                sizes="40px"
              />
            </span>
            <span className="[font-family:var(--font-allura)] text-3xl leading-none">
              Jo & Web
            </span>
          </Link>
          <Link
            href="/#o-evento"
            className="[font-family:var(--font-montserrat)] text-xs font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:text-white"
          >
            Voltar
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#173447] px-6 py-20 text-white md:px-10 md:py-28">
        <div className="absolute inset-0 opacity-28">
          <Image
            src="/evento/local.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#082337]/72" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.38em] text-[#b8dce7]">
            O evento
          </p>
          <h1 className="font-serif text-5xl font-light italic leading-tight md:text-7xl">
            Tudo para chegar leve e no horário.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Data, local, mapa, hospedagem e cuidados para celebrar com a gente
            sem pressa, sem dúvida e com o coração inteiro no momento.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-[#173447]/10">
            <div className="relative h-80">
              <Image
                src="/evento/local.jpg"
                alt="Espaço de Eventos Abricó"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#3f7f97]">
                Local
              </p>
              <h2 className="font-serif text-4xl italic">Espaço de Eventos Abricó</h2>
              <p className="mt-4 leading-7 text-[#61727a]">
                Rod. Dr. Manoel Hipólito do Rêgo, 2354 - Praia do Arrastão, São Sebastião - SP, CEP: 11605-136. Um cenário pensado para cerimônia ao pôr do
                sol, pé na areia e festa na sequência.
              </p>
            </div>
          </article>

          <div className="grid gap-6">
            {details.map(({ Icon, title, text, note }) => (
              <article
                key={title}
                className="rounded-[2rem] border border-[#173447]/10 bg-white/70 p-7 shadow-xl shadow-[#173447]/8"
              >
                <Icon className="mb-4 text-[#3f7f97]" size={26} />
                <h2 className="font-serif text-3xl italic">{title}</h2>
                <p className="mt-3 leading-7 text-[#61727a]">{text}</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#173447]">
                  {note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e6edf0] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-3">
            <MapPin className="text-[#3f7f97]" />
            <h2 className="font-serif text-4xl italic">Mapa</h2>
          </div>
          <div className="grid min-h-[360px] place-items-center rounded-[2rem] border border-[#173447]/10 bg-white/70 p-8 text-center shadow-xl shadow-[#173447]/10">
            <div>
              <p className="mx-auto max-w-xl leading-7 text-[#61727a]">
                O mapa oficial entra aqui. Por enquanto, este bloco já reserva
                o espaço para embed do Google Maps ou botão de rota.
              </p>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-full bg-[#173447] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#082337]"
              >
                Abrir mapa
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#082337] px-6 py-10 text-center text-white/60">
        <Clock className="mx-auto mb-3 text-[#b8dce7]" />
        <p className="text-sm uppercase tracking-[0.24em]">
          03.10.2026 · 17 horas
        </p>
      </footer>
    </main>
  );
}
