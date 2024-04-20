import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../configs";
import { RootState } from "../store";

type CustomErrorMessage = {
  data: {
    errors: [];
    message: string;
  };
};

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.data.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    if (!headers.has("X-Content-Type")) {
      headers.set("Content-type", "application/json");
    }

    headers.set("Accept", "application/json");
    return headers;
  },
});
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: baseQueryWithRetry as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomErrorMessage
  >,
  tagTypes: [
    "users",
    "FetchQuizCategories",
    "FetchQuizzes",
    "FetchQuestionCategories",
    "FetchQuestions",
    "RefetchQuizzes",
  ],
  keepUnusedDataFor: 0,
  endpoints: () => ({}),
});
