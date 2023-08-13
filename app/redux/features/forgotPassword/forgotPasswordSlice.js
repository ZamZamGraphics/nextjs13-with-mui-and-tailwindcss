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
  "forgotPassword/sendEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await sendPasswordResetEmail(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
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
        state.error = action.payload;
      });
  },
});

export default forgotPasswordSlice.reducer;
