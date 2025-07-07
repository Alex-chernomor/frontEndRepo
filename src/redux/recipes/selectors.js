export const selectRecipes = (state) => state.recipes.recipes;
export const selectSavedRecipes = (state) => state.recipes.savedRecipes;
export const selectIsLoading = (state) => state.recipes.loading;
export const selectError = (state) => state.recipes.error;

export const selectTotalPages = (state) => state.recipes.totalPages;
