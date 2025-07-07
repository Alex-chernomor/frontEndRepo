import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
// <<<<<<< Larysa0707

// export const fetchRecipes = createAsyncThunk(
//   'recipes/fetchRecipes',
//   async ({ page, perPage }, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `/api/recipes?page=${page}&perPage=${perPage}`
//       );

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.message);
//     }
//   }
// );

export const fetchIngredients = createAsyncThunk(
  'filters/fetchIngredients',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/ingredients');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// =======
//! Це типу fetchRecipesByName, але я в ній змінила назву аби не порушити роботу Search Box
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
        `/api/recipes?page=${page}&perPage=${perPage}&category=${category}&ingredientId=${ingredientId}&query=${query}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.message || 'Unknown error'
      );
    }
  }
);

// export const fetchRecipes = createAsyncThunk(
//   'recipes/fetchRecipes',
//   async ({ page, perPage }, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `/api/recipes?page=${page}&perPage=${perPage}`
//       );

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.message);
//     }
//   }
// );

// export const fetchIngredients = createAsyncThunk(
//   "filters/fetchIngredients",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("/api/ingredients");
//       return response.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
// >>>>>>> main
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

export const fetchRecipesByName = createAsyncThunk(
// <<<<<<< Larysa0707
  'recipes/fetchRecipesByName',
// =======
//   'recipes/fetchRecipes',
// >>>>>>> main
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

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.message || 'Unknown error'
      );
    }
  }
);

export const fetchFavoriteRecipes = createAsyncThunk(
  'recipes/getFavoritesRecipes',
  async ({ page = 1, perPage = 12 }, thunkAPI) => {
    try {
      const response = await axios.get('/api/users/favorites', {
        page,
        perPage,
      });

      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// export const fetchRecipesByFilters = createAsyncThunk(
//   'recipes/fetchByFilters',
//   async ({ category, ingredient }, thunkAPI) => {
//     try {
//       const params = {};
//       if (category) params.category = category;
//       if (ingredient) params.ingredient = ingredient;
//       const response = await axios.get('/api/recipes', { params });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );


export const fetchOwnRecipes = createAsyncThunk(
  'recipes/fetchOwnRecipes',
  async ({ page = 1, perPage = 12 }, thunkAPI) => {
    try {
      const response = await axios.get('/api/users/own', {
        page,
        perPage,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (params, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page);
      if (params.perPage) queryParams.append('per_page', params.perPage);
      if (params.category) queryParams.append('category', params.category);
      if (params.ingredientId)
        queryParams.append('ingredient', params.ingredientId);
      if (params.query) queryParams.append('query', params.query);

// export const fetchOwnRecipes = createAsyncThunk(
//   'recipes/fetchOwnRecipes',
//   async ({ page = 1, perPage = 12 }, thunkAPI) => {
//     try {
//       const response = await axios.get('/api/users/own', {
//         page,
//         perPage,
//       });

      const response = await axios.get(
        `/api/recipes?${queryParams.toString()}`
      );
      // const response = await axios.get(
      //   `/api/recipes?page=${page}&perPage=${perPage}&category=${category}&ingredientId=${ingredientId}&query=${query}`
      // );
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);
