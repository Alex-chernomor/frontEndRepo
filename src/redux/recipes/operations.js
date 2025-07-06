import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async ({ page, perPage }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/recipes?page=${page}&perPage=${perPage}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.message);
    }
  }
);

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

export const fetchRecipesByName = createAsyncThunk(
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
        `/api/recipes?page=${page}&perPage=${perPage}&category=${category}&ingredientId=${ingredientId}&query=${query}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.message || "Unknown error"
      );
    }
  }
);

export const fetchFavoriteRecipes = createAsyncThunk(
  "recipes/getFavoritesRecipes",
  async ({ page = 1, perPage = 12 }, thunkAPI) => {
    try {
      const response = await axios.get("/api/users/favorites", {
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
export const fetchRecipesByFilters = createAsyncThunk(
  "recipes/fetchByFilters",
  async ({ category, ingredient }, thunkAPI) => {
    try {
      const params = {};
      if (category) params.category = category;
      if (ingredient) params.ingredient = ingredient;
      const response = await axios.get("/api/recipes", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOwnRecipes = createAsyncThunk(
  "recipes/fetchOwnRecipes",
  async ({ page = 1, perPage = 12 }, thunkAPI) => {
    try {
      const response = await axios.get("/api/users/own", {
        page,
        perPage,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
