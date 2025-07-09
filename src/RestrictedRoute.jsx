import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from './redux/auth/selectors.js';
import Loader from './components/Loader/Loader.jsx';

export default function RestrictedRoute({ component, redirectTo = '/' }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const location = useLocation();

  if (isRefreshing) {
    return <Loader />;
  }

  const redirectPath = location.state?.from || redirectTo;
  return isLoggedIn ? <Navigate to={redirectPath} replace /> : component;
}
