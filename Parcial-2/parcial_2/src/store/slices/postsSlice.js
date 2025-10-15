import { createSlice } from '@reduxjs/toolkit';
import { LinkedList } from '../../structures/LinkedList';

const initialState = {
  listArray: [],     
  _list: new LinkedList(), 
};

const rebuild = (state) => {
  state._list = new LinkedList();
  state.listArray.forEach(p => state._list.append(p));
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    loadPosts: (state, { payload }) => { // payload: array de posts
      state.listArray = payload ?? [];
      rebuild(state);
    },
    addPost: (state, { payload }) => {
      state.listArray.push(payload);
      state._list.append(payload);
    },
    removePostAt: (state, { payload }) => { // payload = index
      state._list.remove(payload);
      state.listArray = state._list.print();
    },
    clearPosts: (state) => {
      state.listArray = [];
      rebuild(state);
    },
  },
});

export const { loadPosts, addPost, removePostAt, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
