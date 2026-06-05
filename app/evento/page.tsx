import Image from "next/image";
import Link from "next/link";
import HashScroller from "../../components/HashScroller";
import WeddingAccessGate from "../../components/WeddingAccessGate";
import {
  CalendarDays,
  ExternalLink,
  Gem,
  Globe2,
  Heart,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Shirt,
  Sparkles,
  Tag,
} from "lucide-react";

const mapEmbedUrl =
  "https://www.google.com/maps?q=Espa%C3%A7o%20de%20Eventos%20Abric%C3%B3%2C%20Rod.%20Dr.%20Manoel%20Hip%C3%B3lito%20do%20R%C3%AAgo%2C%202354%20-%20Praia%20do%20Arrast%C3%A3o%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20SP%2C%2011605-136&t=k&output=embed";

const mapRouteUrl =
  "https://www.google.com/maps/search/?api=1&query=Espa%C3%A7o%20de%20Eventos%20Abric%C3%B3%2C%20Rod.%20Dr.%20Manoel%20Hip%C3%B3lito%20do%20R%C3%AAgo%2C%202354%20-%20Praia%20do%20Arrast%C3%A3o%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20SP%2C%2011605-136";

const inspirations = [
  {
    title: "Inspiração Masculina",
    text: "Referências de looks Beach Chic para eles.",
    href: "https://www.google.com/search?tbm=isch&q=beach+chic+masculino+casamento+praia",
    Icon: Shirt,
  },
  {
    title: "Inspiração Feminina",
    text: "Referências de looks Beach Chic para elas.",
    href: "https://www.google.com/search?tbm=isch&q=beach+chic+feminino+casamento+praia",
    Icon: Sparkles,
  },
];

const weddingPartyDressCode = [
  {
    title: "Padrinhos",
    text: "Os padrinhos estar&atilde;o vestidos com cal&ccedil;a de sarja cinza e camisa branca, em um estilo leve e elegante. Nos p&eacute;s, conforto em primeiro lugar: papetes, sapat&ecirc;nis ou chinelos em tons neutros.",
    image: "/evento/padrinhos-dresscode.png",
    alt: "Ilustracao de calca e paleta cinza dos padrinhos",
  },
  {
    title: "Madrinhas",
    text: "As madrinhas usar&atilde;o vestidos longos em tons de azul serenity, compondo uma paleta suave e elegante inspirada no mar. Os cal&ccedil;ados ser&atilde;o livres, priorizando conforto e leveza para aproveitar a cerim&ocirc;nia na praia.",
    image: "/evento/madrinhas-dresscode.png",
    alt: "Ilustracao de vestidos e paleta azul serenity das madrinhas",
  },
];

const hotels = [
  {
    name: "Abricó Beach Hotel",
    address: "Av. Manoel Hipólito do Rêgo, 323 - Praia Deserta, São Sebastião - SP, 11608-000",
    site: "https://www.abricobeachhotel.com.br/",
    phone: "(12) 98257-0001",
    coupon: "JOSEWEB10",
    image: "/evento/hotel-parceiro-1.jpg",
    whatsapp: "https://wa.me/5512982570001",
  },
  {
    name: "Hotel Arrastão",
    address: "Av. Dr. Manoel Hipólito Rego, 2097, Arrastão, São Sebastião - SP - 11605-136",
    site: "https://www.hotelarrastao.tur.br/index.php",
    phone: "(12) 3862-0099",
    coupon: "Joseane e Weberson",
    image: "/evento/hotel-parceiro-2.jpg",
    whatsapp: "https://wa.me/551238620099",
  },
];

export default function EventoPage() {
  return (
    <main className="min-h-screen bg-[#f7f1e8] text-[#082337]">
      <header className="absolute left-0 top-0 z-30 w-full px-6 py-5 text-white md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/#inicio" className="flex items-center gap-3">
            <span className="relative block h-10 w-10 overflow-hidden rounded-full border border-white/35 bg-white/10 backdrop-blur-md">
              <Image
                src="/media/gflor-logo.svg"
                alt="G Flor"
                fill
                className="object-contain p-1"
                sizes="40px"
              />
            </span>
            <span className="[font-family:var(--font-great-vibes)] text-3xl leading-none">
              Jo e Web
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

      <WeddingAccessGate>
        <HashScroller targetId="mapa" />

        <section className="relative min-h-[86vh] overflow-hidden px-6 py-28 text-white md:px-10">
          <Image
            src="/evento/abrico-cerimonia.jpg"
            alt="Casamento na praia ao pôr do sol"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#082337]/42" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#082337]/35 via-[#082337]/20 to-[#082337]/68" />

          <div className="relative z-10 mx-auto flex min-h-[calc(86vh-14rem)] max-w-5xl flex-col items-center justify-center text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-white/85">
              O Grande Dia
            </p>
            <h1 className="max-w-4xl font-serif text-5xl font-light leading-tight text-white md:text-7xl lg:text-8xl">
              03 de outubro de 2026
            </h1>
            <div className="my-6 flex w-full max-w-md items-center justify-center gap-4 text-[#d7b77a]">
              <span className="h-px flex-1 bg-[#d7b77a]/70" />
              <Heart size={26} strokeWidth={1.5} />
              <span className="h-px flex-1 bg-[#d7b77a]/70" />
            </div>
            <p className="[font-family:var(--font-great-vibes)] text-4xl leading-none text-white md:text-6xl">
              Cerimônia ao pôr do sol
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/88 md:text-lg">
              Um dia para celebrar o amor, o mar e as pessoas que fazem parte da
              nossa história.
            </p>
            <div className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/rsvp"
                className="inline-flex h-16 w-full max-w-xs items-center justify-center rounded-full border border-white/35 bg-[#173447]/80 px-8 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-2xl shadow-black/25 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-[#082337] sm:max-w-sm"
              >
                Confirmar presença
              </Link>
              <a
                href="#como-chegar"
                className="inline-flex h-16 w-full max-w-xs items-center justify-center rounded-full border border-white/35 bg-[#173447]/80 px-8 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-2xl shadow-black/25 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-[#082337] sm:max-w-sm"
              >
                Ver como chegar
              </a>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
          <div className="pointer-events-none absolute -left-16 bottom-0 hidden h-80 w-80 rounded-full bg-[#d7b77a]/10 blur-3xl md:block" />
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
            <div>
              <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.34em] text-[#b49358]">
                <Shirt size={22} strokeWidth={1.5} />
                Traje
              </p>
              <h2 className="font-serif text-5xl font-light leading-tight md:text-7xl">
                Beach Chic
              </h2>
              <div className="mt-5 h-px w-24 bg-[#d7b77a]" />
              <p className="mt-8 max-w-sm text-base leading-8 text-[#3f5360]">
                Elegante, leve e confortável para um casamento à beira-mar.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {inspirations.map(({ title, text, href, Icon }) => (
                <article
                  key={title}
                  className="rounded-lg border border-[#082337]/10 bg-white p-8 text-center shadow-[0_18px_60px_rgba(8,35,55,0.08)]"
                >
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#082337] text-white">
                    <Icon size={46} strokeWidth={1.35} />
                  </div>
                  <h3 className="mt-7 font-serif text-3xl leading-tight">
                    {title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-52 text-sm leading-7 text-[#526572]">
                    {text}
                  </p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#082337] transition hover:text-[#b49358]"
                  >
                    Ver inspirações
                    <ExternalLink size={15} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f1e8] px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#b49358]">
                Paleta especial
              </p>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-6xl">
                Os padrinhos vestem...
              </h2>
              <div className="mx-auto mt-5 h-px w-24 bg-[#d7b77a]" />
              <p className="mt-6 text-base leading-8 text-[#3f5360]">
                Para harmonizar com o cen&aacute;rio &agrave; beira-mar, nossos padrinhos e
                madrinhas seguir&atilde;o uma paleta especial.
              </p>
            </div>

            <div className="mt-12 flex flex-col items-stretch justify-center gap-8 lg:flex-row">
              {weddingPartyDressCode.map(({ title, text, image, alt }) => (
                <article
                  key={title}
                  className="flex h-full min-w-0 flex-col rounded-lg border border-[#082337]/10 bg-[#fffdf9] p-8 text-center shadow-[0_18px_60px_rgba(8,35,55,0.08)] lg:basis-0 lg:flex-1"
                >
                  <h3 className="font-serif text-4xl font-light leading-tight">
                    {title}
                  </h3>
                  {text && (
                    <p
                      className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#526572] md:text-base md:leading-8"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  )}
                  <div className="mt-auto pt-8">
                    <div className="flex h-[360px] items-center justify-center overflow-hidden rounded-lg bg-white shadow-inner shadow-[#082337]/5 sm:h-[420px] lg:h-[380px] xl:h-[440px]">
                    <Image
                      src={image}
                      alt={alt}
                      width={title === "Padrinhos" ? 520 : 520}
                      height={title === "Padrinhos" ? 230 : 640}
                      className={
                        title === "Padrinhos"
                          ? "h-auto w-[64%] max-w-sm object-contain"
                          : "h-full w-full object-contain"
                      }
                    />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#b49358]">
                Hospedagem
              </p>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-6xl">
                Nossos hotéis parceiros
              </h2>
              <div className="mx-auto mt-5 h-px w-24 bg-[#d7b77a]" />
              <p className="mt-6 text-base leading-8 text-[#3f5360]">
                Parcerias especiais para tornar sua experiência ainda mais
                completa.
              </p>
            </div>

            <div className="mt-12 flex flex-col items-stretch gap-8 lg:flex-row">
              {hotels.map((hotel) => (
                <article
                  key={hotel.name}
                  className="flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-[#082337]/10 bg-[#fffdf9] shadow-[0_18px_60px_rgba(8,35,55,0.08)] lg:basis-0 lg:flex-1"
                >
                  <div className="relative shrink-0 overflow-hidden">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      width={900}
                      height={520}
                      className="h-[260px] w-full object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <div className="absolute left-5 top-5 rounded bg-[#082337] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                      Parceria
                      <br />
                      exclusiva
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col p-7 md:p-8">
                    <h3 className="font-serif text-3xl">{hotel.name}</h3>
                    <div className="mt-5 grid gap-4 text-sm text-[#526572] sm:grid-cols-2">
                      <p className="flex items-center gap-3">
                        <MapPin size={17} className="text-[#b49358]" />
                        {hotel.address}
                      </p>
                      <a
                        href={hotel.site}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 transition hover:text-[#082337]"
                      >
                        <Globe2 size={17} className="text-[#b49358]" />
                        {hotel.site.replace("https://", "")}
                      </a>
                      <p className="flex items-center gap-3">
                        <Phone size={17} className="text-[#b49358]" />
                        {hotel.phone}
                      </p>
                    </div>

                    <div className="mt-auto pt-8">
                      <div className="flex min-h-24 flex-col gap-3 border-y border-[#082337]/10 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#b49358]">
                          <Tag size={20} />
                          Cupom de desconto
                        </p>
                        <p className="rounded bg-[#082337] px-5 py-3 text-center text-xs font-bold uppercase leading-relaxed tracking-[0.12em] text-white">
                          {hotel.coupon}
                        </p>
                      </div>

                      <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                        <a
                          href={hotel.site}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-14 min-w-0 items-center justify-center rounded-full border border-[#082337]/35 px-4 text-center text-[11px] font-bold uppercase leading-tight tracking-[0.12em] text-[#082337] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#082337] hover:!text-white xl:text-xs xl:tracking-[0.16em]"
                        >
                          Ver hotel
                        </a>
                        <a
                          href={hotel.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-14 min-w-0 items-center justify-center gap-2 rounded-full border border-[#082337]/35 px-4 text-center text-[11px] font-bold uppercase leading-tight tracking-[0.12em] text-[#082337] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#082337] hover:!text-white xl:text-xs xl:tracking-[0.16em]"
                        >
                          <MessageCircle size={16} className="shrink-0" />
                          Falar no WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="como-chegar"
          className="scroll-mt-24 bg-[#f7f1e8] px-6 py-20 md:px-10 md:py-28"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#082337]">
                Como chegar
              </p>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-6xl">
                Estamos te esperando!
              </h2>
              <div className="mt-5 h-px w-24 bg-[#d7b77a]" />
              <p className="mt-7 max-w-md text-base leading-8 text-[#3f5360]">
                Use o mapa abaixo para traçar a melhor rota até o nosso grande
                dia.
              </p>
              <a
                href={mapRouteUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex h-16 w-full max-w-sm items-center justify-center gap-3 rounded-full border border-white/35 bg-[#173447]/90 px-8 text-sm font-semibold uppercase tracking-[0.22em] !text-[#f4efe6] shadow-2xl shadow-[#082337]/18 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-[#082337] hover:!text-white"
              >
                <Navigation size={17} />
                Abrir no Google Maps
              </a>
            </div>

            <div
              id="mapa"
              className="scroll-mt-28 overflow-hidden rounded-lg border border-[#082337]/10 bg-white shadow-[0_18px_60px_rgba(8,35,55,0.08)]"
            >
              <iframe
                title="Mapa do Espaco de Eventos Abrico"
                src={mapEmbedUrl}
                className="h-[420px] w-full border-0 md:h-[520px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section className="grid bg-[#082337] text-white lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-h-[520px] items-center justify-center px-6 py-20 text-center md:px-10">
            <div className="max-w-md">
              <Gem className="mx-auto mb-7 text-[#d7b77a]" size={42} strokeWidth={1.4} />
              <p className="font-serif text-5xl font-light leading-tight md:text-6xl">
                Um combinado
              </p>
              <p className="[font-family:var(--font-great-vibes)] text-5xl leading-none text-[#d7b77a] md:text-6xl">
                com carinho
              </p>
              <p className="mx-auto mt-10 text-base leading-8 text-white/85">
                Celebre muito, preserve o espaço, respeite a cerimônia e
                aproveite cada momento. Esse dia foi pensado para ser vivido com
                leveza, alegria e presença.
              </p>
              <p className="mt-14 [font-family:var(--font-great-vibes)] text-5xl text-[#d7b77a] md:mt-16">
                Jo e Web
              </p>
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[620px]">
            <Image
              src="/evento/noite-praia.png"
              alt="Praia iluminada à noite"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <div className="absolute inset-0 bg-[#082337]/20" />
          </div>
        </section>

        <footer className="bg-[#061c2b] px-6 py-8 text-center text-white/60">
          <CalendarDays className="mx-auto mb-3 text-[#d7b77a]" size={20} />
          <p className="text-xs font-semibold uppercase tracking-[0.24em]">
            03.10.2026 · 16h30
          </p>
        </footer>
      </WeddingAccessGate>
    </main>
  );
}
