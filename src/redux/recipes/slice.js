=
// import { createSlice } from "@reduxjs/toolkit";

// import {
//   addToFavorite,
//   createRecipe,

import { createSlice } from '@reduxjs/toolkit';
import {
  createResipe,

  removeFromFavorite,
  fetchRecipesByName,
} from "./operations";
  fetchRecipes,
  fetchFavoriteRecipes,
  fetchOwnRecipes,

} from "./operations";

const handlePending = (state) => {

// } from './operations';

// const handlePending = state => {

  state.loading = true;
};
const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const slice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    total: null,
    page: 1,
    perPage: 12,
    totalPages: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchRecipesByName.pending, handlePending)
      .addCase(fetchRecipesByName.fulfilled, (state, action) => {
        console.log("✅ fetchRecipes payload:", action.payload);

      .addCase(fetchRecipes.pending, handlePending)

      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;

        state.recipes = action.payload.data.data;
        state.total = action.payload.data.total;
        state.page = action.payload.data.page;
        state.perPage = action.payload.data.perPage;
        state.totalPages = action.payload.data.totalPages;
      })

      .addCase(fetchRecipesByName.rejected, handleRejected)
      .addCase(fetchRecipes.rejected, handleRejected)
      .addCase(createRecipe.pending, handlePending)
      .addCase(createRecipe.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = payload;
      })


      .addCase(createRecipe.rejected, handleRejected)

      .addCase(removeFromFavorite.pending, handlePending)
      .addCase(removeFromFavorite.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = state.recipes.filter(
          (recipe) => recipe._id !== payload.id
        );
      })
      .addCase(removeFromFavorite.rejected, handleRejected)

//       .addCase(createResipe.rejected, handleRejected)

      .addCase(fetchFavoriteRecipes.pending, handlePending)
      .addCase(fetchFavoriteRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = payload.data.data;
        state.total = payload.data.total;
        state.page = payload.data.page;
        state.perPage = payload.data.perPage;
        state.totalPages = payload.data.totalPages;
      })
      .addCase(fetchFavoriteRecipes.rejected, handleRejected)
      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = payload.data.data;
        state.total = payload.data.total;
        state.page = payload.data.page;
        state.perPage = payload.data.perPage;
        state.totalPages = payload.data.totalPages;
      })
      .addCase(fetchOwnRecipes.rejected, handleRejected);
  },
});

export default slice.reducer;
