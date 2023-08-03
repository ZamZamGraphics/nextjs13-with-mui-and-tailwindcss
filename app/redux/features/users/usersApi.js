import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "/users/profile",
    }),
  }),
});

export const { useGetUserProfileQuery } = usersApi;
