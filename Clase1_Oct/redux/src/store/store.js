import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import stackReducer from './slices/stackSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    stack: stackReducer,
  },
})
