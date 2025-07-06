import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const setAuthHeader = (value) => {
  axios.defaults.headers.common.Authorization = value;
};

axios.defaults.baseURL = "https://backendrepo-ormv.onrender.com";

export const register = createAsyncThunk(
  "auth/register",
  async (userCredentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/register", userCredentials);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      const token = response.data.data.accessToken;
      setAuthHeader(`Bearer ${token}`);
      localStorage.setItem("token", token);
      return response.data;

      // export const logIn = createAsyncThunk(
      //   "api/auth/login",
      //   async (credentials, thunkAPI) => {
      //     try {
      //       const response = await axios.post(
      //         "https://backendrepo-ormv.onrender.com/api/auth/login",
      //         credentials
      //       );
      //       const { accessToken, name } = response.data.data;
      //       return {
      //         user: { name },
      //         token: accessToken,
      //       };
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    localStorage.removeItem("token"); // якщо токен зберігається там
    setAuthHeader("");
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const persistedToken = localStorage.getItem("token");

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(`Bearer ${persistedToken}`);
      const response = await axios.get("/api/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
