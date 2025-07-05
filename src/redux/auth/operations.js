import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const setAuthHeader = value => {
//   axios.defaults.headers.common.Authorization = value;
// };

axios.defaults.baseURL = 'https://backendrepo-ormv.onrender.com';

export const register = createAsyncThunk(
  'auth/register',
  async (userCredentials, thunkAPI) => {
    try {
      // const response = await axios.post('/api/auth/register', userCredentials);
      const response = await axios.post('/auth/register', userCredentials);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
