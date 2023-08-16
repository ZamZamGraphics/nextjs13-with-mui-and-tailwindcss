"use client";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { redirect, useSearchParams } from "next/navigation";
import Image from "next/image";
import logoDark from "../../public/logo-dark.svg";
import logoLight from "../../public/logo-light.svg";
import { useSelector } from "react-redux";
import { useResetPasswordMutation } from "../redux/features/forgotPassword/forgotPasswordApi";

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [error, setError] = useState("");
  const darkMode = useSelector((state) => state.theme.darkMode);
  const logo = darkMode ? logoLight : logoDark;

  const queryParams = useSearchParams();
  const id = queryParams.get("id");
  const token = queryParams.get("token");
  const queryURL = `token=${token}&id=${id}`;

  const [resetPassword, { data, error: responseError }] =
    useResetPasswordMutation();

  const {
    message,
    isLoading,
    error: sendEmailError,
  } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (responseError?.data) {
      const { errors } = responseError.data;
      setError({ errors: errors.length > 0 ? errors[0] : errors });
    }
    responseError?.error &&
      setError({
        errors: {
          msg: "Network Error",
        },
      });

    if (data) {
      sendEmailError && setError(sendEmailError);
      message && redirect("/login");
    }
  }, [data, responseError, sendEmailError, message]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setError("");
      resetPassword({ password: values, queryURL });
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
            Reset your password
          </Typography>
          {error && (
            <Alert sx={{ mt: 2, width: "100%" }} severity="error">
              {error.errors.msg}
            </Alert>
          )}
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <FormControl fullWidth sx={{ mt: 1 }} variant="standard">
              <InputLabel
                htmlFor="standard-adornment-password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                Password
              </InputLabel>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                id={formik.errors.password && "standard-error"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                id="passowrd-helper-text"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 1 }} variant="standard">
              <InputLabel
                htmlFor="standard-adornment-password"
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
              >
                Confirm Password
              </InputLabel>
              <Input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                id={formik.errors.confirmPassword && "standard-error"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                id="confirm-passowrd-helper-text"
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
              >
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ borderRadius: "9999px", mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Reset Password
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
