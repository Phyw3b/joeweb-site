export default function Page() {
  return (
    <section className="card">
      <span className="badge">Experiência</span>

      <h1 className="h1">Presentes (Histórias)</h1>

      <p className="p">
        Não teremos lista de presentes tradicional. Aqui, cada presente desbloqueia uma história nossa.
        Você escolhe uma foto, contribui e libera um capítulo do nosso álbum.
      </p>

      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <div className="card" style={{ padding: 14 }}>
          <h2 className="h2">Como funciona</h2>
          <p className="p">
            Clique em uma foto → informe seu nome → escolha um valor (mínimo de <strong>R$ 100</strong>) →
            pague via Pix ou cartão → a história é desbloqueada e seu nome aparece como quem liberou.
          </p>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <h2 className="h2">Capítulo final</h2>
          <p className="p">
            Quando todas as histórias forem reveladas, liberaremos o capítulo final com o destino da nossa lua de mel.
            A liberação é automática, mas o reveal só acontece com nossa aprovação antes 😉
          </p>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <h2 className="h2">Status</h2>
          <p className="p">Em breve: 0/60 histórias reveladas.</p>
        </div>
      </div>

      <p className="p" style={{ marginTop: 14 }}>
        Em breve entra no ar a primeira versão do game.
      </p>
    </section>
  );
}
