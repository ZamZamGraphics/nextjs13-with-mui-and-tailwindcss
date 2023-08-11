import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themesSlice";
import counterReducer from "../features/counter/counterSlice";
import forgotPasswordReducer from "../features/forgotPassword/forgotPasswordSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    forgotPassword: forgotPasswordReducer,
    theme: themeReducer,
    counter: counterReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
