import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// Добавить в избранное
export const addToFavorite = createAsyncThunk(
  "recipes/addToFavorite",
  async (recipeId, thunkAPI) => {
    try {
      const resp = await axios.post(`/api/users/favorites/${recipeId}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Удалить из избранного
export const removeFromFavorite = createAsyncThunk(
  "recipes/removeFromFavorite",
  async (recipeId, thunkAPI) => {
    try {
      const resp = await axios.delete(`/api/users/favorites/${recipeId}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Создать рецепт
export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
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
// Получить список рецептов (фильтрованный)
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (
    {
      page = 1,
      perPage = 12,
      category = "",
      ingredientId = "",
      query = "",
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
        error.response?.message || "Unknown error"
      );
    }
  }
);
// Поиск рецептов по имени (с учетом избранного)
export const fetchRecipesByName = createAsyncThunk(
  "recipes/fetchRecipesByName",
  async (
    {
      page = 1,
      perPage = 12,
      category = "",
      ingredientId = "",
      query = "",
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
        error.response?.message || "Unknown error"
      );
    }
  }
);
// Получить собственные рецепты
export const fetchOwnRecipes = createAsyncThunk(
  "recipes/fetchOwnRecipes",
  async ({ page = 1, perPage = 12 }, thunkAPI) => {
    try {
      const response = await axios.get("/api/users/own", {
        params: { page, perPage },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Получить избранные рецепты
export const fetchFavoriteRecipes = createAsyncThunk(
  "recipes/getFavoritesRecipes",
  async ({ page = 1, perPage = 12 }, thunkAPI) => {
    try {
      const response = await axios.get("/api/users/favorites", {
        params: { page, perPage },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Получить все ингредиенты
export const fetchIngredients = createAsyncThunk(
  "filters/fetchIngredients",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/ingredients");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Получить все категории
export const fetchCategories = createAsyncThunk(
  "filters/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/categories");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
