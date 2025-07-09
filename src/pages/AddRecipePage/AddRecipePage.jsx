import RecipeForm from '../../components/RecipeForm/RecipeForm.jsx';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { createRecipe } from '../../redux/recipes/operations';

export default function AddRecipePage() {
  const dispatch = useDispatch();

  const onAdd = async recipe => {
    await dispatch(createRecipe({ recipe })).unwrap();

    toast.success('Added to favorites!');
  };
  return (
    <div className="container">
      <Toaster position="top-right" reverseOrder={false} />
      <RecipeForm onAdd={onAdd} />
    </div>
  );
}
