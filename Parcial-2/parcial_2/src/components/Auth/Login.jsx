import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../store/slices/thunks/authThunks';

export default function Login() {
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const dispatch = useDispatch();
  return (
    <div style={{ border:'1px solid #ddd', borderRadius:8, padding:16 }}>
      <h3>Login</h3>
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={()=>dispatch(startLogin({email,password}))}>Ingresar</button>
    </div>
  );
}
