import { createSlice } from '@reduxjs/toolkit';

const initialState = { status: 'idle', uid: null, email: null, displayName: null, error: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkingCredentials: (state) => { state.status = 'checking'; state.error = null; },
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName ?? null;
      state.error = null;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.uid = null; state.email = null; state.displayName = null;
      state.error = payload ?? null;
    },
  },
});

export const { checkingCredentials, login, logout } = authSlice.actions;
export default authSlice.reducer;
