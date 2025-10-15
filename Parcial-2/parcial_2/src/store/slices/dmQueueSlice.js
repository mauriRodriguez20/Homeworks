import { createSlice } from '@reduxjs/toolkit';
import { Queue } from '../../structures/Queue';

const initialState = { queueArray: [], _queue: new Queue() };

const rebuild = (state) => {
  state._queue = new Queue();
  state.queueArray.forEach(m => state._queue.enqueue(m));
};

const dmQueueSlice = createSlice({
  name: 'dmQueue',
  initialState,
  reducers: {
    loadQueue: (state, { payload }) => { state.queueArray = payload ?? []; rebuild(state); },
    enqueueDM: (state, { payload }) => {
      state._queue.enqueue(payload);
      state.queueArray = state._queue.print();
    },
    dequeueDM: (state) => {
      state._queue.dequeue();
      state.queueArray = state._queue.print();
    },
    clearQueue: (state) => { state.queueArray = []; rebuild(state); },
  },
});

export const { loadQueue, enqueueDM, dequeueDM, clearQueue } = dmQueueSlice.actions;
export default dmQueueSlice.reducer;
