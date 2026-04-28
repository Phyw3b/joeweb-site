"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Heart,
  Menu,
  Search,
  Users,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type GuestStatus = "confirmado" | "nao-vai";

type Invitation = {
  id: string;
  titular: string;
  convidados: string[];
  permiteCriancas: boolean;
};

const WHATSAPP_ASSESSORIA = "https://wa.me/5511999999999";

const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Nossa História", href: "/#nossa-historia" },
  { label: "Evento", href: "/evento" },
  { label: "RSVP", href: "/rsvp" },
  { label: "Presentes", href: "/presentes" },
];

export default function RSVPPage() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [responses, setResponses] = useState<Record<string, GuestStatus>>({});
  const [registered, setRegistered] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [savingResponse, setSavingResponse] = useState(false);
  const [apiError, setApiError] = useState("");

  const allAnswered = useMemo(
    () =>
      Boolean(invitation) &&
      invitation!.convidados.every((guest) => responses[guest]),
    [invitation, responses]
  );

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoadingSearch(true);
    setApiError("");

    try {
      const response = await fetch("/api/rsvp/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: query }),
      });
      const data = (await response.json()) as {
        convite?: Invitation | null;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível localizar o convite.");
      }

      setSearched(true);
      setInvitation(data.convite ?? null);
      setResponses({});
      setRegistered(false);
    } catch (error) {
      setSearched(false);
      setInvitation(null);
      setApiError(
        error instanceof Error
          ? error.message
          : "Não foi possível localizar o convite."
      );
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleResponse = (guest: string, status: GuestStatus) => {
    setResponses((current) => ({ ...current, [guest]: status }));
    setRegistered(false);
  };

  const handleRegister = async () => {
    if (!allAnswered || !invitation) {
      return;
    }

    setSavingResponse(true);
    setApiError("");

    try {
      const response = await fetch("/api/rsvp/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitationId: invitation.id,
          responses,
        }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível registrar sua resposta.");
      }

      setRegistered(true);
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Não foi possível registrar sua resposta."
      );
    } finally {
      setSavingResponse(false);
    }
  };

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
                Jo & Web
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
            {navItems.map((item) => {
              const active = item.label === "RSVP";

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`[font-family:var(--font-montserrat)] text-sm font-semibold uppercase tracking-[0.16em] !text-white transition [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] hover:!text-[#dcecf1] ${
                    active ? "opacity-100 underline decoration-[#b8dce7] underline-offset-8" : "opacity-80"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
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

      <section className="relative overflow-hidden bg-[#082337] px-6 py-20 text-white md:px-10 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,220,231,0.26),transparent_34%),linear-gradient(135deg,#082337_0%,#173447_52%,#2b5069_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f4efe6] to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <p className="mb-5 text-xs uppercase tracking-[0.38em] text-[#b8dce7]">
            RSVP
          </p>
          <h1 className="font-serif text-5xl font-light italic leading-tight md:text-7xl">
            A sua presença importa.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/78">
            Preparamos cada detalhe com muito carinho para receber você. Por
            isso, o convite é pessoal e válido apenas para os nomes indicados.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#dcecf1]/80">
            Ao localizar seu convite, serão exibidos os nomes convidados para
            confirmação.
          </p>
        </motion.div>
      </section>

      <section className="px-6 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto -mt-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[2rem] border border-white/75 bg-white/88 p-6 shadow-2xl shadow-[#173447]/14 backdrop-blur-md md:p-9"
          >
            <form onSubmit={handleSearch} className="[display:grid] gap-4 md:[grid-template-columns:1fr_auto]">
              <label className="sr-only" htmlFor="guest-name">
                Digite seu nome completo
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#3f7f97]"
                  size={20}
                />
                <input
                  id="guest-name"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Digite seu nome completo"
                  className="h-16 w-full rounded-full border border-[#d8c9b0]/80 bg-white px-14 text-base text-[#173447] outline-none transition placeholder:text-[#61727a]/70 focus:border-[#3f7f97] focus:ring-4 focus:ring-[#9fc7d7]/30"
                />
              </div>
              <button
                type="submit"
                disabled={loadingSearch}
                className="inline-flex h-16 items-center justify-center rounded-full border border-white/35 bg-[#173447]/90 px-8 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-xl shadow-[#173447]/18 transition hover:-translate-y-0.5 hover:bg-[#082337]"
              >
                {loadingSearch ? "Localizando..." : "Localizar convite"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm leading-6 text-[#61727a]">
              Caso não encontre seu nome ou tenha alguma dúvida, fale com nossa
              assessoria.
            </p>

            {apiError && (
              <p className="mt-4 rounded-2xl bg-[#f4efe6] px-5 py-4 text-center text-sm font-semibold text-[#8a4d36]">
                {apiError}
              </p>
            )}

            <AnimatePresence mode="wait">
              {searched && invitation && (
                <motion.div
                  key={invitation.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="mt-8 rounded-[1.5rem] border border-[#9fc7d7]/50 bg-[#e6edf0]/70 p-5 md:p-7"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="mt-1 text-[#3f7f97]" size={26} />
                    <div>
                      <h2 className="font-serif text-3xl italic text-[#173447]">
                        Convite localizado
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-[#61727a]">
                        Confira abaixo os nomes autorizados para confirmação.
                        O convite é pessoal e intransferível.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 [display:grid] gap-4">
                    {invitation.convidados.map((guest) => (
                      <div
                        key={guest}
                        className="rounded-[1.25rem] border border-white/80 bg-white/85 p-4 shadow-lg shadow-[#173447]/6"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <p className="font-semibold text-[#173447]">
                            {guest}
                          </p>
                          <div className="flex flex-col gap-2 sm:flex-row">
                            <button
                              type="button"
                              onClick={() => handleResponse(guest, "confirmado")}
                              className={`rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition ${
                                responses[guest] === "confirmado"
                                  ? "bg-[#173447] text-white"
                                  : "bg-[#dcecf1] text-[#173447] hover:bg-[#c6e1ea]"
                              }`}
                            >
                              Confirmo presença
                            </button>
                            <button
                              type="button"
                              onClick={() => handleResponse(guest, "nao-vai")}
                              className={`rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition ${
                                responses[guest] === "nao-vai"
                                  ? "bg-[#61727a] text-white"
                                  : "bg-[#f4efe6] text-[#61727a] hover:bg-[#eadfcd]"
                              }`}
                            >
                              Não poderei comparecer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleRegister}
                    disabled={!allAnswered || savingResponse}
                    className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-full bg-[#173447] px-8 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-xl shadow-[#173447]/18 transition hover:-translate-y-0.5 hover:bg-[#082337] disabled:cursor-not-allowed disabled:bg-[#61727a]/45 disabled:shadow-none"
                  >
                    {savingResponse ? "Registrando..." : "Registrar resposta"}
                  </button>

                  {registered && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5 rounded-2xl bg-white/75 px-5 py-4 text-center font-semibold text-[#3f7f97]"
                    >
                      Obrigado! Sua resposta foi registrada.
                    </motion.p>
                  )}
                </motion.div>
              )}

              {searched && !invitation && (
                <motion.div
                  key="not-found"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="mt-8 rounded-[1.5rem] border border-[#d8c9b0]/70 bg-[#f4efe6]/80 p-5 md:p-7"
                >
                  <div className="flex items-start gap-4">
                    <AlertCircle className="mt-1 text-[#3f7f97]" size={26} />
                    <div>
                      <h2 className="font-serif text-3xl italic text-[#173447]">
                        Não encontramos este nome na lista de convidados.
                      </h2>
                      <p className="mt-3 leading-7 text-[#61727a]">
                        A lista é restrita aos nomes previamente convidados. Se
                        acredita que houve algum erro ou tem alguma dúvida, fale
                        com nossa assessoria.
                      </p>
                      <a
                        href={WHATSAPP_ASSESSORIA}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex h-14 items-center justify-center rounded-full border border-white/35 bg-[#173447]/90 px-7 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-xl shadow-[#173447]/16 transition hover:-translate-y-0.5 hover:bg-[#082337]"
                      >
                        Falar com a assessoria
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

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
          Jo & Web
        </p>
      </footer>
    </main>
  );
}
