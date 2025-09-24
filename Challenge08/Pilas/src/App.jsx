import { useState } from 'react'
import BookForm from './components/BookForm.jsx'
import BookList from './components/BookList.jsx'


const MOCK = [
  { name: 'Los Hermanos Grim', isbn: '1234', author: 'Dayro Moreno', editorial: 'Once Caldas' },
  { name: 'La biblia', isbn: '000', author: 'Desconocido', editorial: "Ni idea" },
  { name: 'La Divina Comedia', isbn: '5678', author: 'Dante A.', editorial: 'POEMA' },
]


function peek(stack) {
  return stack.length ? stack[stack.length - 1] : null
}

export default function App() {
  
  const [stack, setStack] = useState(MOCK)

  const handleAddBook = (book) => {
    // push
    setStack(prev => [...prev, book])
  }

  const handlePop = () => {
    // pop
    setStack(prev => prev.slice(0, -1))
  }

  const top = peek(stack)
  const isEmpty = stack.length === 0
  const size = stack.length

  return (
    <div className="container">
      <h1>Challenge 08: Pilas</h1>
      <section className="status">
        <p><strong>Tamaño:</strong> {size}</p>
        <p>
          <strong>Último: </strong>{' '}
          {top ? `${top.name} — ${top.author}` : 'La pila está vacía'}
        </p>
      </section>

      <BookForm onAdd={handleAddBook} />

      <button disabled={isEmpty} onClick={handlePop} className="danger">
        QUITAR EL ULTIMO LIBRO (Pop)
      </button>

      
      <BookList items={[...stack].reverse()} />
    </div>
  )
}
