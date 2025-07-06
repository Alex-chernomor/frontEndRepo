import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const setAuthHeader = (value) => {
  axios.defaults.headers.common.Authorization = value;
};

axios.defaults.baseURL = "https://backendrepo-ormv.onrender.com/api";
// axios.defaults.baseURL = "/api";

// const setAuthHeader = (value) => {
//   axios.defaults.headers.common.Authorization = value;
// };

// const setAuthHeader = value => {
//   axios.defaults.headers.common.Authorization = value;
// };

// axios.defaults.baseURL = 'https://backendrepo-ormv.onrender.com';


// REGISTER
export const register = createAsyncThunk(

  "auth/register",
  async (userCredentials, thunkAPI) => {
    try {
      // const response = await axios.post("/api/auth/register", userCredentials);
      const response = await axios.post("/auth/register", userCredentials);
//   "api/auth/register",
//   async (credentials, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "https://backendrepo-ormv.onrender.com/api/auth/register",
//         credentials
//       );
//       setAuthHeader(`Bearer ${response.data.token}`);

      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", credentials);

      setAuthHeader(`Bearer ${response.data.data.accessToken}`);
      toast.success("Logged in successfully!");
      console.log(response.data);
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

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.post("/auth/logout");
  setAuthHeader("");
});
