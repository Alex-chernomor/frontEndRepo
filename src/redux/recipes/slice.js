import { createSlice } from '@reduxjs/toolkit';
import {
  createResipe,
  // removeFromFavorite,
  fetchRecipesByName,
  fetchRecipes,
  fetchFavoriteRecipes,
  fetchOwnRecipes,
} from './operations';

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const slice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    total: null,
    page: 1,
    perPage: 12,
    totalPages: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      // Пошук за назвою
      .addCase(fetchRecipesByName.pending, handlePending)
      .addCase(fetchRecipesByName.fulfilled, (state, action) => {
        console.log("✅ fetchRecipesByName payload:", action.payload);
        state.loading = false;
        state.recipes = action.payload.data.data;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.perPage = action.payload.data.perPage;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchRecipesByName.rejected, handleRejected)

      // Отримати всі рецепти
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload.data.data;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.perPage = action.payload.data.perPage;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchRecipes.rejected, handleRejected)

      // Створити рецепт
      .addCase(createResipe.pending, handlePending)
      .addCase(createResipe.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = payload;
      })
      .addCase(createResipe.rejected, handleRejected)

      // Улюблені рецепти
      .addCase(fetchFavoriteRecipes.pending, handlePending)
      .addCase(fetchFavoriteRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = payload.data.data;
        state.total = payload.data.total;
        state.page = payload.data.page;
        state.perPage = payload.data.perPage;
        state.totalPages = payload.data.totalPages;
      })
      .addCase(fetchFavoriteRecipes.rejected, handleRejected)

      // Власні рецепти
      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = payload.data.data;
        state.total = payload.data.total;
        state.page = payload.data.page;
        state.perPage = payload.data.perPage;
        state.totalPages = payload.data.totalPages;
      })
      .addCase(fetchOwnRecipes.rejected, handleRejected);
  },
});

export default slice.reducer;