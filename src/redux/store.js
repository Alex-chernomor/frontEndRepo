import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice.js';
import recipesReducer from './recipes/slice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
  },
});
