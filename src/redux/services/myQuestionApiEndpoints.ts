import {
  TAddQuestionFieldType,
  TFetchQuestionsQueryTransformReturnType,
  TFetchQuestionsType,
  TEditQuestionFieldType,
} from "../../pages/admin/types";
import { TSearchParams } from "../../pages/admin/types/TCommonTypes";
import { myApi } from "./myApi";

const myQuestionApiEndpoints = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<
      TFetchQuestionsQueryTransformReturnType,
      TSearchParams
    >({
      query: ({ page, title }) => {
        let query = `/admin/questions?page=${page}`;
        if (title) {
          query += `&title=${title}`;
        }
        return query;
      },
      providesTags: ["FetchQuizzes"],
      transformResponse: (response: TFetchQuestionsType) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    getSingleQuestion: builder.query<TEditQuestionFieldType, string>({
      query: (id) => `/admin/questions/${id}`,
      transformResponse: (response: any) => {
        return {
          ...response.data,
          category_id: response.data.category ? response.data.category.id : 0,
        };
      },
    }),

    addQuestion: builder.mutation<TAddQuestionFieldType, TAddQuestionFieldType>(
      {
        query: (body: TAddQuestionFieldType) => ({
          url: "/admin/questions",
          method: "POST",
          body,
        }),
        invalidatesTags: ["FetchQuizzes"],
      }
    ),

    editQuestion: builder.mutation<
      TEditQuestionFieldType,
      TEditQuestionFieldType
    >({
      query: ({ id, ...rest }) => ({
        url: `/admin/questions/${id}`,
        method: "PUT",
        body: { ...rest },
      }),
      invalidatesTags: ["FetchQuizzes"],
    }),

    deleteQuestion: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `/admin/questions/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["FetchQuizzes"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useEditQuestionMutation,
  useGetSingleQuestionQuery,
} = myQuestionApiEndpoints;
