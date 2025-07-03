import Button from '../Button/Button';
import PageTitle from '../PageTitle/PageTitle';
import RecipeDescription from '../RecipeDescription/RecipeDescription';
import RecipesGeneralInfo from '../RecipesGeneralInfo/RecipesGeneralInfo';
import RecipesImg from '../RecipesImg/RecipesImg';
import { FlagIcon } from '../Icons/Icons';
import styles from './RecipeDetails.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

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
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!isLoggedIn) {
      navigate('/auth/login');
      return;
    }

    try {
      if (!isFavorite) {
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
        Save <FlagIcon />
      </button>
    </div>
  );
}
