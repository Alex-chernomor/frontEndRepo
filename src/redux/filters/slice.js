import { createSlice } from '@reduxjs/toolkit';
// import { fetchCategories, fetchIngredients } from '../recipes/operations.js';
import { fetchCategories } from '../recipes/operations.js';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    categories: [],
    // ingredients: [],
    selectedCategory: null,
    selectedIngredient: null,
    searchTerm: "",     
    isLoading: false,
    error: null,
  },
  
  reducers: {
// <<<<<<< Larysa0707
    setSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
    setSelectedIngredient: (state, { payload }) => {
      state.selectedIngredient = payload;
    },
    resetFilters: state => {
      state.selectedCategory = null;
      state.selectedIngredient = null;
    },
// =======
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    // resetFilters(state) {
    //   state.selectedCategory = null;
    //   state.selectedIngredient = null;
    //   state.searchTerm = "";
    // },
// >>>>>>> main
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
    // .addCase(fetchIngredients.pending, state => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(fetchIngredients.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.ingredients = action.payload;
    // })
    // .addCase(fetchIngredients.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});


export const { setSelectedCategory, setSelectedIngredient, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;

// export const { setSearchTerm } = filtersSlice.actions;
// export default filtersSlice.reducer;

