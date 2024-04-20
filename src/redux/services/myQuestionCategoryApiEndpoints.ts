import {
  TFetchQuestionCategoryQueryTransformReturnType,
  TFetchQuestionCategoryType,
  TAddQuestionCategoryFieldType,
  TQuestionCategoryListFetchAllType,
  TEditQuestionCategoryFieldType,
} from "../../pages/admin/types";
import { TSearchParams } from "../../pages/admin/types/TCommonTypes";
import { myApi } from "./myApi";

const myQuestionCategoryApiEndpoints = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestionCategories: builder.query<any[], void>({
      query: () => "/admin/question-categories/all",
      transformResponse: (response: TQuestionCategoryListFetchAllType) => {
        return [
          ...response.data.map((category) => ({
            value: category.id,
            label: category.title,
          })),
        ];
      },
    }),

    getQuestionCategories: builder.query<
      TFetchQuestionCategoryQueryTransformReturnType,
      TSearchParams
    >({
      query: ({ page, title }) => {
        let query = `/admin/question-categories?page=${page}`;
        if (title) {
          query += `&title=${title}`;
        }
        return query;
      },
      providesTags: ["FetchQuizCategories"],
      transformResponse: (response: TFetchQuestionCategoryType) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    getSingleQuestionCategory: builder.query<any, string>({
      query: (id) => `/admin/question-categories/${id}`,
      transformResponse: (response: any) => {
        return {
          ...response.data,
        };
      },
    }),

    addQuestionCategory: builder.mutation<
      TAddQuestionCategoryFieldType,
      TAddQuestionCategoryFieldType
    >({
      query: (body: TAddQuestionCategoryFieldType) => ({
        url: "/admin/question-categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FetchQuizCategories"],
    }),

    editQuestionCategory: builder.mutation<
      TEditQuestionCategoryFieldType,
      TEditQuestionCategoryFieldType
    >({
      query: ({ id, ...rest }) => ({
        url: `/admin/question-categories/${id}`,
        method: "PUT",
        body: { ...rest },
      }),
      invalidatesTags: ["FetchQuizCategories"],
    }),

    deleteQuestionCategory: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `/admin/question-categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["FetchQuizCategories"],
    }),
  }),
});

export const {
  useGetQuestionCategoriesQuery,
  useAddQuestionCategoryMutation,
  useDeleteQuestionCategoryMutation,
  useGetAllQuestionCategoriesQuery,
  useEditQuestionCategoryMutation,
  useGetSingleQuestionCategoryQuery,
} = myQuestionCategoryApiEndpoints;
