export default function Page() {
  return (
    <section className="card">
      <span className="badge">RSVP</span>

      <h1 className="h1">Confirmação de presença</h1>

      <p className="p">
        A confirmação de presença ficará disponível aqui. Em breve vamos abrir o formulário oficial.
      </p>

      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <div className="card" style={{ padding: 14 }}>
          <h2 className="h2">Como vai funcionar</h2>
          <p className="p">
            Você informa seu nome, se terá acompanhante e confirma presença. Simples, rápido e sem estresse.
          </p>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <h2 className="h2">Atenção</h2>
          <p className="p">
            Pedimos que confirme assim que liberarmos o formulário, para ajudarmos na organização do evento.
          </p>
        </div>
      </div>
    </section>
  );
}
