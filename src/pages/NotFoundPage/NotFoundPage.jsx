import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function NotFoundPage() {
  useEffect(() => {
    toast.error("Recipe not found. Please try again.", {
      duration: 3000,
    });
  }, []);
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Recipe Not Found</h2>
      <p className={css.text}>
        The recipe may have been deleted or never existed.
      </p>
      <Link to="/" className={css.homeLink}>
        Go Back to Home
      </Link>
    </div>
  );
}
