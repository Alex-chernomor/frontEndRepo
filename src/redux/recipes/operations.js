import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addToFavorite = createAsyncThunk(
  'recipes/createResipe',
  async ({ userId, recipeId }, thunkAPI) => {
    try {
      const resp = await axios.post(
        `/api/users/${userId}/favorites/${recipeId}`
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const removeFromFavorite = createAsyncThunk(
  'recipes/removeFromFavorite',
  async ({ userId, recipeId }, thunkAPI) => {
    try {
      const resp = await axios.delete(
        `/api/users/${userId}/favorites/${recipeId}`
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
