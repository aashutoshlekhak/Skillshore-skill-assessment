import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TQuizCategoryType } from "../../../pages/admin/types";
import { TCommonMetaType } from "../../../pages/admin/types/TCommonTypes";

const initialState = {
  data: [
    {
      id: 0,
      title: "",
      slug: "",
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
const quizCategoryListSlice = createSlice({
  name: "quizCategoryListSlice",
  initialState,
  reducers: {
    saveQuizCategoryList: (
      state,
      action: PayloadAction<TQuizCategoryType[]>
    ) => {
      state.data = action.payload;
    },
    saveQuizCategoriesMetaData: (
      state,
      action: PayloadAction<TCommonMetaType>
    ) => {
      state.meta = action.payload;
    },
  },
});

export default quizCategoryListSlice.reducer;
export const { saveQuizCategoryList, saveQuizCategoriesMetaData } =
  quizCategoryListSlice.actions;
