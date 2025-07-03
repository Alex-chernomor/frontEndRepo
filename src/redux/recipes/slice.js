import { createSlice } from '@reduxjs/toolkit';

const handlePending = state => {
  state.loading = true;
};
const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const slice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder.addCase();
  },
});

export default slice.reducer;
