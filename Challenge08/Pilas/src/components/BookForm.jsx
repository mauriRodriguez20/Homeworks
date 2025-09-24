import { useState } from 'react'

export default function BookForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    isbn: '',
    author: '',
    editorial: '',
  })

  const handleChange = (evt) => {
    const { name, value } = evt.target
    
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleAdd = () => {
    if (!form.name || !form.isbn || !form.author || !form.editorial) return
    onAdd(form) 
    setForm({ name: '', isbn: '', author: '', editorial: '' }) 
  }

  return (
    <section className="card">
      <h2>Nuevo libro</h2>
      <div className="grid">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="ISBN"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Autor"
        />
        <input
          name="editorial"
          value={form.editorial}
          onChange={handleChange}
          placeholder="Editorial"
        />
      </div>
      <button type="button" onClick={handleAdd}>
        AGREGAR (Push)
      </button>
    </section>
  )
}
