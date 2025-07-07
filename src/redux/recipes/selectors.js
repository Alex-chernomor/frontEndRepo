// <<<<<<< toggle_favorite
export const selectRecipes = (state) => state.recipes.recipes;
export const selectSavedRecipes = (state) => state.recipes.savedRecipes;
export const selectIsLoading = (state) => state.recipes.loading;
export const selectError = (state) => state.recipes.error;

export const selectTotalPages = (state) => state.recipes.totalPages;

export const selectPage = state => state.recipes.page;
export const selectPerPage = state => state.recipes.perPage;
// export const selectTotalPages = state => state.recipes.totalPages;
// export const selectRecipes = state => state.recipes.recipes;
// export const selectIsLoading = state => state.recipes.loading;

// export const selectError = state => state.recipes.error;

