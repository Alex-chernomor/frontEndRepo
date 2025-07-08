import RecipesFilters from "../RecipesFilters/RecipesFilters.jsx";
import MobileFiltersDropdown from "../MobileFiltersDropdown/MobileFiltersDropdown.jsx";
import { RecipeCount } from "../RecipeCount/RecipeCount.jsx";
import { useSelector } from "react-redux";
import { selectTotalCount } from "../../redux/filters/selectors.js";
import css from "./ResponsiveFilters.module.css";

import { useEffect, useState } from "react";

const useIsMobile = (breakpoint = 1439) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handler = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isMobile;
};

const ResponsiveFilters = ({
  categoryParam,
  ingredientIdParam,
  onChangeSearchParams,
  onResetFilters,
}) => {
  const isMobile = useIsMobile();
  const count = useSelector(selectTotalCount);

  return (
    <div className={css.filtersRow}>
      <div className={css.recipeCount}>
        <RecipeCount count={count} />
      </div>

      <div className={css.filtersRight}>
        {isMobile ? (
          <MobileFiltersDropdown
            categoryParam={categoryParam}
            ingredientIdParam={ingredientIdParam}
            onChangeSearchParams={onChangeSearchParams}
            onResetFilters={onResetFilters}
          />
        ) : (
          <RecipesFilters
            categoryParam={categoryParam}
            ingredientIdParam={ingredientIdParam}
            onChangeSearchParams={onChangeSearchParams}
            onResetFilters={onResetFilters}
          />
        )}
      </div>
    </div>
  );

  //   if (isMobile) {
  //     return (
  //       <MobileFiltersDropdown
  //         categoryParam={categoryParam}
  //         ingredientIdParam={ingredientIdParam}
  //         onChangeSearchParams={onChangeSearchParams}
  //         onResetFilters={onResetFilters}
  //       />
  //     );
  //   }

  //   return (
  //     <RecipesFilters
  //       categoryParam={categoryParam}
  //       ingredientIdParam={ingredientIdParam}
  //       onChangeSearchParams={onChangeSearchParams}
  //       onResetFilters={onResetFilters}
  //     />
  //   );
};
export default ResponsiveFilters;
