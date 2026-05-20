"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";

type WeddingAccessGateProps = {
  children: ReactNode;
};

export default function WeddingAccessGate({
  children,
}: WeddingAccessGateProps) {
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isDev = process.env.NODE_ENV !== "production";

  useEffect(() => {
    let active = true;

    async function checkAccess() {
      try {
        const response = await fetch("/api/wedding-auth/check", {
          cache: "no-store",
        });
        const data = (await response.json()) as { authenticated?: boolean };

        if (active) {
          setHasAccess(Boolean(data.authenticated));
        }
      } catch {
        if (active) {
          setHasAccess(false);
        }
      } finally {
        if (active) {
          setCheckingAccess(false);
        }
      }
    }

    void checkAccess();

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/wedding-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(
          data.message ?? "Senha incorreta. Confira no convite e tente novamente."
        );
      }

      setHasAccess(true);
      setPassword("");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Senha incorreta. Confira no convite e tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/wedding-auth/logout", { method: "POST" });
    setHasAccess(false);
  }

  if (checkingAccess) {
    return null;
  }

  if (hasAccess) {
    return (
      <>
        {isDev && (
          <div className="fixed bottom-4 right-4 z-[90]">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-white/30 bg-[#082337]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-md transition hover:bg-[#082337]"
            >
              sair
            </button>
          </div>
        )}
        {children}
      </>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#f4efe6] px-6 py-20 text-[#173447] md:px-10 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(159,199,215,0.32),transparent_34%),linear-gradient(180deg,#f4efe6_0%,#e6edf0_100%)]" />
      <div className="relative mx-auto max-w-xl rounded-[2rem] border border-white/80 bg-white/72 p-8 text-center shadow-2xl shadow-[#173447]/14 backdrop-blur-md md:p-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-[#3f7f97]">
          Acesso dos convidados
        </p>
        <h2 className="font-serif text-4xl font-light italic leading-tight text-[#173447] md:text-5xl">
          Bem-vindo ao nosso casamento.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#61727a]">
          Digite a senha enviada no convite para acessar as informações do
          casamento.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <label className="sr-only" htmlFor="wedding-password">
            Senha do convite
          </label>
          <input
            id="wedding-password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            placeholder="Senha do convite"
            autoComplete="current-password"
            className="h-16 w-full rounded-full border border-[#d8c9b0]/80 bg-white px-6 text-center text-base text-[#173447] outline-none transition placeholder:text-[#61727a]/70 focus:border-[#3f7f97] focus:ring-4 focus:ring-[#9fc7d7]/30"
          />
          {error && (
            <p className="mt-4 rounded-2xl bg-[#f4efe6] px-5 py-4 text-sm font-semibold text-[#8a4d36]">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex h-16 w-full items-center justify-center rounded-full border border-white/35 bg-[#173447]/90 px-8 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-xl shadow-[#173447]/18 transition hover:-translate-y-0.5 hover:bg-[#082337] disabled:cursor-not-allowed disabled:bg-[#61727a]/55"
          >
            {submitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </section>
  );
}
