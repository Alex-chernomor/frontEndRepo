import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../recipes/operations.js';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    categories: [],
    selectedCategory: null,
    selectedIngredient: null,
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default filtersSlice.reducer;
