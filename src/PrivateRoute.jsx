import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./redux/auth/selectors";

export default function PrivateRoute({ component, redirectTo = "/" }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  return isLoggedIn ? (
    component
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
}
