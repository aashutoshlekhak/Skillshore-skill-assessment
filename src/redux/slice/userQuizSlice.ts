import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    quiz_id: "",
    answers: [],
    total_question: "",
    total_time: "",
  },
};

const userQuizSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    setAnswerData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default userQuizSlice.reducer;
export const { setAnswerData } = userQuizSlice.actions;
