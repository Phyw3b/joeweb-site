"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type GiftRow = {
  unlockId: string;
  memoryId: number;
  publicGuestName: string;
  unlockedAt: string;
  paymentGuestName: string;
  guestEmail: string;
  guestId: string | null;
  guestGroupId: string | null;
  amount: string;
  status: string;
  approvedAt: string | null;
  paymentCreatedAt: string;
};

type ApiMessage = {
  success: false;
  message?: string;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return dateFormatter.format(new Date(value));
}

function formatCurrency(value: string) {
  const amount = Number(value);

  return Number.isFinite(amount) ? currencyFormatter.format(amount) : value;
}

export default function GiftAdminPanel() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [gifts, setGifts] = useState<GiftRow[]>([]);
  const [draftNames, setDraftNames] = useState<Record<string, string>>({});
  const [loadingGifts, setLoadingGifts] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");

  async function loadGifts() {
    setLoadingGifts(true);
    setNotice("");

    try {
      const response = await fetch("/api/admin/gifts", { cache: "no-store" });
      const data = (await response.json()) as
        | { success: true; gifts: GiftRow[] }
        | ApiMessage;

      if (!response.ok || !data.success) {
        const message =
          "message" in data ? data.message : "Nao foi possivel carregar presentes.";

        throw new Error(message ?? "Nao foi possivel carregar presentes.");
      }

      setGifts(data.gifts);
      setDraftNames(
        Object.fromEntries(
          data.gifts.map((gift) => [gift.unlockId, gift.publicGuestName])
        )
      );
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "Nao foi possivel carregar presentes."
      );
    } finally {
      setLoadingGifts(false);
    }
  }

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      try {
        const response = await fetch("/api/admin/auth/check", {
          cache: "no-store",
        });
        const data = (await response.json()) as { authenticated?: boolean };

        if (active) {
          setAuthenticated(Boolean(data.authenticated));
        }
      } finally {
        if (active) {
          setCheckingAuth(false);
        }
      }
    }

    void checkAuth();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (authenticated) {
      void loadGifts();
    }
  }, [authenticated]);

  const filteredGifts = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return gifts;
    }

    return gifts.filter((gift) =>
      [
        String(gift.memoryId).padStart(2, "0"),
        gift.publicGuestName,
        gift.paymentGuestName,
        gift.guestEmail,
        gift.guestId ?? "",
        gift.guestGroupId ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [gifts, query]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as {
        authenticated?: boolean;
        message?: string;
      };

      if (!response.ok || !data.authenticated) {
        throw new Error(data.message ?? "Senha administrativa incorreta.");
      }

      setPassword("");
      setAuthenticated(true);
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "Senha administrativa incorreta."
      );
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    setAuthenticated(false);
    setGifts([]);
  }

  async function saveGiftName(gift: GiftRow) {
    const publicGuestName = draftNames[gift.unlockId]?.trim() ?? "";

    if (!publicGuestName) {
      setNotice("Informe um nome publico antes de salvar.");
      return;
    }

    setSavingId(gift.unlockId);
    setNotice("");

    try {
      const response = await fetch("/api/admin/gifts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unlockId: gift.unlockId,
          publicGuestName,
        }),
      });
      const data = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Nao foi possivel salvar.");
      }

      setGifts((current) =>
        current.map((item) =>
          item.unlockId === gift.unlockId
            ? { ...item, publicGuestName }
            : item
        )
      );
      setNotice(`Memoria ${String(gift.memoryId).padStart(2, "0")} atualizada.`);
    } catch (error) {
      setNotice(
        error instanceof Error ? error.message : "Nao foi possivel salvar."
      );
    } finally {
      setSavingId("");
    }
  }

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-[#f5f1ea] px-5 py-8 text-[#173447]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em]">
          Carregando
        </p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#f5f1ea] px-5 py-8 text-[#173447]">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center">
          <form
            onSubmit={handleLogin}
            className="w-full border border-[#d9cdbb] bg-white p-6 shadow-xl shadow-[#173447]/10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#607985]">
              Admin presentes
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-[#173447]">
              Editar nomes exibidos
            </h1>
            <label
              className="mt-8 block text-xs font-semibold uppercase tracking-[0.18em] text-[#607985]"
              htmlFor="admin-password"
            >
              Senha administrativa
            </label>
            <input
              id="admin-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setAuthError("");
              }}
              className="mt-2 h-12 w-full border border-[#d9cdbb] bg-white px-4 text-base text-[#173447] outline-none focus:border-[#3f7f97] focus:ring-4 focus:ring-[#9fc7d7]/30"
              type="password"
              autoComplete="current-password"
            />
            {authError && (
              <p className="mt-4 bg-[#fff4e8] px-4 py-3 text-sm font-semibold text-[#8a4d36]">
                {authError}
              </p>
            )}
            <button
              type="submit"
              className="mt-5 h-12 w-full bg-[#173447] px-5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#082337]"
            >
              Entrar
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f1ea] px-4 py-6 text-[#173447] md:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 border-b border-[#d9cdbb] pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#607985]">
              Admin presentes
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#173447]">
              Nomes das memorias
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={loadGifts}
              className="h-10 border border-[#173447]/20 px-4 text-sm font-semibold text-[#173447] transition hover:bg-white"
            >
              Atualizar
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="h-10 bg-[#173447] px-4 text-sm font-semibold text-white transition hover:bg-[#082337]"
            >
              Sair
            </button>
          </div>
        </header>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 w-full border border-[#d9cdbb] bg-white px-4 text-sm text-[#173447] outline-none focus:border-[#3f7f97] focus:ring-4 focus:ring-[#9fc7d7]/30 md:max-w-sm"
            placeholder="Buscar memoria, nome, email ou familia"
          />
          <p className="text-sm font-semibold text-[#607985]">
            {filteredGifts.length} de {gifts.length} memorias desbloqueadas
          </p>
        </div>

        {notice && (
          <p className="mt-4 border border-[#d9cdbb] bg-white px-4 py-3 text-sm font-semibold text-[#173447]">
            {notice}
          </p>
        )}

        <div className="mt-5 overflow-x-auto border border-[#d9cdbb] bg-white">
          <table className="min-w-[980px] w-full border-collapse text-left text-sm">
            <thead className="bg-[#eef4f6] text-xs uppercase tracking-[0.14em] text-[#607985]">
              <tr>
                <th className="px-4 py-3">Memoria</th>
                <th className="px-4 py-3">Nome publico</th>
                <th className="px-4 py-3">Comprador</th>
                <th className="px-4 py-3">Grupo</th>
                <th className="px-4 py-3">Valor</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Acao</th>
              </tr>
            </thead>
            <tbody>
              {loadingGifts ? (
                <tr>
                  <td className="px-4 py-6 text-[#607985]" colSpan={7}>
                    Carregando presentes...
                  </td>
                </tr>
              ) : filteredGifts.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-[#607985]" colSpan={7}>
                    Nenhuma memoria encontrada.
                  </td>
                </tr>
              ) : (
                filteredGifts.map((gift) => {
                  const draftName = draftNames[gift.unlockId] ?? "";
                  const changed = draftName.trim() !== gift.publicGuestName;

                  return (
                    <tr
                      key={gift.unlockId}
                      className="border-t border-[#e5ddd0] align-top"
                    >
                      <td className="px-4 py-4 font-semibold">
                        {String(gift.memoryId).padStart(2, "0")}
                      </td>
                      <td className="px-4 py-4">
                        <input
                          value={draftName}
                          onChange={(event) =>
                            setDraftNames((current) => ({
                              ...current,
                              [gift.unlockId]: event.target.value,
                            }))
                          }
                          className="h-10 w-full min-w-52 border border-[#d9cdbb] px-3 text-sm text-[#173447] outline-none focus:border-[#3f7f97] focus:ring-4 focus:ring-[#9fc7d7]/30"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold">{gift.paymentGuestName}</p>
                        <p className="mt-1 text-xs text-[#607985]">
                          {gift.guestEmail}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-[#607985]">
                        <p>{gift.guestGroupId ?? "-"}</p>
                        <p className="mt-1 text-xs">{gift.guestId ?? "-"}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p>{formatCurrency(gift.amount)}</p>
                        <p className="mt-1 text-xs uppercase text-[#607985]">
                          {gift.status}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-[#607985]">
                        {formatDate(gift.approvedAt ?? gift.unlockedAt)}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => saveGiftName(gift)}
                          disabled={!changed || savingId === gift.unlockId}
                          className="h-10 bg-[#173447] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#082337] disabled:cursor-not-allowed disabled:bg-[#9ba9ae]"
                        >
                          {savingId === gift.unlockId ? "Salvando" : "Salvar"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
