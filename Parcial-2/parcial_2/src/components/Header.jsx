import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../store/slices/thunks/authThunks';

export default function Header() {
  const count = useSelector(s => s.notifications._stack.size()); 
  const { status, email } = useSelector(s => s.auth);
  const dispatch = useDispatch();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
      <h1>UAO Social / Parcial 2</h1>
      <div>
        <span style={{ marginRight: 12 }}>Notifications {count}</span>
        {status === 'authenticated' && (
          <>
            <span style={{ marginRight: 12 }}>{email}</span>
            <button onClick={() => dispatch(startLogout())}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}
