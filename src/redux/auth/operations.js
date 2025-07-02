import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const setAuthHeader = value => {
  axios.defaults.headers.common.Authorization = value;
};

export const register = createAsyncThunk('auth/register', async () => {});
