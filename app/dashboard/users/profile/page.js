"use client";
import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { useGetUserProfileQuery } from "../../../redux/features/users/usersApi";

export default function Home() {
  const { data, isLoading, isError, error } = useGetUserProfileQuery();

  console.log(data, isLoading, isError, error);

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
      <h1 className="text-blue-500">Profile Page</h1>
      <Link href="/dashboard">
        <Button variant="contained" color="success">
          Dashboard
        </Button>
      </Link>
    </Grid>
  );
}
