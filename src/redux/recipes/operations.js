import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.params = {
//   perPage: 12,
// };

export const createResipe = createAsyncThunk(
  'recipes/createResipe',
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

// export const fetchRecipes = createAsyncThunk(
//   'recipes/fetchRecipes',
//   async ({ page, perPage, category, ingredientId, query }, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         '/api/recipes?page=${page}&perPage=${perPage}&category=${category}&ingredientId=${ingredientId}&query=${query}'
//       );
//       console.log('API Response:', response.data);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.message);
//     }
//   }
// );

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
        `/api/recipes?page=${page}&perPage=${perPage}&category=${category}&ingredientId=${ingredientId}&query=${encodeURIComponent(
          query
        )}`
      );
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.message);
    }
  }
);
