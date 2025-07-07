// import { createSlice } from "@reduxjs/toolkit";
// import {
//   createRecipe,
//   removeFromFavorite,
//   fetchRecipes,
//   fetchFavoriteRecipes,
//   fetchOwnRecipes,
//   fetchRecipesByName,
//   addToFavorite,
// } from "./operations";

// //   // fetchRecipesByName,
// //   fetchRecipes,
// //   fetchFavoriteRecipes,
// //   fetchOwnRecipes,
// // } from './operations';

// const handlePending = (state) => {
//   state.loading = true;
// };
// const handleRejected = (state, { payload }) => {
//   state.loading = false;
//   state.error = payload;
// };

// const slice = createSlice({
//   name: "recipes",
//   initialState: {
//     recipes: [],
//     savedRecipes: [],
//     total: null,
//     page: 1,
//     perPage: 12,
//     totalPages: null,
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRecipes.pending, handlePending)
//       .addCase(fetchRecipes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.recipes = action.payload.data.data;
//         state.savedRecipes = action.payload.favorites.map((recipe) =>
//           String(recipe._id)
//         );
//         state.total = action.payload.total;
//         state.page = action.payload.page;
//         state.perPage = action.payload.perPage;
//         state.totalPages = action.payload.totalPages;

//         //         const { data, total, page, perPage, totalPages } = action.payload.data;

//         //         if (page > 1) {
//         //           state.recipes = [...state.recipes, ...data];
//         //         } else {
//         //           state.recipes = data;
//         //         }

//         //         state.total = total;
//         //         state.page = page;
//         //         state.perPage = perPage;
//         //         state.totalPages = totalPages;
//       })
//       // <<<<<<< Larysa0707
//       // .addCase(fetchRecipes.rejected, handleRejected)
//       .addCase(fetchRecipesByName.pending, handlePending)
//       .addCase(fetchRecipesByName.rejected, handleRejected)

//       // =======
//       //       .addCase(fetchRecipes.rejected, handleRejected)
//       // >>>>>>> main
//       .addCase(createRecipe.pending, handlePending)
//       .addCase(createRecipe.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.error = null;
//         state.recipes = payload;
//       })
//       .addCase(createRecipe.rejected, handleRejected)

//       .addCase(fetchFavoriteRecipes.pending, handlePending)
//       .addCase(fetchFavoriteRecipes.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.error = null;
//         state.recipes = payload.data.data;
//         state.savedRecipes = payload.data.data.map((recipe) =>
//           String(recipe._id)
//         );
//         state.total = payload.data.total;
//         state.page = payload.data.page;
//         state.perPage = payload.data.perPage;
//         state.totalPages = payload.data.totalPages;
//       })
//       .addCase(fetchFavoriteRecipes.rejected, handleRejected)
//       .addCase(fetchOwnRecipes.pending, handlePending)
//       .addCase(fetchOwnRecipes.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.error = null;
//         state.recipes = payload.data.data;
//         state.savedRecipes = payload.data.data.map((recipe) =>
//           String(recipe._id)
//         );
//         state.total = payload.data.total;
//         state.page = payload.data.page;
//         state.perPage = payload.data.perPage;
//         state.totalPages = payload.data.totalPages;
//       })
//       .addCase(fetchOwnRecipes.rejected, handleRejected)
//       .addCase(addToFavorite.fulfilled, (state, { payload }) => {
//         state.savedRecipes = payload.data.favorites;
//       })
//       .addCase(addToFavorite.rejected, handleRejected)
//       .addCase(removeFromFavorite.fulfilled, (state, { payload }) => {
//         state.savedRecipes = payload.data.favorites;
//       })
//       .addCase(removeFromFavorite.rejected, handleRejected);
//   },
// });

// export default slice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import {
  createRecipe,
  removeFromFavorite,
  fetchRecipes,
  fetchFavoriteRecipes,
  fetchOwnRecipes,
  fetchRecipesByName,
  addToFavorite,
} from "./operations";

const handlePending = (state) => {
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
    savedRecipes: [],
    total: null,
    page: 1,
    perPage: 12,
    totalPages: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        const { data, favorites, total, page, perPage, totalPages } =
          action.payload;

        state.recipes = data || [];
        state.savedRecipes = (favorites || []).map((recipe) =>
          String(recipe._id)
        );
        state.total = total;
        state.page = page;
        state.perPage = perPage;
        state.totalPages = totalPages;
      })
      .addCase(fetchRecipes.rejected, handleRejected)

      .addCase(fetchRecipesByName.pending, handlePending)
      .addCase(fetchRecipesByName.rejected, handleRejected)

      .addCase(createRecipe.pending, handlePending)
      .addCase(createRecipe.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.recipes = payload || [];
      })
      .addCase(createRecipe.rejected, handleRejected)

      .addCase(fetchFavoriteRecipes.pending, handlePending)
      .addCase(fetchFavoriteRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        const { data, total, page, perPage, totalPages } = payload.data;

        state.recipes = data || [];
        state.savedRecipes = data
          ? data.map((recipe) => String(recipe._id))
          : [];
        state.total = total;
        state.page = page;
        state.perPage = perPage;
        state.totalPages = totalPages;
      })
      .addCase(fetchFavoriteRecipes.rejected, handleRejected)

      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, (state, { payload }) => {
        state.loading = false;
        const { data, total, page, perPage, totalPages } = payload.data;

        state.recipes = data || [];
        state.savedRecipes = data
          ? data.map((recipe) => String(recipe._id))
          : [];
        state.total = total;
        state.page = page;
        state.perPage = perPage;
        state.totalPages = totalPages;
      })
      .addCase(fetchOwnRecipes.rejected, handleRejected)

      .addCase(addToFavorite.fulfilled, (state, { payload }) => {
        state.savedRecipes = payload.data.favorites || [];
      })
      .addCase(addToFavorite.rejected, handleRejected)

      .addCase(removeFromFavorite.fulfilled, (state, { payload }) => {
        state.savedRecipes = payload.data.favorites || [];
      })
      .addCase(removeFromFavorite.rejected, handleRejected);
  },
});

export default slice.reducer;
