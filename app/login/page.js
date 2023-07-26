"use client";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "Username is required",
    password: "Password is required",
    common: "Somthing Wrong!",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:text-slate-400 dark:bg-slate-900">
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            padding: 4,
            backgroundColor: "background.default",
            borderRadius: "10px",
            boxShadow: 2,
          }}
        >
          <Typography component="h5" sx={{ textAlign: "center" }} variant="h5">
            Sign in
          </Typography>
          {error.common && (
            <Alert sx={{ mt: 2, width: "100%" }} severity="error">
              {error.common}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              variant="standard"
              label="Username or Email Address"
              name="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              error={error.username && true}
              id={error.username && "standard-error"}
              helperText={error.username}
            />
            <FormControl fullWidth sx={{ mt: 1 }} variant="standard">
              <InputLabel
                htmlFor="standard-adornment-password"
                error={error.password && true}
              >
                Password
              </InputLabel>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                error={error.password && true}
                id={error.password && "standard-error"}
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
                error={error.password && true}
              >
                {error.password}
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ borderRadius: "9999px", mt: 3, mb: 2 }}
              disabled={loading}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}