import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./operations";

const slice = createSlice({
  name: "auth",
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
  extraReducers: (builder) =>
    builder
      // .addCase(register.pending, (state) => {
      //   state.isRefreshing = true;
      // })
      // .addCase(register.fulfilled, (state, action) => {
      //   state.user = action.payload.data;
      //   // state.token = action.payload.token;
      //   state.isLoggedIn = true;
      //   state.isRefreshing = false;
      // })
      // .addCase(register.rejected, (state, action) => {
      //   state.isRefreshing = false;
      //   state.error = action.payload || "Registration failed";
      // }),
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = { name: action.payload.data.name };
        state.token = action.payload.data.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null, error: false };
        state.token = null;
        state.isLoggedIn = false;
      }),
});

export default slice.reducer;
