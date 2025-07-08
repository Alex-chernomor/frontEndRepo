import { createSlice } from '@reduxjs/toolkit';
import { login, register, logOut, refreshUser } from './operations';

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
    // token: localStorage.getItem('token') || null,
    error: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder =>
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.error = false;
        state.user.name = action.payload.data.user.name;
        state.user.email = action.payload.data.user.email;
        state.token = action.payload.data.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(register.rejected, handleReject)
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.error = false;
        state.user.name = action.payload.data.user.name;
        state.user.email = action.payload.data.user.email;
        state.token = action.payload.data.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(login.rejected, handleReject)
      .addCase(logOut.fulfilled, state => {
        state.error = false;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.error = false;
        state.user.name = action.payload.data.user.name;
        state.user.email = action.payload.data.user.email;
        state.isRefreshing = false;
        state.isLoggedIn = true;
        // axios.defaults.headers.common.Authorization = `Bearer ${state.token}`;
      })
      .addCase(refreshUser.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
        state.error = payload || 'Refresh failed';
      }),
});

export default slice.reducer;
