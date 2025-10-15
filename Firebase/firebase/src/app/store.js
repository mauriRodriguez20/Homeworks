import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import realtimeReducer from '../features/realtime/firebaseSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    realtime: realtimeReducer,
  },
})
