import { grey, blueGrey } from "@mui/material/colors";

export const themeSettings = (mode) => ({
  palette: {
    mode: mode ? "dark" : "light",
    bodybg: mode ? blueGrey[900] : grey[100],
  },
});
