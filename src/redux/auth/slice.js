import { createSlice } from '@reduxjs/toolkit';
import { login, register, logOut } from './operations';

const handlePending = state => {
  state.isRefreshing = true;
};
const handleReject = (state, { payload }) => {
  state.isRefreshing = false;
  state.error = payload || 'Registration failed';
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    error: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder =>
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.user.name = action.payload.data.user.name;
        state.user.email = action.payload.data.user.email;
        state.token = action.payload.data.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(register.rejected, handleReject)
      .addCase(login.pending, state => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user.name = action.payload.data.user.name;
        state.user.email = action.payload.data.user.email;
        state.token = action.payload.data.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null, error: false };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      }),
});

export default slice.reducer;
