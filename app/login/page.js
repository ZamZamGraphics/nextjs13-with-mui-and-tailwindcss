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
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeSwitch from "../redux/features/theme/ThemeSwitch";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { redirect } from "next/navigation";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (responseError?.error) {
      setError({
        errors: {
          msg: "Network Error",
        },
      });
    }
    if (data?.success) {
      redirect("/dashboard");
    }
  }, [data, responseError]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setError("");
      login(values);
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
          <ThemeSwitch />
          <Typography
            className="text-blue-500"
            component="h5"
            sx={{ textAlign: "center" }}
            variant="h5"
          >
            Sign in
          </Typography>

          {error && (
            <Alert sx={{ mt: 2, width: "100%" }} severity="error">
              {error.errors.msg}
            </Alert>
          )}

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              // required
              fullWidth
              variant="standard"
              label="Username or Email Address"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              id={formik.errors.username && "standard-error"}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ borderRadius: "9999px", mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>
          </Box>
          <Link
            href="/dashboard"
            className="text-blue-500 no-underline text-center"
          >
            <Typography variant="body2">Dashboard</Typography>
          </Link>
        </Box>
      </Container>
    </Grid>
  );
}
