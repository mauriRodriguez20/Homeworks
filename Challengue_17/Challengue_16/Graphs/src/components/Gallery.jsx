const mockShots = [
  {
    title: "Panel de datos",
    caption: "Formularios con badges y estados accesibles."
  },
  {
    title: "Grafo 3D",
    caption: "El componente GraphViz proyecta nodos conectados."
  },
  {
    title: "Listas filtrables",
    caption: "Consulta habitantes de cualquier ciudad."
  }
];

export default function Gallery() {
  return (
    <section className="card card--soft gallery">
      <div className="row row--between">
        <h2 className="card__title">Galer&iacute;a de interfaz</h2>
        <span className="badge badge--muted">UI tokens</span>
      </div>
      <div className="info-grid">
        {mockShots.map((shot) => (
          <figure key={shot.title} className="card card--soft">
            <figcaption>
              <strong>{shot.title}</strong>
              <p className="muted">{shot.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
