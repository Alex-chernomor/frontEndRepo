import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setAuthHeader = (value) => {
  axios.defaults.headers.common.Authorization = value;
};

// const setAuthHeader = value => {
//   axios.defaults.headers.common.Authorization = value;
// };

axios.defaults.baseURL = "https://backendrepo-ormv.onrender.com";

export const register = createAsyncThunk(
  "api/auth/register",
  async (credentions, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://backendrepo-ormv.onrender.com/api/auth/register",
        credentions
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
  async (credentions, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://backendrepo-ormv.onrender.com/api/auth/login",
        credentions
      );
      setAuthHeader(`Bearer ${response.data.token}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const logOut = createAsyncThunk("api/auth/logout", async () => {
//   await axios.post("https://backendrepo-ormv.onrender.com/api/auth/logout");
// });

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("https://backendrepo-ormv.onrender.com/api/auth/logout");
    localStorage.removeItem("token"); // якщо токен зберігається там
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
