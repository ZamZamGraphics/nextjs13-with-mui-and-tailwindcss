import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themesSlice";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    counter: counterReducer,
  },
});
