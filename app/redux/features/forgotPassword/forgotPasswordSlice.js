import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendPasswordResetEmail, sendResetSuccess } from "./forgotPasswordApi";

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
      if (response.data.data.success) {
        const data = JSON.parse(response.config.data);
        return data.msg;
      }
    } catch (err) {
      if (err.response.status === 404) {
        return rejectWithValue({
          errors: {
            msg: "Internal Server Error",
          },
        });
      }
      return rejectWithValue({ errors: { msg: err.response.data.error } });
    }
  }
);

export const sendResetSuccessEmail = createAsyncThunk(
  "forgotPassword/sendResetSuccessEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await sendResetSuccess(data);
      if (response.data.data.success) {
        const data = JSON.parse(response.config.data);
        return data.msg;
      }
    } catch (err) {
      if (err.response.status === 404) {
        return rejectWithValue({
          errors: {
            msg: "Internal Server Error",
          },
        });
      }
      return rejectWithValue({ errors: { msg: err.response.data.error } });
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    removeMessage: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
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
      })
      .addCase(sendResetSuccessEmail.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(sendResetSuccessEmail.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(sendResetSuccessEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { removeMessage } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
