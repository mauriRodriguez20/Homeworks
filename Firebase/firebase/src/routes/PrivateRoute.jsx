import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const { status } = useSelector((s) => s.auth)
  return status === 'authenticated' ? children : <Navigate to="/login" replace />
}
