import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  register,
  logOut,
  refreshUser,
  addToFavorite,
  removeFromFavorites,
} from './operations';
import axios from 'axios';

const handlePending = state => {
  state.isRefreshing = true;
};
const handleReject = (state, { payload }) => {
  state.isRefreshing = false;
  state.error = payload;
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
      favorites: [],
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
        state.user = { name: null, email: null, error: false };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.error = false;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.favorites = action.payload.favorites;
        state.isRefreshing = false;
        state.isLoggedIn = true;
        axios.defaults.headers.common.Authorization = `Bearer ${state.token}`;
      })
      .addCase(refreshUser.rejected, handleReject)

      .addCase(addToFavorite.pending, handlePending)
      .addCase(addToFavorite.fulfilled, (state, action) => {
        state.error = false;
        if (!state.user.favorites) {
          state.user.favorites = [];
        }
        if (!state.user.favorites.includes(action.payload)) {
          state.user.favorites.push(action.payload);
        }
        state.isRefreshing = false;
      })
      .addCase(addToFavorite.rejected, handleReject)
      .addCase(removeFromFavorites.pending, handlePending)
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.error = false;
        state.isRefreshing = false;
        state.user.favorites = state.user.favorites.filter(
          id => id !== action.payload
        );
      })
      .addCase(removeFromFavorites.rejected, handleReject),
});

export default slice.reducer;
