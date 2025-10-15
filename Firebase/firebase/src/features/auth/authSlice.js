import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'not-authenticated', // idle|checking|authenticated|not-authenticated
  user: null,
  errorMessage: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkingCredentials: (state) => { state.status = 'checking'; state.errorMessage = null },
    loginSuccess: (state, { payload }) => {
      state.status = 'authenticated'
      state.user = payload // {uid, email, displayName, photoURL}
      state.errorMessage = null
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated'
      state.user = null
      state.errorMessage = payload ?? null
    },
    clearError: (state) => { state.errorMessage = null },
  },
})

export const { checkingCredentials, loginSuccess, logout, clearError } = authSlice.actions
export default authSlice.reducer
