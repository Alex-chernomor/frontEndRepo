import Button from '../Button/Button';
import PageTitle from '../PageTitle/PageTitle';
import RecipeDescription from '../RecipeDescription/RecipeDescription';
import RecipesGeneralInfo from '../RecipesGeneralInfo/RecipesGeneralInfo';
import RecipesImg from '../RecipesImg/RecipesImg';
import { FlagIcon } from '../Icons/Icons';
import styles from './RecipeDetails.module.css';
import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// import {
//   addToFavorite,
//   removeFromFavorite,
// } from '../../redux/recipes/operations';

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
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const { recipeId } = useParams();
  //!А може userId треба брати зі слайсу auth через селектор. Але тоді цей параметр тре там описати
  // const user = useSelector(selectUser);
  // const userId = user?.id;
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const handleClick = async () => {
  //   if (!isLoggedIn) {
  //     navigate('/auth/login');
  //     return;
  //   }
  //   //? unwrap() або повертає payload, або кидає error.message, який потрапляє в catch

  //   try {
  //     if (!isFavorite) {
  //       await dispatch(addToFavorite({ userId, recipeId })).unwrap();
  //       setIsFavorite(true);
  //       toast.success('Added to favorites!');
  //     } else {
  //       await dispatch(removeFromFavorite({ userId, recipeId })).unwrap();
  //       setIsFavorite(false);
  //       toast.success('Removed from favorites!');
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'Something went wrong');
  //   }
  // };
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <PageTitle variant="recipeTitle">{title}</PageTitle>
      <RecipesImg thumb={thumb} title={title} />
      <div className={styles.textContainer}>
        <div className={styles.generalInfoAndBtn}>
          <RecipesGeneralInfo
            category={category}
            area={area}
            time={time}
            cals={cals}
          />
          {/* Чомусь кнопка зникає???? може просто зробитит її чере <button></button>?*/}
          {/* <Button className="styles.btn" variant="darkButton">
            Save <FlagIcon />
          </Button> */}
          {/* не забути потім передати onClick={handleClick} */}
          <button className={styles.btn}>
            {isFavorite ? 'Remove' : 'Save'} <FlagIcon />
          </button>
        </div>
        <RecipeDescription
          description={description}
          instructions={instructions}
          ingredients={ingredients}
        />
      </div>
    </div>
  );
}
