import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerWithEmailPassword } from '../features/auth/thunk'

export default function Register() {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector((s) => s.auth)

  const [form, setForm] = useState({ displayName: '', email: '', password: '' })
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(registerWithEmailPassword(form))
  }

  return (
    <div className="card">
      <h2 className="title">Crear cuenta</h2>
      <form className="stack" onSubmit={onSubmit}>
        <input className="input" name="displayName" placeholder="Nombre" value={form.displayName} onChange={onChange} required />
        <input className="input" name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input className="input" name="password" type="password" placeholder="Contraseña" value={form.password} onChange={onChange} required />
        <button className="btn btn-primary" disabled={status==='checking'}>Registrarme</button>
      </form>
      {errorMessage && <p className="alert error">{errorMessage}</p>}
    </div>
  )
}
