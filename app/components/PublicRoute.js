"use client";
// import { redirect } from "next/navigation";
// import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
  // const isLoggedIn = useAuth();
  // return !isLoggedIn ? children : redirect("/dashboard");
  return children;
}
