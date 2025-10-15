import { createSlice } from '@reduxjs/toolkit';
import { Stack } from '../../structures/Stack';

const initialState = { stackArray: [], _stack: new Stack() };
const rebuild = (state) => { state._stack = new Stack(); state.stackArray.forEach(n => state._stack.push(n)); };

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    loadNotifications: (state, { payload }) => { state.stackArray = payload ?? []; rebuild(state); },
    pushNotification: (state, { payload }) => { state._stack.push(payload); state.stackArray = state._stack.print().reverse(); },
    popNotification: (state) => { state._stack.pop(); state.stackArray = state._stack.print().reverse(); },
    clearNotifications: (state) => { state.stackArray = []; rebuild(state); },
  },
});

export const { loadNotifications, pushNotification, popNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
