// export const selectFilteredRecipes = state => state.recipes.filteredRecipes;

export const selectTotalCount = state => state.recipes.total;

export const selectFilterCategories = state => state.filters.categories;

export const selectFilterIngredients = state => state.filters.ingredients;

export const selectSelectedCategory = state => state.filters.selectedCategory;

export const selectSelectedIngredient = state =>
  state.filters.selectedIngredient;

export const selectFiltersIsLoading = state => state.filters.isLoading;

export const selectSearchTerm = (state) => state.filters.searchTerm;