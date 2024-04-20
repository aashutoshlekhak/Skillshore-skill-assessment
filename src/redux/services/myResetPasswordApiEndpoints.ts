import { TResetPassword } from "../../pages/auth/types";
import { myApi } from "./myApi";

const myResetPasswordApiEndpoints = myApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: (body: TResetPassword) => ({
        url: "/reset-password",
        method: "post",
        body,
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = myResetPasswordApiEndpoints;
