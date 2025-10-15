import { useSelector, useDispatch } from 'react-redux';
import { removePostAt } from '../../store/slices/postsSlice';
import { saveGlobalState } from '../../store/slices/thunks/persistThunks';

export default function PostsList(){
  const posts = useSelector(s => s.posts._list.print()); // recorrer lista
  const dispatch = useDispatch();

  return (
    <ul style={{ listStyle:'none', padding:0 }}>
      {posts.map((p,idx)=>(
        <li key={p.id} style={{ border:'1px solid #eee', borderRadius:8, padding:8, marginBottom:6 }}>
          <p>{p.text}</p>
          <button onClick={()=>{ dispatch(removePostAt(idx)); dispatch(saveGlobalState()); }}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
