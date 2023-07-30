"use client";
import { redirect } from "next/navigation";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const isLoggedIn = useAuth();

  return isLoggedIn ? children : redirect("/login");
}
