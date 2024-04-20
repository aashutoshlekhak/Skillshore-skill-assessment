import { TRegistrationFormType } from "../../pages/auth/types";
import { myApi } from "./myApi";

const myRegistrationApiEndpoints = myApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body: TRegistrationFormType) => ({
        url: "/register",
        method: "post",
        body,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = myRegistrationApiEndpoints;
