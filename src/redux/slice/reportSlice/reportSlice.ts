import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: 0,
      user_id: {
        id: 0,
        name: "",
        email: "",
        role: "",
      },
      quiz_id: {
        id: 0,
        title: "",
        slug: "",
        thumbnail: "",
        description: "",
        time: "",
        retry_after: 0,
        status: 1,
        pass_percentage: 0,
      },
    },
  ],
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [{}],
    path: "",
    per_page: 1,
    to: 1,
    total: 1,
  },
};
const quizCategorySlice = createSlice({
  name: "quizCategorySlice",
  initialState,
  reducers: {
    saveReportList: (state, action: PayloadAction<any>) => {
      state.data = action.payload.data;
    },
    saveReportMeta: (state, action: PayloadAction<any>) => {
      state.meta = action.payload.meta;
    },
  },
});

export default quizCategorySlice.reducer;
export const { saveReportList, saveReportMeta } = quizCategorySlice.actions;
