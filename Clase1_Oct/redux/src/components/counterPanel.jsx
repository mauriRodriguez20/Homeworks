import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementBy } from '../store/slices/counterSlice'

export default function CounterPanel() {
  const value = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  const handleIncrementBy = () => {
    const raw = prompt('¿Cuánto quieres incrementar?')
    if (raw === null) return
    const val = Number(raw)
    if (!Number.isNaN(val)) {
      dispatch(incrementBy(val))
    } else {
      alert('Debes ingresar un número válido.')
    }
  }

  return (
    <section className="card">
      <h2>Counter </h2>
      <p className="big">Valor: <strong>{value}</strong></p>

      <div className="row">
        <button onClick={() => dispatch(decrement())}>Decrementar</button>
        <button onClick={() => dispatch(increment())}>Incrementar</button>
        <button onClick={handleIncrementBy}>Incrementar por (Usuario)</button>
      </div>
    </section>
  )
}
