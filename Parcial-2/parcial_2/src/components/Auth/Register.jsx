import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startRegister } from '../../store/slices/thunks/authThunks';

export default function Register() {
  const [displayName,setDisplayName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const dispatch = useDispatch();
  return (
    <div style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
      <h3>Register</h3>
      <input placeholder="name" value={displayName} onChange={e=>setDisplayName(e.target.value)} />
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={()=>dispatch(startRegister({displayName,email,password}))}>Crear cuenta</button>
    </div>
  );
}
