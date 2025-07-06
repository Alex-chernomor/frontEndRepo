import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchIngredients } from '../recipes/operations.js';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    categories: [],
    ingredients: [],
    selectedCategory: null,
    selectedIngredient: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // resetFilters(state) {
    //   state.selectedCategory = null;
    //   state.selectedIngredient = null;
    // },
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
      })
      .addCase(fetchIngredients.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const { resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
