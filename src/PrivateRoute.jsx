import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from './redux/auth/selectors.js';
import Loader from './components/Loader/Loader.jsx';

export default function PrivateRoute({ component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const location = useLocation();

  if (isRefreshing) {
    return <Loader />;
  }

  return isLoggedIn ? (
    component
  ) : (
    <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
  );
}
