import RecipeForm from '../../components/RecipeForm/RecipeForm.jsx';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { createRecipe } from '../../redux/recipes/operations';
import { fetchCategories } from '../../redux/recipes/operations.js';
import { useNavigate } from 'react-router-dom';

export default function AddRecipePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onAdd = async recipe => {
    try {
      await dispatch(createRecipe({ recipe })).unwrap();

      toast.success('Added to favorites!');
      navigate('/api/users/current/own');
    } catch (error) {
      toast.error('Failed to add recipe');
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div className="container">
      <Toaster position="top-right" reverseOrder={false} />
      <RecipeForm onAdd={onAdd} />
    </div>
  );
}
