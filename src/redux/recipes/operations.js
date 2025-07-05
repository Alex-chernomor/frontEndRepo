import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToFavorite = createAsyncThunk(
  "recipes/addToFavorite",
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

export const createResipe = createAsyncThunk(
  "recipes/createResipe",
  async ({ recipe }, thunkAPI) => {
    try {
      const resp = await axios.post(`/api/users/recipes`, recipe);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const removeFromFavorite = createAsyncThunk(
  "recipes/removeFromFavorite",
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
