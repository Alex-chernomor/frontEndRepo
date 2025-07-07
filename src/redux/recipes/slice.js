import { createSlice } from "@reduxjs/toolkit";
import {
  createResipe,
  removeFromFavorite,
  fetchRecipes,
  fetchFavoriteRecipes,
  fetchOwnRecipes,
} from "./operations";

const handlePending = (state) => {
const handlePending = (state) => {
  state.loading = true;
};
const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const slice = createSlice({
  name: "recipes",
  name: "recipes",
  initialState: {
    recipes: [],
    savedRecipes: [],
    total: null,
    page: 1,
    perPage: 12,
    totalPages: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipesByName.pending, handlePending)
      // .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload.data.data;
        state.savedRecipes = action.payload.favorites.map((recipe) =>
          String(recipe._id)
        );
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchRecipesByName.rejected, handleRejected)
      // .addCase(fetchRecipes.rejected, handleRejected)
      .addCase(createResipe.pending, handlePending)
      .addCase(createResipe.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = payload;
      })
      .addCase(createResipe.rejected, handleRejected)

      .addCase(fetchFavoriteRecipes.pending, handlePending)
      .addCase(fetchFavoriteRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = payload.data.data;
        state.savedRecipes = payload.data.data.map((recipe) =>
          String(recipe._id)
        );
        state.total = payload.data.total;
        state.page = payload.data.page;
        state.perPage = payload.data.perPage;
        state.totalPages = payload.data.totalPages;
      })
      .addCase(fetchFavoriteRecipes.rejected, handleRejected)
      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = payload.data.data;
        state.savedRecipes = payload.data.data.map((recipe) =>
          String(recipe._id)
        );
        state.total = payload.data.total;
        state.page = payload.data.page;
        state.perPage = payload.data.perPage;
        state.totalPages = payload.data.totalPages;
      })
      .addCase(fetchOwnRecipes.rejected, handleRejected);
      .addCase(fetchOwnRecipes.rejected, handleRejected)
      .addCase(addToFavorite.fulfilled, (state, { payload }) => {
        state.savedRecipes = payload.data.favorites;
      })
      .addCase(addToFavorite.rejected, handleRejected)
      .addCase(removeFromFavorite.fulfilled, (state, { payload }) => {
        state.savedRecipes = payload.data.favorites;
      })
      .addCase(removeFromFavorite.rejected, handleRejected);
  },
});

export default slice.reducer;
