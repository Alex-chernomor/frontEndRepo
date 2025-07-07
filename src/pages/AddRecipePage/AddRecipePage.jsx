import React from 'react';
import Header from '../../sections/Header/Header';
import RecipeForm from '../../components/RecipeForm/RecipeForm.jsx';

import { useDispatch } from 'react-redux';

import toast, { Toaster } from 'react-hot-toast';

import { createResipe } from '../../redux/recipes/operations';

export default function AddRecipePage() {
  const dispatch = useDispatch();

  const onAdd = async recipe => {
    await dispatch(createResipe({ recipe })).unwrap();

    toast.success('Added to favorites!');
  };
  return (
    <div className="container">
      <Toaster position="top-right" reverseOrder={false} />
      <RecipeForm onAdd={onAdd} />
    </div>
  );
}
