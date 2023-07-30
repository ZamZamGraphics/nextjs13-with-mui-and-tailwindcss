"use client";
import PrivateRoute from "../components/PrivateRoute";
import useAuthCheck from "../hooks/useAuthCheck";
export default function RootLayout({ children }) {
  const authChecked = useAuthCheck();
  return authChecked ? <PrivateRoute>{children}</PrivateRoute> : "";
}
