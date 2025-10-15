import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enqueueDM, dequeueDM } from '../../store/slices/dmQueueSlice';
import { saveGlobalState } from '../../store/slices/thunks/persistThunks';

export default function DMQueuePane(){
  const [name,setName]=useState(''); const [msg,setMsg]=useState('');
  const queue = useSelector(s => s.dmQueue._queue.print());
  const first = useSelector(s => s.dmQueue._queue.peek());
  const dispatch = useDispatch();

  const add = ()=>{
    if(!name.trim()||!msg.trim()) return;
    dispatch(enqueueDM({ id:Date.now(), name, msg }));
    dispatch(saveGlobalState());
    setName(''); setMsg('');
  };
  const sendFirst = ()=>{
    dispatch(dequeueDM());
    dispatch(saveGlobalState());
  };

  return (
    <div style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
      <h3>Mensajes Directos (Cola)</h3>
      <div style={{ display:'flex', gap:8, marginBottom:8 }}>
        <input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Mensaje" value={msg} onChange={e=>setMsg(e.target.value)} />
        <button onClick={add}>Encolar</button>
        <button onClick={sendFirst} disabled={!first}>Enviar primero (dequeue)</button>
      </div>
      <p>Primero en cola: {first ? `${first.name} - ${first.msg}` : '—'}</p>
      <ul>
        {queue.map(q=> <li key={q.id}>{q.name}: {q.msg}</li>)}
      </ul>
    </div>
  );
}
