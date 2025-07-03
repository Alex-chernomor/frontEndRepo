import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

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
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/api/auth/login" element={<LoginPage />} />
        <Route path="/api/auth/register" element={<RegistrationPage />} />
        <Route path="/api/add-recipe" element={<AddrecipePage />} />
        <Route path="/api/user/current" element={<ProfilePage />} />
        <Route path="/api/recipe/:recipeId" element={<RecipeViewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

// burder-menu-pages

import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./sections/Header/Header";
import { Hero } from "./components/Hero/Hero";
// import ModalWindow from "./components/ModalWindow/ModalWindow";

import HomePage from "./pages/HomePage/HomePage";
import RecipeViewPage from "./pages/RecipeViewPage/RecipeViewPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";

export default function App() {
  return (
    <div>
      {/* <Header /> */}
      <Hero />
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes/:id" element={<RecipeViewPage />} />
        <Route path="/profile/:recipeType" element={<ProfilePage />} />
        <Route path="/auth/register" element={<RegistrationPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <ModalWindow /> */}
    </>
  );
}


// burder-menu-pages