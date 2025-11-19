export default function FeatureCard({ title, icon, description }) {
  return (
    <article className="card card--soft feature-card">
      <div className="row row--between">
        <span className="badge badge--ghost">{icon}</span>
        <strong>{title}</strong>
      </div>
      <p className="muted">{description}</p>
    </article>
  );
}
