import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, subscribeMessages } from './thunk'

export default function ChatRTDB() {
  const dispatch = useDispatch()
  const { user } = useSelector((s) => s.auth)
  const { messages, status, error } = useSelector((s) => s.realtime)

  const [text, setText] = useState('')

  useEffect(() => { dispatch(subscribeMessages()) }, [dispatch])

  const onSend = () => {
    if (!text.trim()) return
    const payload = {
      uid: user?.uid ?? 'anon',
      displayName: user?.displayName ?? 'Anónimo',
      text,
      createdAt: Date.now(),
    }
    dispatch(sendMessage(payload))
    setText('')
  }

  return (
    <div className="card">
      <h2 className="title">Chat (RealTime DB)</h2>

      <div className="chat-window">
        {messages.map(m => (
          <div key={m.id ?? m.createdAt} className="bubble">
            <div className="bubble-header">
              <strong>{m.displayName}</strong> <span className="time">{new Date(m.createdAt).toLocaleString()}</span>
            </div>
            <div>{m.text}</div>
          </div>
        ))}
        {status==='loading' && <p>Cargando…</p>}
        {error && <p className="alert error">{error}</p>}
      </div>

      <div className="chat-input">
        <input className="input" placeholder="Escribe un mensaje…" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="btn btn-primary" onClick={onSend}>Enviar</button>
      </div>
    </div>
  )
}
