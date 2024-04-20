import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TQuestionType } from "../../../pages/admin/types";
import { TCommonMetaType } from "../../../pages/admin/types/TCommonTypes";

const initialState = {
  data: [
    {
      id: 0,
      title: "",
      options: [""],
      weightage: 0,
      status: 0,
      description: "",
      slug: "",
      answer: "",
      category: { id: 0, title: "" },
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
const questionListSlice = createSlice({
  name: "questionListSlice",
  initialState,
  reducers: {
    saveQuestionList: (state, action: PayloadAction<TQuestionType[]>) => {
      state.data = action.payload;
    },
    saveQuestionsMetaData: (state, action: PayloadAction<TCommonMetaType>) => {
      state.meta = action.payload;
    },
  },
});

export default questionListSlice.reducer;
export const { saveQuestionList, saveQuestionsMetaData } =
  questionListSlice.actions;
