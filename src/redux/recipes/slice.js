import { createSlice } from '@reduxjs/toolkit';
import { addToFavorite, removeFromFavorite } from './operations';

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
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(addToFavorite.pending, handlePending)
      .addCase(addToFavorite.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = payload;
      })
      .addCase(addToFavorite.rejected, handleRejected)
      .addCase(removeFromFavorite.pending, handlePending)
      .addCase(removeFromFavorite.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = state.recipes.filter(
          recipe => recipe.id !== payload.id
        );
      })
      .addCase(removeFromFavorite.rejected, handleRejected);
  },
});

export default slice.reducer;
