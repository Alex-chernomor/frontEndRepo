import { createSlice } from '@reduxjs/toolkit';
import {
  createResipe,
  // fetchRecipesByName,
  fetchRecipes,
  fetchFavoriteRecipes,
  fetchOwnRecipes,
} from './operations';

const handlePending = state => {
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
  extraReducers: builder => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;

        const { data, total, page, perPage, totalPages } = action.payload.data;

        if (page > 1) {
          state.recipes = [...state.recipes, ...data];
        } else {
          state.recipes = data;
        }

        state.total = total;
        state.page = page;
        state.perPage = perPage;
        state.totalPages = totalPages;
      })
// <<<<<<< Larysa0707
      // .addCase(fetchRecipes.rejected, handleRejected)
      .addCase(fetchRecipesByName.pending, handlePending)
      .addCase(fetchRecipesByName.rejected, handleRejected)

// =======
//       .addCase(fetchRecipes.rejected, handleRejected)
// >>>>>>> main
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
        state.total = payload.data.total;
        state.page = payload.data.page;
        state.perPage = payload.data.perPage;
        state.totalPages = payload.data.totalPages;
      })
      .addCase(fetchOwnRecipes.rejected, handleRejected);
  },
});

export default slice.reducer;
