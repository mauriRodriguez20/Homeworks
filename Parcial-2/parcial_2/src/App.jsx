import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthState } from './store/slices/thunks/authThunks';
import { loadGlobalState } from './store/slices/thunks/persistThunks';
import Header from './components/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PostForm from './components/Posts/PostForm';
import PostsList from './components/Posts/PostsList';
import NotificationsPane from './components/Notifications/NotificationsPane';
import DMQueuePane from './components/DirecMessages/DMQueuePane';



export default function App() {
  const dispatch = useDispatch();
  const { status } = useSelector(s => s.auth);

  useEffect(() => { dispatch(checkAuthState()); }, [dispatch]);
  const uid = useSelector(s => s.auth.uid);

  useEffect(() => { if (uid) dispatch(loadGlobalState()); }, [dispatch, uid]);

  if (status === 'checking') return <p>Cargando...</p>;

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: 16 }}>
      <Header />
      {status !== 'authenticated'
        ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Login />
            <Register />
          </div>
        )
        : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <section>
              <h2>Posts (Lista)</h2>
              <PostForm />
              <PostsList />
            </section>
            <section>
              <h2>Centro</h2>
              <NotificationsPane />
              <DMQueuePane />
            </section>
          </div>
        )}
    </div>
  );
}

