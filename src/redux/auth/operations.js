import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const setAuthHeader = value => {
  axios.defaults.headers.common.Authorization = value;
};

axios.defaults.baseURL = 'https://backendrepo-ormv.onrender.com';

export const register = createAsyncThunk(
  'auth/register',
  async (userCredentials, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/register', userCredentials);
      setAuthHeader(`Bearer ${response.data.data.token}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      setAuthHeader(`Bearer ${response.data.data.token}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/api/auth/logout');
    localStorage.removeItem('token'); // якщо токен зберігається там
    setAuthHeader('');
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
