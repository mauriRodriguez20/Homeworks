import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../store/slices/postsSlice';
import { pushNotification } from '../../store/slices/notificationsSlice.js';
import { saveGlobalState } from '../../store/slices/thunks/persistThunks';

export default function PostForm(){
  const [text,setText]=useState('');
  const dispatch=useDispatch();
  const handleAdd=()=>{
    if(!text.trim()) return;
    const post = { id: Date.now(), text };
    dispatch(addPost(post));
    dispatch(pushNotification({ type:'post', message: 'Nuevo post publicado' }));
    dispatch(saveGlobalState());
    setText('');
  };
  return (
    <div style={{ marginBottom: 8 }}>
      <input placeholder="Escribe un post..." value={text} onChange={e=>setText(e.target.value)} />
      <button onClick={handleAdd}>Publicar</button>
    </div>
  );
}
