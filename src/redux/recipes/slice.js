import { createSlice } from "@reduxjs/toolkit";
import {
  createRecipe,
  fetchRecipes,
  fetchFavoriteRecipes,
  fetchOwnRecipes,
  fetchRecipesByName,
} from "./operations";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload ?? "Something went wrong";
};

const ensureArray = (arr) => (Array.isArray(arr) ? arr : []);

const slice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    savedRecipes: [],
    total: 0,
    page: 1,
    perPage: 12,
    totalPages: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // ================= fetchRecipes =================
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { favorites, data } = action.payload ?? {};
        const {
          data: recipesData,
          total = 0,
          page = 1,
          perPage = 12,
          totalPages = 0,
        } = data ?? {};

        const safeRecipesData = ensureArray(recipesData);

        if (page > 1) {
          const existingIds = new Set(state.recipes.map((r) => r._id));
          const newRecipes = safeRecipesData.filter(
            (r) => !existingIds.has(r._id)
          );
          state.recipes = [...state.recipes, ...newRecipes];
        } else {
          state.recipes = safeRecipesData;
        }

        state.savedRecipes = ensureArray(favorites).map((r) =>
          String(r._id)
        );

        state.total = total;
        state.page = page;
        state.perPage = perPage;
        state.totalPages = totalPages;
      })
      .addCase(fetchRecipes.rejected, handleRejected)

      // ================= fetchRecipesByName =================
      .addCase(fetchRecipesByName.pending, handlePending)
      .addCase(fetchRecipesByName.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;

        const { data } = payload ?? {};
        state.recipes = ensureArray(data?.data);
        state.total = data?.total ?? 0;
        state.page = data?.page ?? 1;
        state.perPage = data?.perPage ?? 12;
        state.totalPages = data?.totalPages ?? 0;
      })
      .addCase(fetchRecipesByName.rejected, handleRejected)

      // ================= createRecipe =================
      .addCase(createRecipe.pending, handlePending)
      .addCase(createRecipe.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createRecipe.rejected, handleRejected)

      // ================= fetchFavoriteRecipes =================
      .addCase(fetchFavoriteRecipes.pending, handlePending)
      .addCase(fetchFavoriteRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;

        const { data } = payload ?? {};
        state.recipes = ensureArray(data?.data);
        state.savedRecipes = ensureArray(data?.data).map((r) =>
          String(r._id)
        );

        state.total = data?.total ?? 0;
        state.page = data?.page ?? 1;
        state.perPage = data?.perPage ?? 12;
        state.totalPages = data?.totalPages ?? 0;
      })
      .addCase(fetchFavoriteRecipes.rejected, handleRejected)

      // ================= fetchOwnRecipes =================
      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;

        const { data } = payload ?? {};
        state.recipes = ensureArray(data?.data);
        state.savedRecipes = ensureArray(data?.data).map((r) =>
          String(r._id)
        );

        state.total = data?.total ?? 0;
        state.page = data?.page ?? 1;
        state.perPage = data?.perPage ?? 12;
        state.totalPages = data?.totalPages ?? 0;
      })
      .addCase(fetchOwnRecipes.rejected, handleRejected);
  },
});

export default slice.reducer;
