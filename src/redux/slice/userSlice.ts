import { createSlice } from "@reduxjs/toolkit";
import { TUserProfile } from "../../pages/student/types";

const initialState: TUserProfile = {
  data: {
    id: 0,
    email: "",
    name: "",
    role: "",
    profile: {
      id: 0,
      skills: [],
      education: "",
      experience: "",
      career: "",
    },
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload.data;
    },
    setProfileData: (state, action) => {
      state.data.profile = action.payload;
    },
    setInitialData: (state) => {
      state.data = initialState.data;
    },
  },
});

export default userSlice.reducer;
export const { setUserData, setProfileData, setInitialData } =
  userSlice.actions;
