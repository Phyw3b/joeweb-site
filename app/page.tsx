import Link from "next/link";

export default function Page() {
  return (
    <div className="grid">
      <section className="card">
        <span className="badge">Site oficial</span>

        <h1 className="h1">
          Joe <span className="accent">&</span> Web
        </h1>

        <p className="p">
          Bem-vindo ao nosso site de casamento. Aqui você encontra as informações do evento,
          confirma presença e participa do nosso álbum interativo de histórias.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="/rsvp">
            Confirmar Presença
          </Link>

          <Link className="btn" href="/evento">
            Ver detalhes do evento
          </Link>

          <Link className="btn" href="/presentes">
            Presentes (Histórias)
          </Link>
        </div>
      </section>

      <aside className="card">
        <h2 className="h2">Em breve</h2>
        <p className="p">
          Este site será atualizado com fotos, horários, mapa e todos os detalhes do dia.
          Por enquanto, já deixamos a estrutura oficial no ar.
        </p>
        <p className="p">
          Salve este link — ele será o ponto único de informações do nosso casamento.
        </p>
      </aside>
    </div>
  );
}
