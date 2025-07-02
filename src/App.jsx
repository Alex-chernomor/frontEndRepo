import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage.jsx';
import AddrecipePage from './pages/AddRecipePage/AddRecipePage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import RecipeViewPage from './pages/RecipeViewPage/RecipeViewPage.jsx';

import Header from './sections/Header/Header';
// import ModalWindow from "./components/ModalWindow/ModalWindow";
import SearchBox from './components/SearchBox/SearchBox.jsx';
import MainTitle from './components/MainTitle/MainTitle.jsx';
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/api/auth/login" element={<LoginPage />} />
        <Route path="/api/auth/register" element={<RegistrationPage />} />
        <Route path="/api/auth/add-recipe" element={<AddrecipePage />} />
        <Route path="/api/auth/user/current" element={<ProfilePage />} />
        <Route path="/api/auth/recipe/:recipeId" element={<RecipeViewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Header />
      {/* <ModalWindow /> */}
      {/* <MainTitle />
      <SearchBox onSearch={handleSearch} /> */}
    </div>
  );
}
