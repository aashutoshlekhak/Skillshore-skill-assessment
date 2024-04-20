import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFetchQuizQueryTransformResponseType } from "../../../pages/admin/types";

const initialState = {
  data: [
    {
      id: 0,
      title: "",
      slug: "",
      description: "",
      thumbnail: "",
      time: 0,
      retry_after: 0,
      status: 1,
      result: "",
      categories: "",
      category: "",
    },
  ],
  meta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    links: [{ url: "", label: "", active: true }],
    path: "",
    per_page: 0,
    to: 0,
    total: 0,
  },
};
const allQuizListSlice = createSlice({
  name: "allQuizListSlice",
  initialState,
  reducers: {
    saveAllQuizList: (
      state,
      action: PayloadAction<TFetchQuizQueryTransformResponseType>
    ) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    },
  },
});

export default allQuizListSlice.reducer;
export const { saveAllQuizList } = allQuizListSlice.actions;
