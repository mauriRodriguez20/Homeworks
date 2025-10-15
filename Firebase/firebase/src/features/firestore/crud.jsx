import { useState } from 'react'
import { useCollection } from './useCollection'

export default function Crud() {
  const { docs, loading, error, add, update, remove } = useCollection('items')
  const [form, setForm] = useState({ title: '', amount: 0 })
  const [editing, setEditing] = useState(null) // id o null

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = async (e) => {
    e.preventDefault()
    if (editing) {
      await update(editing, { title: form.title, amount: Number(form.amount) })
      setEditing(null)
    } else {
      await add({ title: form.title, amount: Number(form.amount) })
    }
    setForm({ title: '', amount: 0 })
  }

  const onEdit = (row) => { setEditing(row.id); setForm({ title: row.title, amount: row.amount }) }

  return (
    <div className="card">
      <h2 className="title">Firestore CRUD</h2>
      <form className="stack" onSubmit={onSubmit}>
        <input className="input" name="title" placeholder="Título" value={form.title} onChange={onChange} required />
        <input className="input" name="amount" type="number" placeholder="Monto" value={form.amount} onChange={onChange} required />
        <button className="btn btn-primary">{editing ? 'Actualizar' : 'Agregar'}</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p className="alert error">{error}</p>}

      <table className="table">
        <thead><tr><th>Título</th><th>Monto</th><th>Acciones</th></tr></thead>
        <tbody>
          {docs.map(row => (
            <tr key={row.id}>
              <td>{row.title}</td>
              <td>{row.amount}</td>
              <td className="stack row">
                <button className="btn" onClick={() => onEdit(row)}>Editar</button>
                <button className="btn danger" onClick={() => remove(row.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
