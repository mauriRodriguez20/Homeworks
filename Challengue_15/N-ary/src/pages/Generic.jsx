export default function Generic({ title, subtitle }) {
  return (
    <div className="page">
      <h2>{title}{subtitle ? ` · ${subtitle}` : ""}</h2>
      <p className="muted">Contenido de {title}{subtitle ? ` (${subtitle})` : ""}.</p>
    </div>
  );
}
