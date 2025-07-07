export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectFavorites = (state) => state.auth.user.favorites;
export const selectUserName = (state) => state.auth.user.name;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;

// export const selectIsLoggedIn = state => state.auth.isLoggedIn;
// export const selectUser = state => state.auth.user.user;
