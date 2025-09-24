import { useState } from 'react'
import LinkedPlaylist from './Components/Playlist'
import BrowserHistory from './Components/Historial'
import './index.css'

export default function App() {
  const [page, setPage] = useState('playlist') 

  return (
    <div className="container">
      <h1>Challenge 07: Listas</h1>

      <nav className="tabs">
        <button
          className={page === 'playlist' ? 'active' : ''}
          onClick={() => setPage('playlist')}
        >
          Linked List (Canciones)
        </button>
        <button
          className={page === 'history' ? 'active' : ''}
          onClick={() => setPage('history')}
        >
          Doubly Linked (Historial)
        </button>
      </nav>

      {page === 'playlist' ? <LinkedPlaylist /> : <BrowserHistory />}
    </div>
  )
}
