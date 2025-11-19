export default function DesignHero() {
  return (
    <header className="card card--soft page-heading">
      <p className="badge badge--warning">Visualizador interactivo</p>
      <h1>Visualizer UI para grafos urbanos</h1>
      <p className="muted">
        Gestiona personas, ciudades y conexiones en una sola interfaz.
      </p>
      <div className="info-grid">
        <div>
          <span className="badge badge--success">Tiempo real</span>
          <p className="muted">El grafo se actualiza con cada inserci&oacute;n.</p>
        </div>
        <div>
          <span className="badge badge--info">Anal&iacute;ticas</span>
          <p className="muted">Mostramos nodos y aristas calculados.</p>
        </div>
      </div>
    </header>
  );
}
