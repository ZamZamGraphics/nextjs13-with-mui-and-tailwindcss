"use client";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "../redux/features/forgotPassword/forgotPasswordApi";
import { redirect } from "next/navigation";
import Image from "next/image";
import logoDark from "../../public/logo-dark.svg";
import logoLight from "../../public/logo-light.svg";
import { useSelector } from "react-redux";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("User Email is required")
    .email("must be a valid email"),
});

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const darkMode = useSelector((state) => state.theme.darkMode);
  const logo = darkMode ? logoLight : logoDark;

  const [forgotPassword, { data, isLoading: loading, error: responseError }] =
    useForgotPasswordMutation();

  {
    data && console.log(`from Mutation Data: ${JSON.stringify(data)}`);
    responseError &&
      console.log(`from Mutation Error: ${JSON.stringify(responseError)}`);
  }

  const {
    message,
    isLoading,
    isError,
    error: sendEmailError,
  } = useSelector((state) => state.forgotPassword);
  {
    message &&
      console.log(`from Send Email message: ${JSON.stringify(message)}`);
    sendEmailError &&
      console.log(`from Send Email Error: ${JSON.stringify(sendEmailError)}`);
  }

  // useEffect(() => {
  //   // if (responseError?.data) {
  //   //   setError(responseError.data);
  //   // }
  //   if (responseError?.error) {
  //     setError({
  //       errors: {
  //         msg: "Network Error",
  //       },
  //     });
  //   }
  //   if (data) {
  //     // redirect("/login");
  //   }
  // }, [data, responseError]);

  // if (!isLoading && isError)
  //   setError({
  //     errors: {
  //       msg: sendEmailError,
  //     },
  //   });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setError("");
      forgotPassword(values);
    },
  });

  return (
    <Grid
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
      bgcolor="bodybg"
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            padding: 4,
            backgroundColor: "background.default",
            borderRadius: "10px",
            boxShadow: 2,
          }}
        >
          <Box display="flex" justifyContent="center" mb={2}>
            <Image
              src={logo}
              width={300}
              height={0}
              sizes="100vw"
              alt="AL MADINA IT"
            />
          </Box>
          <Typography
            className="text-blue-500"
            component="h5"
            sx={{ textAlign: "center" }}
            variant="h5"
          >
            Recover your password
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", marginTop: "20px" }}
          >
            <strong>Enter the email</strong> that you used when register to
            recover your password. You will receive a{" "}
            <strong>password reset link.</strong>
          </Typography>

          {/* {error && (
            <Alert sx={{ mt: 2, width: "100%" }} severity="error">
              {error.errors.msg}
            </Alert>
          )} */}

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              // required
              fullWidth
              variant="standard"
              label="User Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              id={formik.errors.email && "standard-error"}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ borderRadius: "9999px", mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Send link
            </Button>
          </Box>
          <Link
            href="/login"
            className="text-blue-500 no-underline text-center"
          >
            <Typography variant="body1">Login</Typography>
          </Link>
        </Box>
      </Container>
    </Grid>
  );
}
