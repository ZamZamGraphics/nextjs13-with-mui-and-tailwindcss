import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { asyncToggleTheme } from "./themesSlice";

export default function Theme() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 2,
      }}
    >
      <Typography>{darkMode ? "Dark" : "Light"} Mode</Typography>
      <IconButton
        sx={{ ml: 1 }}
        onClick={() => dispatch(asyncToggleTheme())}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
}
