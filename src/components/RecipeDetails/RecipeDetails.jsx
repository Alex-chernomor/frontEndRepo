import Button from '../Button/Button';
import PageTitle from '../PageTitle/PageTitle';
import RecipeDescription from '../RecipeDescription/RecipeDescription';
import RecipesGeneralInfo from '../RecipesGeneralInfo/RecipesGeneralInfo';
import RecipesImg from '../RecipesImg/RecipesImg';
import { FlagIcon } from '../Icons/Icons';
import styles from './RecipeDetails.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {
  addToFavorite,
  removeFromFavorite,
} from '../../redux/recipes/operations';

export default function RecipeDetails({
  title,
  category,
  area,
  instructions,
  description,
  thumb,
  time,
  ingredients,
  cals,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { recipeId, userId } = useParams();
  //А може там і userId const { recipeId , userId} = useParams().Поки так і напишу
  //!А може userId треба брати зі слайсу auth через селектор. Але тоді цей параметр тре там описати
  // const user = useSelector(selectUser);
  // const userId = user?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (!isLoggedIn) {
      navigate('/auth/login');
      return;
    }
    //? unwrap() або повертає payload, або кидає error.message, який потрапляє в catch

    try {
      if (!isFavorite) {
        await dispatch(addToFavorite({ userId, recipeId })).unwrap();
        setIsFavorite(true);
        toast.success('Added to favorites!');
      } else {
        await dispatch(removeFromFavorite({ userId, recipeId })).unwrap();
        setIsFavorite(false);
        toast.success('Removed from favorites!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <PageTitle variant="recipeTitle">{title}</PageTitle>
      <RecipesImg thumb={thumb} title={title} />
      <RecipesGeneralInfo
        category={category}
        area={area}
        time={time}
        cals={cals}
      />
      <RecipeDescription
        description={description}
        instructions={instructions}
        ingredients={ingredients}
      />
      {/* Чомусь кнопка зникає???? може промто зробитит її чере <button></button>?*/}
      {/* <Button className="styles.btn" variant="darkButton">
        Save <FlagIcon />
      </Button> */}
      <button className={styles.btn} onClick={handleClick}>
        {isFavorite ? 'Remove' : 'Save'} <FlagIcon />
      </button>
    </div>
  );
}
