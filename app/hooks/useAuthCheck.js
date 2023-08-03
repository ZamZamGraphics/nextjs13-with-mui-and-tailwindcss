import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/features/auth/authSlice";
import { useState } from "react";

export default function useAuthCheck() {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

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
    setAuthChecked(true);
  }, [dispatch, accessToken, loggedIn]);

  return authChecked;
}
