import axios from 'axios';

const backEndUrl = 'https://backendrepo-ormv.onrender.com/api/recipes';

export const fetchRecipes = async () => {
  const resp = await axios.get(backEndUrl);
  return resp.data;
};

export const fetchRecipeDetails = async recipeId => {
  const resp = await axios.get(`${backEndUrl}/${recipeId}`);
  return resp.data || [];
};
