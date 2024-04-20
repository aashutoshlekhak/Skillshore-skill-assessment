import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCommonMetaType } from "../../../pages/admin/types/TCommonTypes";

const initialState = {
  data: [],
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
const quizListSlice = createSlice({
  name: "quizListSlice",
  initialState,
  reducers: {
    saveQuizList: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    saveQuizMetaData: (state, action: PayloadAction<TCommonMetaType>) => {
      state.meta = action.payload;
    },
  },
});

export default quizListSlice.reducer;
export const { saveQuizList, saveQuizMetaData } = quizListSlice.actions;
