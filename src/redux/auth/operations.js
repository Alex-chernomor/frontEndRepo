import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const setAuthHeader = (value) => {
//   axios.defaults.headers.common.Authorization = value;
// };

// const setAuthHeader = value => {
//   axios.defaults.headers.common.Authorization = value;
// };

// axios.defaults.baseURL = 'https://backendrepo-ormv.onrender.com';

export const register = createAsyncThunk(
  "api/auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://backendrepo-ormv.onrender.com/api/auth/register",
        credentials
      );
      setAuthHeader(`Bearer ${response.data.token}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "api/auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://backendrepo-ormv.onrender.com/api/auth/login",
        credentials
      );
      const { accessToken, name } = response.data.data;
      return {
        user: { name },
        token: accessToken,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("api/auth/logout", async () => {
  await axios.post("https://backendrepo-ormv.onrender.com/api/auth/logout");
});
