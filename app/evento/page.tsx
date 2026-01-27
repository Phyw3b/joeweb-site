export default function Page() {
  return (
    <section className="card">
      <span className="badge">O Evento</span>

      <h1 className="h1">Informações do casamento</h1>

      <p className="p">
        Nesta página você vai encontrar data, horários, localização, mapa e dress code.
      </p>

      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <div className="card" style={{ padding: 14 }}>
          <h2 className="h2">Cerimônia</h2>
          <p className="p">Em breve: horário e local.</p>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <h2 className="h2">Festa</h2>
          <p className="p">Em breve: horário e local.</p>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <h2 className="h2">Dress code</h2>
          <p className="p">Em breve: sugestão de traje para casamento chique na praia.</p>
        </div>
      </div>
    </section>
  );
}
