import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFetchQuizQueryTransformResponseType } from "../../../pages/admin/types";

const initialState = {
  data: [
    {
      id: 0,
      title: "",
      slug: "",
      thumbnail: "",
      description: "",
      time: 0,
      retry_after: 0,
      status: 1,
      result: {},
      categories: "",
      category: {},
    },
  ],
};
const passedQuizSlice = createSlice({
  name: "passedQuizSlice",
  initialState,
  reducers: {
    savePassedQuiz: (
      state,
      action: PayloadAction<TFetchQuizQueryTransformResponseType>
    ) => {
      const filterPassedResults = action.payload.data.slice(0, 4);
      state.data = filterPassedResults;
    },
  },
});

export default passedQuizSlice.reducer;
export const { savePassedQuiz } = passedQuizSlice.actions;
