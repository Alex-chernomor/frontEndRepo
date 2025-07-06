import axios from 'axios';

const backEndUrl = 'https://backendrepo-ormv.onrender.com/api/recipes';

export const fetchRecipes = async () => {
  const resp = await axios.get(backEndUrl);
  return resp.data;
};

export const getRecipeById = async recipeId => {
  const resp = await axios.get(`${backEndUrl}/${recipeId}`);
  return resp.data.data;
};

export const addToFavorite = async recipeId => {
  const resp = await axios.post(`/api/users/favorites/${recipeId}`);
  return resp.data;
};

export const removeFromFavorite = async recipeId => {
  const resp = await axios.delete(`/api/users/favorites/${recipeId}`);
  return resp.data;
};
