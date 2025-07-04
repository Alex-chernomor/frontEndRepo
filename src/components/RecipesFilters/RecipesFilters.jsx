// import { useState, useEffect } from "react";

// import Select from "react-select";
// import css from "./RecipesFilters.module.css";

// const useIsMobile = (breakpoint = 768) => {
//   const [isMobile, setIsMobile] = useState(
//     () => window.innerWidth <= breakpoint
//   );

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= breakpoint);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [breakpoint]);

//   return isMobile;
// };

// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     minHeight: "33px",
//     height: "33px",
//     minWidth: "179px",
//     border: "1px solid #d9d9d9",
//     borderRadius: "4px",
//   }),
//   valueContainer: (provided) => ({
//     ...provided,
//     padding: "0 8px",
//   }),
//   input: (provided) => ({
//     ...provided,
//     margin: 0,
//     padding: 0,
//   }),
//   indicatorsContainer: (provided) => ({
//     ...provided,
//     height: "33px",
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     color: "#595d62",
//   }),
//   indicatorSeparator: () => ({
//     display: "none",
//   }),
// };

// const RecipesFilters = () => {
//   const categories = ["Lunch", "Dinner"];
//   const ingredients = ["Eggs", "Tomatoes"];

//   const isMobile = useIsMobile();

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedIngredient, setSelectedIngredient] = useState(null);

//   const [isFiltersOpen, setIsFiltersOpen] = useState(false);

//   const handleReset = () => {
//     setSelectedCategory(null);
//     setSelectedIngredient(null);
//   };

//   const hasSelectedFilters = selectedCategory || selectedIngredient;

//   return (
//     <div>
//       {isMobile ? (
//         <>
//           <div className={css.mobileFilterBtnWrap}>
//             <button
//               className={css.mobileFilterBtn}
//               onClick={() => setIsFiltersOpen(true)}
//             >
//               <svg className={css.icon}>
//                 <use href="/sprite.svg#icon-filter" />
//               </svg>
//               Filters
//             </button>
//           </div>

//           {isFiltersOpen && (
//             <div className={css.mobileModal}>
//               <Select
//                 options={categories.map((cat) => ({ label: cat, value: cat }))}
//                 value={selectedCategory}
//                 onChange={setSelectedCategory}
//                 placeholder="Category"
//                 isClearable
//                 styles={customStyles}
//               />
//               <Select
//                 options={ingredients.map((ing) => ({ label: ing, value: ing }))}
//                 value={selectedIngredient}
//                 onChange={setSelectedIngredient}
//                 placeholder="Ingredient"
//                 isClearable
//                 styles={customStyles}
//               />
//               <button
//                 onClick={() => {
//                   handleReset();
//                   setIsFiltersOpen(false);
//                 }}
//                 className={`${css.btn} ${hasSelectedFilters ? css.active : ""}`}
//               >
//                 Reset filters
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className={css.filtersWrapper}>
//           <div className={css.filtersBox}>
//             <button
//               onClick={handleReset}
//               className={`${css.btn} ${hasSelectedFilters ? css.active : ""}`}
//             >
//               Reset filters
//             </button>
//             <Select
//               options={categories.map((cat) => ({ label: cat, value: cat }))}
//               value={selectedCategory}
//               onChange={setSelectedCategory}
//               placeholder="Category"
//               isClearable
//               styles={customStyles}
//             />
//             <Select
//               options={ingredients.map((ing) => ({ label: ing, value: ing }))}
//               value={selectedIngredient}
//               onChange={setSelectedIngredient}
//               placeholder="Ingredient"
//               isClearable
//               styles={customStyles}
//             />
//           </div>
//         </div>
//       )}

//       {/* {isLoading ? (
//         <p>Loading recipes...</p>
//       ) : recipes.length === 0 ? (
//         <p className={css.text}>No recipes match your filters.</p>
//       ) : (
//         <p className={css.text}>{recipes.length} recipes found.</p>
//       )} */}
//     </div>
//   );
// };

// export default RecipesFilters;

// // import { useEffect, useState } from 'react';
// // import Select from 'react-select';
// // import { useDispatch, useSelector } from 'react-redux';
// // import {
// //   fetchRecipesByFilters,
// //   fetchFilterOptions,
// //   resetFilters,
// // } from '../redux/recipes/operations';
// // import {
// //   selectFilteredRecipes,
// //   selectFilterOptions,
// //   selectIsLoading,
// // } from '../redux/recipes/selectors';

// // import css from './RecipesFilters.module.css';

// // const useIsMobile = (breakpoint = 768) => {
// //   const [isMobile, setIsMobile] = useState(
// //     () => window.innerWidth <= breakpoint
// //   );

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth <= breakpoint);
// //     };

// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, [breakpoint]);

// //   return isMobile;
// // };

// // const customStyles = {
// //   control: provided => ({
// //     ...provided,
// //     minHeight: '33px',
// //     height: '33px',
// //     width: '179px',
// //     border: '1px solid #d9d9d9',
// //     borderRadius: '4px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     boxShadow: 'none',
// //   }),
// //   valueContainer: provided => ({
// //     ...provided,
// //     height: '33px',
// //     padding: '0 8px',
// //     display: 'flex',
// //     alignItems: 'center',
// //   }),
// //   input: provided => ({
// //     ...provided,
// //     margin: 0,
// //     padding: 0,
// //   }),
// //   indicatorsContainer: provided => ({
// //     ...provided,
// //     height: '33px',
// //   }),
// //   singleValue: provided => ({
// //     ...provided,
// //     color: '#595d62',
// //   }),
// //   indicatorSeparator: () => ({
// //     display: 'none',
// //   }),
// // };

// // const RecipesFilters = () => {
// //   const dispatch = useDispatch();
// //   const isMobile = useIsMobile();

// //   const { ingredients, categories } = useSelector(selectFilterOptions);
// //   const recipes = useSelector(selectFilteredRecipes);
// //   const isLoading = useSelector(selectIsLoading);

// //   const [selectedCategory, setSelectedCategory] = useState(null);
// //   const [selectedIngredient, setSelectedIngredient] = useState(null);
// //   const [isFiltersOpen, setIsFiltersOpen] = useState(false);

// //   const hasSelectedFilters = selectedCategory || selectedIngredient;

// //   useEffect(() => {
// //     dispatch(fetchFilterOptions());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     dispatch(
// //       fetchRecipesByFilters({
// //         category: selectedCategory?.value || '',
// //         ingredient: selectedIngredient?.value || '',
// //       })
// //     );
// //   }, [selectedCategory, selectedIngredient, dispatch]);

// //   const handleReset = () => {
// //     setSelectedCategory(null);
// //     setSelectedIngredient(null);
// //     dispatch(resetFilters());
// //     dispatch(fetchRecipesByFilters({ category: '', ingredient: '' }));
// //   };

// //   return (
// //     <div>
// //       {isMobile ? (
// //         <>
// //           <button
// //             className={css.mobileFilterBtn}
// //             onClick={() => setIsFiltersOpen(true)}
// //           >
// //             <svg className={css.icon}>
// //               <use href="/sprite.svg#icon-filter" />
// //             </svg>
// //             Filters
// //           </button>

// //           {isFiltersOpen && (
// //             <div className={css.mobileModal}>
// //               <Select
// //                 options={categories.map(cat => ({ label: cat, value: cat }))}
// //                 value={selectedCategory}
// //                 onChange={setSelectedCategory}
// //                 placeholder="Category"
// //                 isClearable
// //                 styles={customStyles}
// //               />
// //               <Select
// //                 options={ingredients.map(ing => ({ label: ing, value: ing }))}
// //                 value={selectedIngredient}
// //                 onChange={setSelectedIngredient}
// //                 placeholder="Ingredient"
// //                 isClearable
// //                 styles={customStyles}
// //               />
// //               <button
// //                 onClick={() => {
// //                   handleReset();
// //                   setIsFiltersOpen(false);
// //                 }}
// //                 className={`${css.btn} ${hasSelectedFilters ? css.active : ''}`}
// //               >
// //                 Reset filters
// //               </button>
// //             </div>
// //           )}
// //         </>
// //       ) : (
// //         <div className={css.filtersWrapper}>
// //           <div className={css.filtersBox}>
// //             <button
// //               onClick={handleReset}
// //               className={`${css.btn} ${hasSelectedFilters ? css.active : ''}`}
// //             >
// //               Reset filters
// //             </button>
// //             <Select
// //               options={categories.map(cat => ({ label: cat, value: cat }))}
// //               value={selectedCategory}
// //               onChange={setSelectedCategory}
// //               placeholder="Category"
// //               isClearable
// //               styles={customStyles}
// //             />
// //             <Select
// //               options={ingredients.map(ing => ({ label: ing, value: ing }))}
// //               value={selectedIngredient}
// //               onChange={setSelectedIngredient}
// //               placeholder="Ingredient"
// //               isClearable
// //               styles={customStyles}
// //             />
// //           </div>
// //         </div>
// //       )}

// //       {isLoading ? (
// //         <p>Loading recipes...</p>
// //       ) : recipes.length === 0 ? (
// //         <p className={css.text}>No recipes match your filters.</p>
// //       ) : (
// //         <p className={css.text}>{recipes.length} recipes found.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default RecipesFilters;
