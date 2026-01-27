export default function Page() {
  return (
    <section className="card">
      <span className="badge">Contato</span>

      <h1 className="h1">Fale com a gente</h1>

      <p className="p">
        Dúvidas, recados ou algo importante? Em breve deixaremos aqui os canais oficiais.
      </p>

      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <div className="card" style={{ padding: 14 }}>
          <h2 className="h2">WhatsApp</h2>
          <p className="p">Em breve.</p>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <h2 className="h2">E-mail</h2>
          <p className="p">Em breve.</p>
        </div>
      </div>
    </section>
  );
}
