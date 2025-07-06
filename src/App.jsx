import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Loader from "./components/Loader/Loader.jsx";
import Layout from "./components/Layout/Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations.js";
import { selectIsRefreshing } from "./redux/auth/selectors.js";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage.jsx")
);
const AddrecipePage = lazy(() =>
  import("./pages/AddRecipePage/AddRecipePage.jsx")
);
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage.jsx"));
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
          <Route path="/api/auth/login" element={<LoginPage />} />
          <Route path="/api/auth/register" element={<RegistrationPage />} />
          <Route path="/api/add-recipe" element={<AddrecipePage />} />
          <Route path="/api/user/current" element={<ProfilePage />} />
          <Route path="/api/recipes/:recipeId" element={<RecipeViewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>

    //     <>
    //       <Layout>
    //         <Suspense fallback={<Loader />}>
    //           <Routes>
    //             <Route path="/" element={<HomePage />} />
    //             <Route path="/api/auth/login" element={<LoginPage />} />
    //             <Route path="/api/auth/register" element={<RegistrationPage />} />
    //             <Route path="/api/add-recipe" element={<AddrecipePage />} />
    //             <Route path="/api/user/current" element={<ProfilePage />} />
    //             <Route path="/api/recipes/:recipeId" element={<RecipeViewPage />} />
    //             <Route path="*" element={<NotFoundPage />} />
    //           </Routes>
    //         </Suspense>
    //       </Layout>

    //       <Toaster position="top-center" reverseOrder={false} />
    //     </>
  );
}
