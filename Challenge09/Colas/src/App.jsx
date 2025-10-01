import { useState } from 'react'
import PersonForm from './components/PersonForm.jsx'
import QueueList from './components/QueueList.jsx'
import LiveClock from './components/LiveClock.jsx'


const peek = (queue) => (queue.length ? queue[0] : null)
const fmt = (iso) => new Date(iso).toLocaleString()


const MOCK = [
  { id: 1, name: 'Profe',  amount: 200000, turn: 1, time: new Date().toISOString() },
  { id: 2, name: 'Paniagua', amount: 150000, turn: 2, time: new Date().toISOString() },
  { id: 3, name: 'Guañarita',amount:  80000, turn: 3, time: new Date().toISOString() },
]

export default function App() {
  
  const [queue, setQueue] = useState(MOCK)

  
  const initialTurn = queue.length ? Math.max(...queue.map(p => p.turn || 0)) + 1 : 1
  const [nextTurn, setNextTurn] = useState(initialTurn)

  // ENQUEUE: agrega persona, asigna turno y sella fecha/hora
  const enqueue = (person) => {
    const now = new Date().toISOString()
    setQueue(prev => [...prev, { ...person, turn: nextTurn, time: now }])
    setNextTurn(t => t + 1)
  }

  // DEQUEUE: atiende al primero
  const dequeue = () => {
    setQueue(prev => prev.slice(1))
  }

  const front = peek(queue)
  const isEmpty = queue.length === 0
  const nextId = queue.length ? Math.max(...queue.map(p => p.id || 0)) + 1 : 1

  return (
    <div className="container">
      <h1>Challenge 09: Colas</h1>
      <LiveClock />

      <section className="status">
        <p><strong>Tamaño Cola:</strong> {queue.length}</p>
        <p><strong>Turno Disponible:</strong> {nextTurn}</p>
        <p>
          <strong>Al Frente:</strong>{' '}
          {front ? `Turno #${front.turn} — ${front.name} — $${front.amount}` : 'La cola está vacía'}
        </p>
      </section>

      <PersonForm onAdd={enqueue} nextId={nextId} />

      <button className="danger" onClick={dequeue} disabled={isEmpty}>
        Dequeue - Atender en orden de llegada
      </button>

      <QueueList items={queue} fmt={fmt} />
    </div>
  )
}


