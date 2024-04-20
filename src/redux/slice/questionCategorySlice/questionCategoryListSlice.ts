import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TQuestionCategoryType } from "../../../pages/admin/types";
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
const questionCategoryListSlice = createSlice({
  name: "questionCategoryListSlice",
  initialState,
  reducers: {
    saveQuestionCategoryList: (
      state,
      action: PayloadAction<TQuestionCategoryType[]>
    ) => {
      state.data = action.payload;
    },

    saveQuestionCategoriesMetaData: (
      state,
      action: PayloadAction<TCommonMetaType>
    ) => {
      state.meta = action.payload;
    },
  },
});

export default questionCategoryListSlice.reducer;
export const { saveQuestionCategoryList, saveQuestionCategoriesMetaData } =
  questionCategoryListSlice.actions;
