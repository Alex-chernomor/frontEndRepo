import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice.js';
import recipesReducer from './recipes/slice.js';
import filtersReducer from './filters/slice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    filters: filtersReducer,
  },
});
