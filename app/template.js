"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { themeSettings } from "./redux/features/theme/theme";
import { useMemo } from "react";

export default function Template({ children }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = useMemo(() => createTheme(themeSettings(darkMode)), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
