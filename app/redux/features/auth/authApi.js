import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";
import axios from "../../../util/axios";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),

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
          const res = await axios.post("/send", data);
          const responseData = await res.data;
          console.log(responseData);
          // return responseData;
        } catch (err) {
          // do nothing
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useForgotPasswordMutation } = authApi;
