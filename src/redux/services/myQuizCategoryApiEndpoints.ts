import {
  TAddQuizCategoryFieldType,
  TEditQuizCategoryFieldType,
  TFetchQuizCategoriesQueryTransformReturnType,
  TFetchQuizCategoriesType,
  TQuizCategoryFetchAllType,
  TQuizCategoryListFetchAllType,
} from "../../pages/admin/types";
import { TSearchParams } from "../../pages/admin/types/TCommonTypes";
import { myApi } from "./myApi";

const myQuizCategoryApiEndpoints = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizCategories: builder.query<TQuizCategoryFetchAllType[], void>({
      query: () => "/admin/quiz-categories/all",
      providesTags: ["FetchQuizCategories"],
      transformResponse: (response: TQuizCategoryListFetchAllType) => {
        return [...response.data];
      },
    }),

    getQuizCategories: builder.query<
      TFetchQuizCategoriesQueryTransformReturnType,
      TSearchParams
    >({
      query: ({ page, title }) => {
        let query = `/admin/quiz-categories?page=${page}`;
        if (title) {
          query += `&title=${title}`;
        }
        return query;
      },
      providesTags: ["FetchQuizCategories"],
      transformResponse: (response: TFetchQuizCategoriesType) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    getSingleQuizCategory: builder.query<any, string>({
      query: (id) => `/admin/quiz-categories/${id}`,
      transformResponse: (response: any) => {
        return {
          ...response.data,
        };
      },
    }),

    addQuizCategory: builder.mutation<
      TAddQuizCategoryFieldType,
      TAddQuizCategoryFieldType
    >({
      query: (body: TAddQuizCategoryFieldType) => ({
        url: "/admin/quiz-categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FetchQuizCategories"],
    }),

    editQuizCategory: builder.mutation<
      TEditQuizCategoryFieldType,
      TEditQuizCategoryFieldType
    >({
      query: ({ id, ...rest }) => ({
        url: `/admin/quiz-categories/${id}`,
        method: "PUT",
        body: { ...rest },
      }),
      invalidatesTags: ["FetchQuizCategories"],
    }),

    deleteQuizCategory: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `/admin/quiz-categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["FetchQuizCategories"],
    }),
  }),
});

export const {
  useAddQuizCategoryMutation,
  useDeleteQuizCategoryMutation,
  useEditQuizCategoryMutation,
  useGetAllQuizCategoriesQuery,
  useGetQuizCategoriesQuery,
  useGetSingleQuizCategoryQuery,
} = myQuizCategoryApiEndpoints;
