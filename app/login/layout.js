"use client";
import PublicRoute from "../components/PublicRoute";
import useAuthCheck from "../hooks/useAuthCheck";
export default function RootLayout({ children }) {
  const authChecked = useAuthCheck();
  return authChecked ? <PublicRoute>{children}</PublicRoute> : "";
}
