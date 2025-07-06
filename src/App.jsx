import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader.jsx";
import Layout from "./components/Layout/Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations.js";
import { selectIsRefreshing } from "./redux/auth/selectors.js";
import RestrictedRoute from "./RestrictedRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage.jsx")
);
const AddrecipePage = lazy(() =>
  import("./pages/AddRecipePage/AddRecipePage.jsx")
);
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage.jsx"));
const OwnRecipes = lazy(() => import("./components/OwnRecipes/OwnRecipes.jsx"));
const SavedRecipes = lazy(() =>
  import("./components/SavedRecipes/SavedRecipes.jsx")
);
const RecipeViewPage = lazy(() =>
  import("./pages/RecipeViewPage/RecipeViewPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <strong>Getting user data please wait...</strong>
  ) : (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/api/auth/login"
            element={
              <RestrictedRoute component={<LoginPage />} redirectTo="/" />
            }
          />
          <Route
            path="/api/auth/register"
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo="/"
              />
            }
          />
          <Route
            path="/api/add-recipe"
            element={
              <PrivateRoute
                component={<AddrecipePage />}
                redirectTo="/api/auth/login"
              />
            }
          />
          <Route
            path="/api/user/current"
            element={
              <PrivateRoute
                component={<ProfilePage />}
                redirectTo="/api/auth/login"
              />
            }
          />
          <Route path="/api/recipes/:recipeId" element={<RecipeViewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
