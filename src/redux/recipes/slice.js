import { createSlice } from '@reduxjs/toolkit';
import { addToFavorite, removeFromFavorite, fetchRecipes } from './operations';

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
        state.recipes = action.payload.data.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchRecipes.rejected, handleRejected)

      .addCase(addToFavorite.pending, handlePending)
      .addCase(addToFavorite.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = [payload, ...state.recipes];
      })
      .addCase(addToFavorite.rejected, handleRejected)
      .addCase(removeFromFavorite.pending, handlePending)
      .addCase(removeFromFavorite.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = state.recipes.filter(
          recipe => recipe._id !== payload.id
        );
      })
      .addCase(removeFromFavorite.rejected, handleRejected);
  },
});

export default slice.reducer;
