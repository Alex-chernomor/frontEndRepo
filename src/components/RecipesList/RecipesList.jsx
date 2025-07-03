// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchRecipes } from '../../redux/recipes/operations.js';
// import {
//   selectAllRecipes,
//   selectIsLoading,
// } from '../../redux/recipes/selectors.js';
// import RecipeCard from '../RecipeCard/RecipeCard.jsx';
// import css from './RecipesList.module.css';

// const RECIPES_PER_PAGE = 12;

// const RecipesList = () => {
//   const dispatch = useDispatch();
//   const allRecipes = useSelector(selectAllRecipes);
//   const isLoading = useSelector(selectIsLoading);
//   const [visibleCount, setVisibleCount] = useState(RECIPES_PER_PAGE);
//   useEffect(() => {
//     dispatch(fetchRecipes());
//   }, [dispatch]);
//   const handleLoadMore = () => {
//     setVisibleCount(prev => prev + RECIPES_PER_PAGE);
//   };
//   const visibleRecipes = allRecipes.slice(0, visibleCount);
//   return (
//     <>
//       <div className={css.recipesWrap}>
//         {isLoading && <Loader />}
//         <ul className={css.list}>
//           {visibleRecipes.map(recipe => (
//             <li key={recipe._id}>
//               <RecipeCard recipe={recipe} />
//             </li>
//           ))}
//         </ul>
//         {visibleCount < allRecipes.lenght && (
//           <div>
//             <LoadMoreBtn onClick={handleLoadMore} />
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default RecipesList;
