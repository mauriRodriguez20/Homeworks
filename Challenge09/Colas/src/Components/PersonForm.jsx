import { useState } from 'react'

export default function PersonForm({ onAdd, nextId }) {
  const [form, setForm] = useState({ name: '', amount: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleAdd = () => {
    if (!form.name || !form.amount) return
    const person = { id: nextId, name: form.name, amount: Number(form.amount) }
    onAdd(person) // ENQUEUE
    setForm({ name: '', amount: '' })
  }

  return (
    <section className="card">
      <h2>Nueva persona</h2>
      <div className="grid">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Monto a retirar"
        />
      </div>
      <button type="button" onClick={handleAdd}>Agregar a la Cola</button>
    </section>
  )
}
