import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createRecipe = createAsyncThunk(
  'recipes/createRecipe',
  async ({ recipe }, thunkAPI) => {
    try {
      const resp = await axios.post(`/api/recipes`, recipe);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
// хай поки буде аби не злама SearchBox
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (
    {
      page = 1,
      perPage = 12,
      category = '',
      ingredientId = '',
      query = '',
    } = {},
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        `https://backendrepo-ormv.onrender.com/api/recipes?page=${page}&perPage=${perPage}&category=${category}&ingredientId=${ingredientId}&query=${query}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.message || 'Unknown error'
      );
    }
  }
);

export const fetchRecipesByName = createAsyncThunk(
  'recipes/fetchRecipesByName',
  async (
    {
      page = 1,
      perPage = 12,
      category = '',
      ingredientId = '',
      query = '',
    } = {},
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        `/api/recipes?page=${page}&perPage=${perPage}&category=${category}&ingredientId=${ingredientId}&query=${query}`
      );
      const favorites = thunkAPI.getState().auth.user?.favorites || [];
      return { ...response.data, favorites };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.message || 'Unknown error'
      );
    }
  }
);

export const fetchOwnRecipes = createAsyncThunk(
  'recipes/fetchOwnRecipes',
  async ({ page = 1, perPage = 12 }, thunkAPI) => {
    try {
      const response = await axios.get('/api/users/own', {
        params: { page, perPage },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFavoriteRecipes = createAsyncThunk(
  'recipes/getFavoritesRecipes',
  async ({ page = 1, perPage = 12 }, thunkAPI) => {
    try {
      const response = await axios.get('/api/users/favorites', {
        params: { page, perPage },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'filters/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/categories');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
