import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn, userLoggedOut } from "../redux/features/auth/authSlice";

export default function AuthCheck({ children }) {
  const [cookies] = useCookies();
  const dispatch = useDispatch();

  const accessToken = cookies?.accessToken;
  const loggedIn = cookies?.loggedIn;

  useEffect(() => {
    if (accessToken && loggedIn) {
      dispatch(
        userLoggedIn({
          accessToken: `Bearer ${accessToken}`,
        })
      );
    }
  }, [dispatch, accessToken, loggedIn]);

  return children;
}
