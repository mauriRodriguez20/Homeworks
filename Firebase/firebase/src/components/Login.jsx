import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithEmailPassword, loginWithGoogle } from '../features/auth/thunk'

export default function Login() {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector((s) => s.auth)
  const [form, setForm] = useState({ email: '', password: '' })
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginWithEmailPassword(form))
  }

  return (
    <div className="card">
      <h2 className="title">Iniciar sesión</h2>
      <form className="stack" onSubmit={onSubmit}>
        <input className="input" name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input className="input" name="password" type="password" placeholder="Contraseña" value={form.password} onChange={onChange} required />
        <button className="btn btn-primary" disabled={status==='checking'}>Entrar</button>
      </form>
      <button className="btn btn-outline" onClick={() => dispatch(loginWithGoogle())} disabled={status==='checking'}>
        Entrar con Google
      </button>
      {errorMessage && <p className="alert error">{errorMessage}</p>}
    </div>
  )
}
