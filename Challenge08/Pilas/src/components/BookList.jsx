export default function BookList({ items }) {
  if (!items.length) return <p>No hay libros en la pila.</p>

  return (
    <section className="card">
      <h2>Pila de libros</h2>
      <ul className="list">
        {items.map((b, idx) => (
          <li key={b.isbn || `${b.name}-${idx}`}>
            <strong>{b.name}</strong> — {b.author} — ISBN: {b.isbn} — {b.editorial}
            {idx === 0 && <em> (tope)</em>}
          </li>
        ))}
      </ul>
    </section>
  )
}
