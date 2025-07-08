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

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(`Bearer ${reduxState.auth.token}`);
      const response = await axios.get('/api/users/current');
      const user = response.data.data.user;
      const favoriteIds = user?.favorites?.map(recipe => recipe._id);
      return {
        name: user.name,
        email: user.email,
        favorites: favoriteIds,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to refresh user';
      return thunkAPI.rejectWithValue(message);
    }
  },
  {
    condition: (_, thunkAPI) => thunkAPI.getState().auth.token !== null,
  }
);

export const addToFavorite = createAsyncThunk(
  'auth/addToFavorite',
  async (recipeId, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(`Bearer ${reduxState.auth.token}`);
      await axios.post(`/api/users/favorites/${recipeId}`);
      return recipeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to add favorite'
      );
    }
  }
);
export const removeFromFavorites = createAsyncThunk(
  'auth/removeFromFavorites',
  async (recipeId, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(`Bearer ${reduxState.auth.token}`);
      await axios.delete(`/api/users/favorites/${recipeId}`);
      return recipeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete from favorite'
      );
    }
  }
);
