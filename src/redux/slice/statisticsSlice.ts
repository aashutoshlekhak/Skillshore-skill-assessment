import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: {
    total_students: 0,
    total_verified_students: 0,
    total_quizzes: 0,
    active_quizzes: 0,
    total_questions: 0,
    active_questions: 0,
    total_passed_students: 0,
  },
};
const statisticsSlice = createSlice({
  name: "statisticsSlice",
  initialState,
  reducers: {
    saveStatistics: (state, action: PayloadAction<any>) => {
      state.data = action.payload.data;
    },
  },
});

export default statisticsSlice.reducer;
export const { saveStatistics } = statisticsSlice.actions;
