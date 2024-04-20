import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentQuizModalTypes } from "../../../pages/admin/types";

const initialState = {
  data: {
    title: "",
    description: "",
    thumbnail: "",
    time: 0,
  },
};

const quizTestSlice = createSlice({
  name: "quizTestSlice",
  initialState,
  reducers: {
    saveQuizDescription: (
      state,
      action: PayloadAction<StudentQuizModalTypes>
    ) => {
      state.data = action.payload;
    },
  },
});

export default quizTestSlice.reducer;
export const { saveQuizDescription } = quizTestSlice.actions;
