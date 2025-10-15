import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
  status: 'idle',
  error: null,
}

const firebaseSlice = createSlice({
  name: 'realtime',
  initialState,
  reducers: {
    setStatus: (state, { payload }) => { state.status = payload },
    setError:  (state, { payload }) => { state.error = payload },
    setMessages: (state, { payload }) => { state.messages = payload },
    addLocalMessage: (state, { payload }) => { state.messages.push(payload) },
  }
})

export const { setStatus, setError, setMessages, addLocalMessage } = firebaseSlice.actions
export default firebaseSlice.reducer
