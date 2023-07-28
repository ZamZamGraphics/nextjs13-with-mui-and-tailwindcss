"use client";
import { Button, Grid } from "@mui/material";
import Link from "next/link";

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
      <Link href="/login">
        <Button variant="contained" color="success">
          Login
        </Button>
      </Link>
    </Grid>
  );
}
