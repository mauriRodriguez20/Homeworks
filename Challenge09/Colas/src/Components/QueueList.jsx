export default function QueueList({ items }) {
  if (!items.length) return <p>No hay personas en la cola.</p>

  return (
    <section className="card">
      <h2>Cola del cajero</h2>
      <ol className="list">
        {items.map((p, i) => (
          <li key={p.id ?? `${p.name}-${i}`}>
            <strong>{p.name}</strong> — ${p.amount}{' '}
            {i === 0 && <em>(Primero)</em>}
          </li>
        ))}
      </ol>
    </section>
  )
}
