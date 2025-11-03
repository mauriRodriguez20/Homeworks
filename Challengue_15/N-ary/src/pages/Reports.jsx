export default function Reports({ variant }){
  return (
    <div className="page">
      <h2>Reportes {variant ? `· ${variant}` : ""}</h2>
      <p className="muted">Módulo de reportes.</p>
    </div>
  );
}
