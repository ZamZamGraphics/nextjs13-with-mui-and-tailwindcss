"use client";
import { Backdrop, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { themeSettings } from "./redux/features/theme/theme";
import { useMemo } from "react";
import useAuthCheck from "./hooks/useAuthCheck";

export default function Template({ children }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = useMemo(() => createTheme(themeSettings(darkMode)), [darkMode]);

  const authChecked = useAuthCheck();

  return !authChecked ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    />
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
