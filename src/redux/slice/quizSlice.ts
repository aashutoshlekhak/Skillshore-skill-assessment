import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    id: null,
    title: "",
    slug: "",
    thumbnail: "",
    description: "",
    time: 0,
    retry_after: 0,
    status: 0,
    questions: [],
  },
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizData: (state, action) => {
      state.data = action.payload.data;
    },
    setQuizDataToInitial: (state) => {
      state.data = initialState.data;
    },
  },
});

export default quizSlice.reducer;
export const { setQuizData, setQuizDataToInitial } = quizSlice.actions;
