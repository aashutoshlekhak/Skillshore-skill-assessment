import { convertPayloadToFormData } from "../../helpers";
import {
  TFetchQuizzesQueryTransformReturnType,
  TFetchQuizzesType,
  TAddQuizFieldType,
  TEditQuizFieldType,
  TSingleQuizType,
  TSingleQuizTransformResponseType,
  TQuestionCategoryObjType,
} from "../../pages/admin/types";
import { TSearchParams } from "../../pages/admin/types/TCommonTypes";
import { myApi } from "./myApi";

const myQuizApiEndpoints = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query<
      TFetchQuizzesQueryTransformReturnType,
      TSearchParams
    >({
      query: ({ page, title }) => {
        let query = `/admin/quizzes?page=${page}`;
        if (title) {
          query += `&title=${title}`;
        }
        return query;
      },
      providesTags: ["FetchQuizzes"],
      transformResponse: (response: TFetchQuizzesType) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    getSingleQuiz: builder.query<TSingleQuizTransformResponseType, string>({
      query: (id) => `/admin/quizzes/${id}`,
      transformResponse: (response: TSingleQuizType) => {
        return {
          ...response.data,
          thumbnail: "",
          thumbnail_url: response.data.thumbnail,
          category_id: response.data.category ? response.data.category.id : 0,
          question_categories: response.data.question_categories.map(
            (category: TQuestionCategoryObjType) => {
              return category.id;
            }
          ),
          question_categories_obj: response.data.question_categories.map(
            (category: TQuestionCategoryObjType) => ({
              value: category.id,
              label: category.title,
            })
          ),
        };
      },
    }),

    addQuiz: builder.mutation<TAddQuizFieldType, TAddQuizFieldType>({
      query: (payload: TAddQuizFieldType) => {
        const formData = convertPayloadToFormData(payload);
        return {
          url: "/admin/quizzes",
          method: "POST",
          body: formData,
          headers: {
            "X-Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["FetchQuizzes"],
    }),

    editQuiz: builder.mutation<TEditQuizFieldType, TEditQuizFieldType>({
      query: ({ id, ...rest }) => {
        const formData = convertPayloadToFormData(rest);

        formData.append("_method", "PUT");
        return {
          url: `/admin/quizzes/${id}`,
          method: "POST",
          body: formData,
          headers: {
            "X-Content-Type": "multipart/form-data",
          },

          invalidatesTags: ["FetchQuizzes"],
        };
      },
    }),

    deleteQuiz: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `/admin/quizzes/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["FetchQuizzes"],
    }),
  }),
});

export const {
  useEditQuizMutation,
  useGetQuizzesQuery,
  useGetSingleQuizQuery,
  useAddQuizMutation,
  useDeleteQuizMutation,
} = myQuizApiEndpoints;
