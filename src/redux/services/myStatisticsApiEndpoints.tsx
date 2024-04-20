import { myApi } from "./myApi";

export const myStatisticsApiEndpoints = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query<any, void>({
      query: () => ({
        url: `/admin/statistics`,
      }),
    }),
  }),
});

export const { useGetStatisticsQuery } = myStatisticsApiEndpoints;
