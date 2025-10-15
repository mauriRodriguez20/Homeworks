import { useDispatch } from 'react-redux'
import { logoutFirebase } from '../features/auth/thunk'

export default function LogoutButton() {
  const dispatch = useDispatch()
  return (
    <button className="btn btn-outline" onClick={() => dispatch(logoutFirebase())}>
      Cerrar sesión
    </button>
  )
}
