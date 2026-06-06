"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, MessageCircle, Search } from "lucide-react";

type GuestResponse = "confirmado" | "nao-vai" | null;

type Guest = {
  id: string;
  idGenero: string;
  nomeIndividual: string;
  confirmado: string;
  statusIndividual: string;
  tamanhoChinelo: string;
  response: GuestResponse;
};

type SearchResult = {
  success: true;
  familyId: string;
  qtdConvites: number;
  guests: Omit<Guest, "response">[];
};

type ConfirmResult =
  | {
      success: true;
      message: string;
    }
  | ApiMessage;

type ApiMessage = {
  success: false;
  message: string;
  code?: string;
  advisor?: AdvisorContact;
};

type AdvisorContact = {
  name: string;
  whatsapp: string;
  whatsappUrl: string;
  email: string;
};

const defaultNotFound =
  "Não encontramos seu convite. Confira o nome ou fale com os noivos.";
const rsvpClosedCode = "RSVP_CLOSED";

function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isFemale(guest: Guest) {
  const gender = normalizeText(guest.idGenero);
  return gender === "feminino" || gender === "femino" || gender === "f";
}

function getInitialResponse(guest: Omit<Guest, "response">): GuestResponse {
  const confirmado = normalizeText(guest.confirmado);
  const status = normalizeText(guest.statusIndividual);

  if (status === "confirmado" || confirmado === "sim") {
    return "confirmado";
  }

  if (status === "nao ira") {
    return "nao-vai";
  }

  return null;
}

export default function RsvpLookup() {
  const [query, setQuery] = useState("");
  const [familyId, setFamilyId] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [closedRsvp, setClosedRsvp] = useState<ApiMessage | null>(null);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearching(true);
    setMessage("");
    setSuccessMessage("");
    setClosedRsvp(null);

    try {
      const response = await fetch("/api/rsvp/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = (await response.json()) as SearchResult | ApiMessage;

      if (!response.ok || data.success !== true) {
        throw new Error("message" in data ? data.message : defaultNotFound);
      }

      setFamilyId(data.familyId);
      setGuests(
        data.guests.map((guest) => ({
          ...guest,
          response: getInitialResponse(guest),
        }))
      );
    } catch (error) {
      setFamilyId("");
      setGuests([]);
      setMessage(error instanceof Error ? error.message : defaultNotFound);
    } finally {
      setSearching(false);
    }
  }

  function updateGuest(id: string, nextGuest: Partial<Guest>) {
    setGuests((current) =>
      current.map((guest) =>
        guest.id === id ? { ...guest, ...nextGuest } : guest
      )
    );
    setMessage("");
    setSuccessMessage("");
    setClosedRsvp(null);
  }

  async function handleConfirm() {
    const hasPendingResponse = guests.some((guest) => !guest.response);

    if (hasPendingResponse) {
      setMessage("Selecione uma resposta para cada nome do convite.");
      return;
    }

    const missingSandalSize = guests.some(
      (guest) =>
        guest.response === "confirmado" &&
        isFemale(guest) &&
        !guest.tamanhoChinelo.trim()
    );

    if (missingSandalSize) {
      setMessage("Informe o número do chinelo para confirmar a presença.");
      return;
    }

    setSaving(true);
    setMessage("");
    setSuccessMessage("");
    setClosedRsvp(null);

    try {
      const response = await fetch("/api/rsvp/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          familyId,
          guests: guests.map((guest) => ({
            id: guest.id,
            confirmed: guest.response === "confirmado",
            tamanhoChinelo: guest.tamanhoChinelo,
          })),
        }),
      });
      const data = (await response.json()) as ConfirmResult;

      if (!response.ok || !data.success) {
        if ("code" in data && data.code === rsvpClosedCode) {
          setClosedRsvp(data);
          return;
        }

        throw new Error(data.message);
      }

      setSuccessMessage(
        "Presença confirmada com carinho. Obrigado por fazer parte da nossa história."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível confirmar seu RSVP. Tente novamente."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/75 bg-white/88 p-6 text-left shadow-2xl shadow-[#173447]/14 backdrop-blur-md md:p-9">
      <form
        onSubmit={handleSearch}
        className="grid gap-4 md:grid-cols-[1fr_auto]"
      >
        <label className="sr-only" htmlFor="rsvp-search">
          Buscar convite
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#3f7f97]"
            size={20}
          />
          <input
            id="rsvp-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Digite seu nome completo"
            className="h-16 w-full rounded-full border border-[#d8c9b0]/80 bg-white px-14 text-base text-[#173447] outline-none transition placeholder:text-[#61727a]/70 focus:border-[#3f7f97] focus:ring-4 focus:ring-[#9fc7d7]/30"
          />
        </div>
        <button
          type="submit"
          disabled={searching}
          className="inline-flex h-16 items-center justify-center rounded-full border border-white/35 bg-[#173447]/90 px-8 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-xl shadow-[#173447]/18 transition hover:-translate-y-0.5 hover:bg-[#082337] disabled:cursor-not-allowed disabled:bg-[#61727a]/55"
        >
          {searching ? "Localizando..." : "Localizar convite"}
        </button>
      </form>

      <p className="mt-4 px-2 text-left text-sm leading-6 text-[#61727a] md:px-5">
        Caso não encontre seu nome ou tenha alguma dúvida, fale com nossa
        assessoria Isabel{" "}
        <a
          href="https://wa.me/5512991552826"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[#3f7f97] underline-offset-4 transition hover:text-[#173447] hover:underline"
        >
          <MessageCircle size={14} aria-hidden="true" />
          +55 12 99155-2826
        </a>
        .
      </p>

      {message && (
        <p className="mt-4 rounded-2xl bg-[#f4efe6] px-5 py-4 text-center text-sm font-semibold text-[#8a4d36]">
          {message}
        </p>
      )}

      {closedRsvp && (
        <div className="mt-4 rounded-2xl bg-[#f4efe6] px-5 py-4 text-center text-sm font-semibold text-[#8a4d36]">
          <p className="whitespace-pre-line">{closedRsvp.message}</p>
          {closedRsvp.advisor && (
            <div className="mt-4 space-y-1 text-[#61727a]">
              <p>{closedRsvp.advisor.name}</p>
              <p>{closedRsvp.advisor.whatsapp}</p>
              <a
                href={`mailto:${closedRsvp.advisor.email}`}
                className="inline-flex text-[#3f7f97] underline-offset-4 hover:underline"
              >
                {closedRsvp.advisor.email}
              </a>
            </div>
          )}
          <a
            href={closedRsvp.advisor?.whatsappUrl ?? "https://wa.me/5512991552826"}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#173447] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:bg-[#082337]"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Falar com a assessoria
          </a>
        </div>
      )}

      {familyId && (
        <div className="mt-8 rounded-[1.5rem] border border-[#9fc7d7]/50 bg-[#e6edf0]/70 p-5 text-left md:p-7">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="shrink-0 text-[#3f7f97]" size={26} />
            <h2 className="font-serif text-3xl italic text-[#173447]">
              Convite localizado
            </h2>
          </div>

          <div className="mt-6 flex max-w-xl flex-col gap-4">
            {guests.map((guest) => {
              const showSandalSize =
                guest.response === "confirmado" && isFemale(guest);

              return (
                <div
                  key={guest.id}
                  className="box-border w-full max-w-full overflow-hidden rounded-[1.25rem] border border-white/80 bg-white/85 p-4 shadow-lg shadow-[#173447]/6"
                >
                  <div className="flex min-w-0 flex-col items-start gap-4">
                    <p className="whitespace-nowrap text-lg font-semibold text-[#173447]">
                      {guest.nomeIndividual}
                    </p>
                    <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap">
                      <button
                        type="button"
                        onClick={() =>
                          updateGuest(guest.id, { response: "confirmado" })
                        }
                        className={`inline-flex min-h-11 max-w-full items-center justify-center whitespace-nowrap rounded-full px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] transition disabled:cursor-not-allowed disabled:opacity-45 ${
                          guest.response === "confirmado"
                            ? "bg-[#173447] text-white"
                            : "bg-[#dcecf1] text-[#173447] hover:bg-[#c6e1ea]"
                        }`}
                      >
                        Confirmo presença
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateGuest(guest.id, { response: "nao-vai" })
                        }
                        className={`inline-flex min-h-11 max-w-full items-center justify-center whitespace-nowrap rounded-full px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] transition disabled:cursor-not-allowed disabled:opacity-45 ${
                          guest.response === "nao-vai"
                            ? "bg-[#61727a] text-white"
                            : "bg-[#f4efe6] text-[#61727a] hover:bg-[#eadfcd]"
                        }`}
                      >
                        Não poderei comparecer
                      </button>
                    </div>
                  </div>

                  {showSandalSize && (
                    <label className="mt-4 block max-w-xs text-xs font-bold uppercase tracking-[0.14em] text-[#61727a]">
                      Número do chinelo
                      <input
                        value={guest.tamanhoChinelo}
                        onChange={(event) =>
                          updateGuest(guest.id, {
                            tamanhoChinelo: event.target.value,
                          })
                        }
                        className="mt-2 h-12 w-full rounded-2xl border border-[#d8c9b0]/80 bg-white px-4 text-center text-sm font-normal normal-case tracking-normal text-[#173447] outline-none focus:border-[#3f7f97] disabled:cursor-not-allowed disabled:bg-[#eef1f2] disabled:text-[#61727a]"
                      />
                    </label>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={saving}
            className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-full bg-[#173447] px-8 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-xl shadow-[#173447]/18 transition hover:-translate-y-0.5 hover:bg-[#082337] disabled:cursor-not-allowed disabled:bg-[#61727a]/45 disabled:shadow-none"
          >
            {saving ? "Registrando..." : "Registrar resposta"}
          </button>

          {successMessage && (
            <p className="mt-5 rounded-2xl bg-white/75 px-5 py-4 text-center font-semibold text-[#3f7f97]">
              {successMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
