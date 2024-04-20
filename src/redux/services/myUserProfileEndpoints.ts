import { TUserDataTransformed, TUserProfile } from "../../pages/student/types";
import { myApi } from "./myApi";

export const apiSlice = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation<TUserDataTransformed, void>({
      query: () => ({
        url: `/user`,
      }),
      transformResponse: (response: TUserProfile) => {
        return { data: response.data, profile: response.data.profile };
      },
    }),

    updateUserProfile: builder.mutation({
      query: ({ id, ...updatedUserData }) => ({
        url: `/student/profile/${id}`,
        method: "PUT",
        body: updatedUserData,
      }),
    }),

    createProfile: builder.mutation({
      query: (newProfileData) => ({
        url: `/student/profile`,
        method: "POST",
        body: newProfileData,
      }),
    }),
  }),
});

export const {
  useGetUserMutation,
  useUpdateUserProfileMutation,
  useCreateProfileMutation,
} = apiSlice;
