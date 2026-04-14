export default function EventoPage() {
  return (
    <section className="card" style={{ marginTop: 18 }}>
      <h1 className="h1">O Evento</h1>
      <p className="p">
        Aqui ficam todos os detalhes (sem pesar a Home).
      </p>

      <div id="local" className="card" style={{ marginTop: 14 }}>
        <h2 className="h2">Local</h2>
        <p className="p">Foto do local + descrição.</p>
      </div>

      <div id="horario" className="card" style={{ marginTop: 14 }}>
        <h2 className="h2">Horário</h2>
        <p className="p">Início, cerimônia, festa…</p>
      </div>

      <div id="dresscode" className="card" style={{ marginTop: 14 }}>
        <h2 className="h2">Dress Code</h2>
        <p className="p">Vibe praia elegante (exemplos e dicas).</p>
      </div>

      <div id="hospedagens" className="card" style={{ marginTop: 14 }}>
        <h2 className="h2">Hospedagens Parceiras</h2>
        <p className="p">Lista + cupons (se tiver).</p>
      </div>

      <div id="mapa" className="card" style={{ marginTop: 14 }}>
        <h2 className="h2">Como chegar (Mapa)</h2>
        <p className="p">Embed do Google Maps só aqui.</p>
      </div>
    </section>
  );
}
