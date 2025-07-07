import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../recipes/operations.js";
import { fetchIngredients } from "../recipes/operations.js"; // Раскомментируй при необходимости

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    categories: [],
    ingredients: [], // Раскомментируй при необходимости
    selectedCategory: null,
    selectedIngredient: null,
    searchTerm: "",
    isLoading: false,
    error: null,
  },

  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedIngredient(state, action) {
      state.selectedIngredient = action.payload;
    },
    resetFilters(state) {
      state.selectedCategory = null;
      state.selectedIngredient = null;
      state.searchTerm = "";
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
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

    // Раскомментируй если будет `fetchIngredients`

    builder
      .addCase(fetchIngredients.pending, (state) => {
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

export const {
  setSelectedCategory,
  setSelectedIngredient,
  resetFilters,
  setSearchTerm,
} = filtersSlice.actions;

export default filtersSlice.reducer;
