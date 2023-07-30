"use client";
import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../redux/features/auth/authSlice";

export default function Home() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
  };

  return (
    <Grid
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Link href="/login">
        <Button variant="contained" color="success">
          Login
        </Button>
      </Link>
      <h1 className="text-blue-500">Dashboard Home Page</h1>
      <Button variant="contained" color="warning" onClick={logout}>
        Logout
      </Button>
    </Grid>
  );
}
