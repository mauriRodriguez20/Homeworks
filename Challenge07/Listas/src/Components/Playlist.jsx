import { useMemo, useState } from 'react'
import { LinkedList } from '../Estructuras/LinkedList'


const SONGS = [
  { id: 1, title: 'Villancico', artist: 'Pastor Lopéz' },
  { id: 2, title: 'Cancion 1', artist: 'Cantante' },
  { id: 3, title: 'Himno de la uao', artist: 'Ni idea tampoco' },
  { id: 4, title: 'Remix del himno de la uao', artist: 'Nadie' }
]

export default function LinkedPlaylist() {
  
  const list = useMemo(() => {
    const l = new LinkedList()
    SONGS.forEach(song => l.append(song))
    return l
  }, [])

  
  const [current, setCurrent] = useState(list.peek())

  const handleNext = () => {
    const _ = list.next()       
    setCurrent(list.peek())     
  }

  const handleReset = () => {
    list.reset()
    setCurrent(list.peek())
  }

  const queue = list.toArray()

  return (
    <section className="card">
      <h2>Linked List — Canciones</h2>

      <p><strong>Size:</strong> {list.size()}</p>

      <div className="now-playing">
        <strong>Sonando:</strong>{' '}
        {current ? `${current.title} — ${current.artist}` : 'Fin de la lista'}
      </div>

      <div className="row">
        <button onClick={handleNext} disabled={!current}>Siguiente ▶</button>
        <button onClick={handleReset}>Reiniciar ⟲</button>
      </div>

        <h3>Cola de reproducción:</h3>
      <ol className="list">
        {queue.map((s, i) => (
          <li key={s.id}>
            {s.title} — {s.artist}{' '}
            {current && s.id === current.id ? <em>(Actual)</em> : null}
          </li>
        ))}
      </ol>
    </section>
  )
}
