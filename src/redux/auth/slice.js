import { createSlice } from '@reduxjs/toolkit';
import { register } from './operations';

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    // isRefreshing: false,
  },
  //   extraReducers: builder => builder.addCase(register),
});

export default slice.reducer;
