import { apiSlice } from "../api/apiSlice";
import axios from "../../../util/axios";
import { sendEmail } from "./forgotPasswordSlice";

export const sendPasswordResetEmail = async (userData) => {
  const response = await axios.post("/send", userData);
  const { data } = response.data;

  if (!data.success) {
    return data.error;
  }
  return response.data;
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
          console.log(err);
        }
      },
      // end
    }),
  }),
});

export const { useForgotPasswordMutation } = forgotPasswordApi;
