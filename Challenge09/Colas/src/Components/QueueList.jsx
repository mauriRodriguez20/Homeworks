export default function QueueList({ items, fmt }) {
  if (!items.length) return <p>No hay personas en la cola.</p>

  return (
    <section className="card">
      <h2>Cola del cajero</h2>
      <ol className="list">
        {items.map((p, i) => (
          <li key={p.id ?? `${p.name}-${i}`}>
            <strong>Turno #{p.turn}</strong> — {p.name} — ${p.amount}
            {p.time && <> — tomado: {fmt(p.time)}</>}
            {i === 0 && <em> (front)</em>}
          </li>
        ))}
      </ol>
    </section>
  )
}
