import { Link, Routes, Route, Navigate } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import LogoutButton from './components/LogoutButton'
import Crud from './features/firestore/crud'
import ChatRTDB from './features/realtime/ChatRTDB'
import PrivateRoute from './routes/PrivateRoute'
import './App.css'

function Home() {
  return (
    <div className="card">
      <h1 className="title">Dashboard</h1>
      <div className="stack row">
        <Link className="btn btn-primary" to="/crud">Firestore CRUD</Link>
        <Link className="btn btn-primary" to="/chat">Chat RTDB</Link>
        <LogoutButton />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <nav className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Registro</Link>
      </nav>

      <Routes>
        <Route path="/" element={
          <PrivateRoute><Home /></PrivateRoute>
        }/>
        <Route path="/crud" element={
          <PrivateRoute><Crud /></PrivateRoute>
        }/>
        <Route path="/chat" element={
          <PrivateRoute><ChatRTDB /></PrivateRoute>
        }/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}
