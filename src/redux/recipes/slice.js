import { createSlice } from "@reduxjs/toolkit";
import {
  createRecipe,
  removeFromFavorite,
  fetchRecipes,
  fetchFavoriteRecipes,
  fetchOwnRecipes,
  fetchRecipesByName,
  addToFavorite,
} from "./operations";
const handlePending = (state) => {
  state.loading = true;
};
const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};
const slice = createSlice({
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
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        const { data, favorites, total, page, perPage, totalPages } =
          action.payload;
        state.recipes = data || [];
        state.savedRecipes = (favorites || []).map((recipe) =>
          String(recipe._id)
        );
        state.total = total;
        state.page = page;
        state.perPage = perPage;
        state.totalPages = totalPages;
      })
      .addCase(fetchRecipes.rejected, handleRejected)
      .addCase(fetchRecipesByName.pending, handlePending)
      .addCase(fetchRecipesByName.rejected, handleRejected)
      .addCase(createRecipe.pending, handlePending)
      .addCase(createRecipe.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = payload || [];
      })
      .addCase(createRecipe.rejected, handleRejected)
      .addCase(fetchFavoriteRecipes.pending, handlePending)
      .addCase(fetchFavoriteRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        const { data, total, page, perPage, totalPages } = payload.data;
        state.recipes = data || [];
        state.savedRecipes = data
          ? data.map((recipe) => String(recipe._id))
          : [];
        state.total = total;
        state.page = page;
        state.perPage = perPage;
        state.totalPages = totalPages;
      })
      .addCase(fetchFavoriteRecipes.rejected, handleRejected)
      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        const { data, total, page, perPage, totalPages } = payload.data;
        state.recipes = data || [];
        state.savedRecipes = data
          ? data.map((recipe) => String(recipe._id))
          : [];
        state.total = total;
        state.page = page;
        state.perPage = perPage;
        state.totalPages = totalPages;
      })
      .addCase(fetchOwnRecipes.rejected, handleRejected)
      .addCase(addToFavorite.fulfilled, (state, { payload }) => {
        state.savedRecipes = payload.data.favorites || [];
      })
      .addCase(addToFavorite.rejected, handleRejected)
      .addCase(removeFromFavorite.fulfilled, (state, { payload }) => {
        state.savedRecipes = payload.data.favorites || [];
      })
      .addCase(removeFromFavorite.rejected, handleRejected);
  },
});
export default slice.reducer;
