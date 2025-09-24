import { useState } from 'react'
import PersonForm from './Components/PersonForm.jsx'
import QueueList from './Components/QueueList.jsx'


const MOCK = [
  { id: 1, name: 'Profe', amount: 200000 },
  { id: 2, name: 'Paniagua', amount: 150000 },
  { id: 3, name: 'Guañarita', amount: 80000 },
]


const peek = (queue) => (queue.length ? queue[0] : null)

export default function App() {
 
  const [queue, setQueue] = useState(MOCK)

  const enqueue = (person) => {
    setQueue(prev => [...prev, person])       
  }

  const dequeue = () => {
    setQueue(prev => prev.slice(1))
  }

  const front = peek(queue)
  const isEmpty = queue.length === 0

  return (
    <div className="container">
      <h1>Challenge 09: Colas</h1>

      <section className="status">
        <p><strong>Tamaño:</strong> {queue.length}</p>
        <p>
          <strong>Al Frente :</strong>{' '}
          {front ? `${front.name} — $${front.amount}` : 'La cola está vacía'}
        </p>
      </section>

      <PersonForm onAdd={enqueue} nextId={queue.length ? Math.max(...queue.map(p => p.id || 0)) + 1 : 1} />

      <button className="danger" onClick={dequeue} disabled={isEmpty}>
        Dequeue - Atender en orden de llegada
      </button>

      {/* Imprimir la cola de frente → fondo */}
      <QueueList items={queue} />
    </div>
  )
}
