import { TQuizOptions } from "../../pages/student/types";
import { myApi } from "./myApi";

const myQuizOptionEndpoints = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuizOptions: builder.query<TQuizOptions[], number>({
      query: (quizId) => ({
        url: `/student/quizzes/${quizId}/start`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    postQuizData: builder.mutation({
      query: (quizData) => ({
        url: `/student/quizzes/${quizData.quiz_id}/submit`,
        method: "POST",
        body: quizData,
      }),
      invalidatesTags: ["RefetchQuizzes"],
    }),
  }),
});

export const { useGetQuizOptionsQuery, usePostQuizDataMutation } =
  myQuizOptionEndpoints;
