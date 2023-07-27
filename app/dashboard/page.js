"use client";
import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { Counter } from "../redux/features/counter/Counter";

export default function Home() {
  return (
    <Grid
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <h1 className="text-blue-500">Dashboard Home Page</h1>
      <Counter />
      <Link href="/login">
        <Button variant="contained" color="success">
          Login
        </Button>
      </Link>
    </Grid>
  );
}
