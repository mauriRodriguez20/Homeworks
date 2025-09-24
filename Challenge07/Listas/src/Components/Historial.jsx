import { useMemo, useState } from 'react'
import { DoublyLinkedList } from '../Estructuras/DoubleLinkedList'


const PAGES = [
  { url: 'Stake', title: 'Stake' },
  { url: 'BetPlay', title: 'BetPlay' },
  { url: 'Docs', title: 'Docs' },
  { url: 'UAO', title: 'UAO' }
]

export default function BrowserHistory() {
  const history = useMemo(() => {
    const h = new DoublyLinkedList()
    PAGES.forEach(p => h.visit(p))
    return h
  }, [])

  const [current, setCurrent] = useState(history.peek())
  const [input, setInput] = useState('')

  const goBack = () => {
    history.back()
    setCurrent(history.peek())
  }

  const goForward = () => {
    history.forward()
    setCurrent(history.peek())
  }

  const visit = () => {
    if (!input.trim()) return
    history.visit({ url: input.trim(), title: input.trim() })
    setCurrent(history.peek())
    setInput('')
  }

  const items = history.toArray()
  const idx = items.findIndex(x => current && x.url === current.url)

  return (
    <section className="card">
      <h2>Doubly Linked List — Historial</h2>

      <p><strong>Tamaño:</strong> {history.size()}</p>

      <div className="now-playing">
        <strong>Pagina Actual:</strong>{' '}
        {current ? `${current.title} (${current.url})` : 'No page'}
      </div>

      <div className="row">
        <button onClick={goBack} disabled={!current || idx <= 0}>◀ Atras</button>
        <button onClick={goForward} disabled={!current || idx === items.length - 1}>Adelante ▶</button>
      </div>

      <div className="row">
        <input
          placeholder="Visitar nueva url"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={visit}>Visitar</button>
      </div>

      <h3>Historial </h3>
      <ul className="list">
        {items.map((p, i) => (
          <li key={p.url}>
            {p.title} — {p.url}
            {i === idx ? <em> (actual)</em> : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
