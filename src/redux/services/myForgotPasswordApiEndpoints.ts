import { TForgotPasswordEmailField } from "../../pages/auth/types";
import { myApi } from "./myApi";

const myForgotPasswordApiEndpoints = myApi.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (body: TForgotPasswordEmailField) => ({
        url: "/forgot-password",
        method: "post",
        body,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation } = myForgotPasswordApiEndpoints;
