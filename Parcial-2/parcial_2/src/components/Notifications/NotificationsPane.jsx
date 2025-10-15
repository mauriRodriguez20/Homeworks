import { useSelector, useDispatch } from "react-redux";
import { popNotification } from "../../store/slices/notificationsSlice.js";
import { saveGlobalState } from "../../store/slices/thunks/persistThunks";

export default function NotificationsPane(){
  const stackTop = useSelector(s => s.notifications._stack.peek());
  const stackVisual = useSelector(s => s.notifications._stack.print()); // más recientes primero
  const dispatch = useDispatch();

  return (
    <div style={{ border:'1px solid #ddd', borderRadius:8, padding:16, marginBottom:16 }}>
      <h3>Notificaciones (Pila)</h3>
      <p>Tope: {stackTop ? stackTop.message : '—'}</p>
      <button onClick={()=>{ dispatch(popNotification()); dispatch(saveGlobalState()); }}>
        Quitar notificación más reciente (pop)
      </button>
      <ul>
        {stackVisual.map((n,i)=> <li key={i}>{n.message}</li>)}
      </ul>
    </div>
  );
}
