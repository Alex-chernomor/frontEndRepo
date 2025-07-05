import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import css from "./RecipeCard.module.css";
import Button from "../Button/Button";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../redux/recipes/operations.js";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";

export default function RecipeCard({
  _id,
  title,
  description,
  thumb,
  time,
  cals,
  isOwnRecipe = false,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favorites = user?.favorites || [];

  const isFavorite = favorites.includes(_id);
  const firstSentence = description.split(/[.!?]/)[0] + ".";

  const [isUpdating, setIsUpdating] = useState(false);

  const handleLearnMore = () => {
    navigate(`/recipes/${_id}`);
  };

  const handleToggleFavorite = async () => {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }

    setIsUpdating(true);
    try {
      if (isFavorite) {
        await dispatch(removeFromFavorite({ userId: user._id, recipeId: _id }));
      } else {
        await dispatch(addToFavorite({ userId: user._id, recipeId: _id }));
      }
    } catch (error) {
      console.error("Favorite toggle error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={css.card}>
      <img src={thumb} alt={title} className={css.image} />
      <div className={css.titleRow}>
        <h3 className={css.name}>{title}</h3>
        <div className={css.time}>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 7.61537V12.5481L15.7885 15.2884M19.625 12C19.625 15.935 16.435 19.125 12.5 19.125C8.56497 19.125 5.375 15.935 5.375 12C5.375 8.06497 8.56497 4.875 12.5 4.875C16.435 4.875 19.625 8.06497 19.625 12Z"
              stroke="black"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{time}</span>
        </div>
      </div>
      <div className={css.descrWrapper}>
        <p className={css.descrip}>{firstSentence}</p>
        <p className={css.descrip}>{cals ? `~${cals} cals` : "— cals"}</p>
      </div>
      <div className={css.actions}>
        <Button className={css.LearnMoreBtn} onClick={handleLearnMore}>
          Learn more
        </Button>

        {!isOwnRecipe && (
          <button
            type="button"
            className={`${css.favoriteBtn} ${isFavorite ? css.active : ""}`}
            onClick={handleToggleFavorite}
            disabled={isUpdating}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              width="14"
              height="17"
              viewBox="0 0 14 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.99707 0.5C8.26074 0.500006 9.42058 0.620914 10.3398 0.760742C11.5036 0.937767 12.416 1.7353 12.6758 2.84961C12.9894 4.19485 13.2969 6.24141 13.2441 8.99023C13.1859 12.0233 12.7432 14.2117 12.3164 15.6396C12.201 16.0256 11.9339 16.2243 11.6318 16.2754C11.316 16.3287 10.9263 16.2236 10.6094 15.9082C10.0326 15.334 9.37193 14.7138 8.7627 14.2344C8.45865 13.9951 8.15576 13.7817 7.875 13.626C7.61014 13.4791 7.29955 13.3457 6.99707 13.3457C6.69934 13.3457 6.37833 13.4769 6.09766 13.6211C5.79864 13.7747 5.4675 13.9855 5.12891 14.2246C4.45038 14.7037 3.69895 15.3244 3.03711 15.8994C2.68779 16.2029 2.27644 16.2747 1.95215 16.1865C1.63917 16.1013 1.37522 15.8609 1.29395 15.4424C1.01488 14.0044 0.75 11.8805 0.75 9C0.75 6.12652 1.04615 4.09969 1.34082 2.79492C1.58505 1.71356 2.4671 0.943748 3.60156 0.768555C4.52893 0.625347 5.70912 0.5 6.99707 0.5Z"
                stroke={isFavorite ? "#fff" : "#000000"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
