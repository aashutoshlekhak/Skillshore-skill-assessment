import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TQuestionCategoryFetchAllType,
} from "../../../pages/admin/types";

const initialState = {
  data: [
    {
      id: 0,
      title: "",
    },
  ],
};
const allQuestionCategoriesListSlice = createSlice({
  name: "allQuestionCategoriesListSlice",
  initialState,
  reducers: {
    saveAllQuestionCategoriesList: (
      state,
      action: PayloadAction<TQuestionCategoryFetchAllType[]>
    ) => {
      state.data = action.payload;
    },
  },
});

export default allQuestionCategoriesListSlice.reducer;
export const { saveAllQuestionCategoriesList } =
  allQuestionCategoriesListSlice.actions;
