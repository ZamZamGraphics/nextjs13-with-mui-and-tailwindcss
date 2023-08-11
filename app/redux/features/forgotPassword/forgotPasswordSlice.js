import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendPasswordResetEmail } from "./forgotPasswordApi";

const initialState = {
  message: "",
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk
export const sendEmail = createAsyncThunk(
  "forgot-password/send-email",
  async (data) => {
    const response = await sendPasswordResetEmail(data);
    return response;
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgot-password",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default forgotPasswordSlice.reducer;
