import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

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

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
