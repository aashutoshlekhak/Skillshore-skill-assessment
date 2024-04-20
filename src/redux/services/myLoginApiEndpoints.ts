import { myApi } from "./myApi";
import { TLoginResponseSuccess, TLoginField } from "../../pages/auth/types";
const myLoginApiEndpoints = myApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<TLoginResponseSuccess, TLoginField>({
      query: (body: TLoginField) => ({
        url: `/login`,
        method: "post",
        body,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useLoginUserMutation } = myLoginApiEndpoints;
