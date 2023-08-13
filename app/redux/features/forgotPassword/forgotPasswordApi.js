import { apiSlice } from "../api/apiSlice";
import axios from "../../../util/axios";
import { sendEmail } from "./forgotPasswordSlice";

export const sendPasswordResetEmail = async (userData) => {
  try {
    const response = axios.post("/send", userData);
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
            email: arg.email,
          };
          dispatch(sendEmail(data));
        } catch (err) {
          // do nothing
        }
      },
      // end
    }),
  }),
});

export const { useForgotPasswordMutation } = forgotPasswordApi;
