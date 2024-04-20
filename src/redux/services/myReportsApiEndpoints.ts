import { myApi } from "./myApi";

const myReportsApiEndpoints = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getReport: builder.query<any, any>({
      query: ({ page, searchTerm }) => {
        let query = `/admin/results?page=${page}`;
        if (searchTerm) {
          query += `&user=${searchTerm}`;
        }
        return query;
      },
      transformResponse: (response: any) => {
        return { data: response.data, meta: response.meta };
      },
    }),
  }),
});

export const { useGetReportQuery } = myReportsApiEndpoints;
