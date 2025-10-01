import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { push, pop, clear } from '../store/slices/stackSlice'

export default function StackPanel() {
  const items = useSelector((state) => state.stack.items)
  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  const top = items.length ? items[items.length - 1] : null

  const handlePush = () => {
    if (!input.trim()) return
    dispatch(push(input.trim()))
    setInput('')
  }

  const handlePop = () => {
    if (items.length === 0) return
    dispatch(pop())
  }

  const handleClear = () => dispatch(clear())

  // mostramos del tope hacia abajo (opcional)
  const view = [...items].reverse()

  return (
    <section className="card">
     

      <div className="status">
        <p><strong>Tamaño:</strong> {items.length}</p>
        <p><strong>Top </strong> {top ?? '—'}</p>
      </div>

      <div className="row">
        <input
          placeholder="valor a apilar"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handlePush}>Push</button>
        <button className="danger" onClick={handlePop} disabled={items.length === 0}>
          Pop
        </button>
        <button className="ghost" onClick={handleClear} disabled={items.length === 0}>
          Limpiar
        </button>
      </div>

      <h3>Pila (top → bottom)</h3>
      {view.length === 0 ? (
        <p>No hay elementos en la pila.</p>
      ) : (
        <ul className="list">
          {view.map((v, i) => (
            <li key={`${v}-${i}`}>
              {v}{i === 0 && <em> (top)</em>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
