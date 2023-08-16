import { apiSlice } from "../api/apiSlice";
import axios from "../../../util/axios";
import {
  sendEmail,
  removeMessage,
  sendResetSuccessEmail,
} from "./forgotPasswordSlice";

export const sendPasswordResetEmail = async (userData) => {
  try {
    const response = axios.post("/send-reset-email", userData);
    return response;
  } catch (err) {
    return err;
  }
};

export const sendResetSuccess = async (data) => {
  try {
    const response = axios.post("/send-reset-success", data);
    return response;
  } catch (err) {
    return err;
  }
};

export const forgotPasswordApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: email,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          const subject = "Reset your Password";
          const data = {
            ...result.data,
            subject: subject,
          };
          dispatch(sendEmail(data));
        } catch (err) {
          // do nothing
        }
      },
    }),
    resetPassword: builder.mutation({
      query: ({ password, queryURL }) => ({
        url: `/users/reset?${queryURL}`,
        method: "POST",
        body: password,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(removeMessage());
          const result = await queryFulfilled;

          const subject = "Password has been successfully changed";
          const data = {
            ...result.data,
            subject: subject,
          };
          dispatch(sendResetSuccessEmail(data));
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } =
  forgotPasswordApi;
