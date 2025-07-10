import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader.jsx';
import Layout from './components/Layout/Layout.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/operations.js';
import { selectIsRefreshing, selectToken } from './redux/auth/selectors.js';
import RestrictedRoute from './RestrictedRoute.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.jsx'));
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage.jsx')
);
const AddrecipePage = lazy(() =>
  import('./pages/AddRecipePage/AddRecipePage.jsx')
);
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage.jsx'));
const OwnRecipes = lazy(() => import('./components/OwnRecipes/OwnRecipes.jsx'));
const SavedRecipes = lazy(() =>
  import('./components/SavedRecipes/SavedRecipes.jsx')
);
const RecipeViewPage = lazy(() =>
  import('./pages/RecipeViewPage/RecipeViewPage.jsx')
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage/NotFoundPage.jsx')
);

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  return isRefreshing ? (
    <strong>Getting user data please wait...</strong>
  ) : (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/api/auth/login"
            element={<RestrictedRoute component={<LoginPage />} />}
          />

          <Route
            path="/api/auth/register"
            element={<RestrictedRoute component={<RegistrationPage />} />}
          />
          <Route
            path="/api/add-recipe"
            element={<PrivateRoute component={<AddrecipePage />} />}
          />
          <Route
            path="/api/users/current"
            element={<PrivateRoute component={<ProfilePage />} />}
          >
            <Route index element={<Navigate to="own" replace />} />
            <Route path="own" element={<OwnRecipes />} />
            <Route path="favorites" element={<SavedRecipes />} />
          </Route>

          <Route path="/api/recipes/:recipeId" element={<RecipeViewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  );
}
