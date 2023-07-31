"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("loggedIn");

    if (localAuth) {
      // accessToken from cookie
      const auth = JSON.parse(localAuth);

      if (auth?.accessToken) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}