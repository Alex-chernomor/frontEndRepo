import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

export default function AppBar({ className }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={className}>{isLoggedIn ? <UserMenu /> : <AuthNav />}</div>
  );
}
